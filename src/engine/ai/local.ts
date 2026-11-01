import type {
  AIProvider,
  ChatContext,
  ChatReply,
  MonologueInput,
  MonologueReport,
  TranslationTaskInput,
  TranslationVerdict,
  UtteranceFeedback,
  UtteranceInput,
} from './types';
import type { DialogueNode } from '../../types';
import { checkText, checkRuTranslation, checkCompose, detectErrorTags, normalize, tokens, diffWords } from '../checker';
import { ERROR_TAG_RU } from '../../types';
import type { ErrorTag } from '../../types';

// Локальный провайдер: сценарный движок + эвристики. Работает офлайн и бесплатно.
// Скрипт сценария передаётся через init() — узлы DialogueNode[].

export class LocalAI implements AIProvider {
  id = 'local';
  name = 'Встроенный движок (офлайн)';
  kind = 'local' as const;

  private scripts: Record<string, DialogueNode[]> = {};

  registerScript(scenarioId: string, nodes: DialogueNode[]): void {
    this.scripts[scenarioId] = nodes;
  }

  isConfigured(): boolean {
    return true;
  }

  // ===== Диалог по сценарию =====
  async chat(ctx: ChatContext, userText: string): Promise<ChatReply> {
    const nodes = this.scripts[ctx.scenarioId] ?? [];
    const current = nodes[ctx.nodeIndex];
    if (!current) {
      return { text: 'The dialogue is over. Well done!', textRu: 'Диалог окончен. Отличная работа!', nextNode: null };
    }

    // ветвление по ключевым словам ответа пользователя
    let nextIdx = current.next;
    if (current.branches) {
      const u = ` ${normalize(userText)} `;
      for (const b of current.branches) {
        if (b.match.some((m) => u.includes(normalize(m)))) {
          nextIdx = b.goto;
          break;
        }
      }
    }

    // если ответ совсем не по теме — мягко переспрашиваем, не двигая сценарий
    if (current.expect?.length && nextIdx === current.next) {
      const u = ` ${normalize(userText)} `;
      const hit = current.expect.some((k) => u.includes(normalize(k)));
      const short = tokens(userText).length <= 1;
      if (!hit && (short || current.expect.length > 0)) {
        if (short) {
          return {
            text: this.rephrase(current.ai),
            textRu: current.aiRu,
            hintRu: current.hints?.[0] ?? 'Попробуйте ответить полным предложением.',
            nextNode: ctx.nodeIndex,
          };
        }
      }
    }

    const next = nextIdx == null ? null : nodes[nextIdx];
    if (!next) {
      return { text: "That's all. Great job!", textRu: 'Это всё. Отличная работа!', nextNode: null };
    }
    return { text: next.ai, textRu: next.aiRu, hintRu: next.hints?.[0], nextNode: nextIdx ?? null };
  }

  private rephrase(s: string): string {
    const variants = [
      `Sorry, let me put it another way: ${s}`,
      `Could you say a bit more? ${s}`,
      `I see. And one more thing — ${s}`,
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }

  // ===== Проверка перевода =====
  async checkTranslation(task: TranslationTaskInput, userText: string): Promise<TranslationVerdict> {
    const r =
      task.sourceLang === 'en'
        ? checkRuTranslation(userText, task.keywords ?? [], task.answers)
        : checkText(userText, task.answers);
    return {
      verdict: r.verdict,
      feedback: r.feedback,
      matched: r.matched,
      errorTags: r.errorTags,
    };
  }

  // ===== Фидбек на реплику пользователя в диалоге =====
  async reviewUtterance(u: UtteranceInput): Promise<UtteranceFeedback> {
    const notes: string[] = [];
    const tags = new Set<ErrorTag>();

    // грамматические эвристики на самом тексте
    const t = ` ${normalize(u.text)} `;
    if (/\b(he|she|it)\s+(don't|do not)\b/.test(t)) {
      notes.push('С he/she/it используется doesn\'t, а не don\'t.');
      tags.add('aux-do');
    }
    if (/\b(he|she|it)\s+(go|work|like|live|play|want|need)\b/.test(t)) {
      notes.push('В 3-м лице ед. числа глаголу нужно окончание -s (he works).');
      tags.add('third-person-s');
    }
    if (/\bi (is|are|were)\b/.test(t)) {
      notes.push('С местоимением I идёт am/was (I am, I was).');
      tags.add('verb-form');
    }
    if (/\bvery\s+much\s+like\b/.test(t)) {
      notes.push('Естественнее: «I like it very much» — very much в конце.');
      tags.add('word-order');
    }
    if (u.expected?.length) {
      const missing = u.expected.filter((k) => !t.includes(normalize(k)));
      if (missing.length && missing.length <= 2) {
        notes.push(`Можно добавить по смыслу: ${missing.join(', ')}.`);
      }
    }
    if (tokens(u.text).length < 3) {
      notes.push('Попробуйте говорить полными предложениями — так быстрее выйдет разговор.');
    }

    const fb: UtteranceFeedback = {
      grammarOk: notes.filter((n) => !n.startsWith('Можно') && !n.startsWith('Попробуйте')).length === 0,
      notes: notes.map((n) => n),
      better: u.expected?.[0],
    };

    if (u.sttConfidence != null || u.target) {
      const target = u.target ?? u.text;
      const { missed } = diffWords(target, u.text);
      const conf = u.sttConfidence ?? 0.7;
      const pronNotes: string[] = [];
      if (missed.length) pronNotes.push(`Не распознано/пропущено: ${missed.join(', ')}`);
      if (conf < 0.6) pronNotes.push('Распознавание неуверенное — говорите чётче и чуть медленнее.');
      pronNotes.push('Оценка охватывает только распознавание слов, а не акцент.');
      fb.pronunciation = {
        score: Math.round(Math.min(1, (1 - missed.length / Math.max(tokens(target).length, 1)) * 0.7 + conf * 0.3) * 100),
        missed,
        notes: pronNotes,
      };
    }

    // сохраняем теги для аналитики — вызывающий код запишет их
    (fb as any)._tags = [...tags];
    return fb;
  }

  // ===== Анализ монолога =====
  async analyzeMonologue(m: MonologueInput): Promise<MonologueReport> {
    const words = tokens(m.transcript);
    const sentences = m.transcript.split(/[.!?]+/).filter((s) => s.trim().length > 2);
    const wps = sentences.length ? words.length / sentences.length : words.length;

    const issues: string[] = [];
    const recs: string[] = [];
    const t = ` ${normalize(m.transcript)} `;

    const tagSet = new Set<ErrorTag>();
    if (/\b(he|she|it)\s+(don't|go|work|like|live)\b/.test(t)) tagSet.add('third-person-s');
    if (/\bi (is|are)\b/.test(t)) tagSet.add('verb-form');
    if (/\byesterday\s+\w*\s*(go|work|see)\b/.test(t)) tagSet.add('tense');
    tagSet.forEach((tag) => issues.push(`Проверьте: ${ERROR_TAG_RU[tag]}`));

    if (words.length < 40) recs.push('Говорите дольше: цельтесь в 60–90 секунд связной речи.');
    if (wps < 5) recs.push('Стройте предложения длиннее: добавляйте because, but, so, when.');
    if (!/\b(because|but|so|when|after|before|then)\b/.test(t))
      recs.push('Связывайте мысли союзами: because, but, so, then.');
    if (!issues.length && !recs.length) recs.push('Хорошая работа! Попробуйте следующий сценарий на уровень сложнее.');

    const uniq = new Set(words);
    const vocabScore = Math.min(100, Math.round((uniq.size / Math.max(words.length, 1)) * 200));
    const fluency = Math.min(100, Math.round((words.length / Math.max(m.durationSec, 10)) * 60));
    const grammar = Math.max(30, 100 - tagSet.size * 20 - (wps < 4 ? 15 : 0));

    return {
      summary: `Сказано ~${words.length} слов за ${Math.round(m.durationSec)} сек. Средняя длина предложения: ${wps.toFixed(1)} слов.`,
      scores: { grammar, vocabulary: vocabScore, fluency },
      issues,
      recommendations: recs,
    };
  }
}
