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

// ===== Адаптер для OpenAI-совместимого API =====
// Активируется, когда заданы baseUrl + apiKey (через настройки или .env).
// Работает с OpenAI и любыми совместимыми эндпоинтами (OpenRouter, Ollama /v1, LM Studio…).

export interface RemoteConfig {
  baseUrl: string; // напр. https://api.openai.com/v1 или http://localhost:1234/v1
  apiKey: string;
  model: string;
}

export function getRemoteConfig(): RemoteConfig | null {
  const baseUrl =
    (import.meta.env.VITE_AI_BASE_URL as string | undefined) ??
    localStorage.getItem('ec_ai_base_url') ??
    'https://api.openai.com/v1';
  const apiKey =
    (import.meta.env.VITE_AI_API_KEY as string | undefined) ?? localStorage.getItem('ec_ai_api_key') ?? '';
  const model =
    (import.meta.env.VITE_AI_MODEL as string | undefined) ?? localStorage.getItem('ec_ai_model') ?? 'gpt-4o-mini';
  return apiKey ? { baseUrl, apiKey, model } : null;
}

export class OpenAIProvider implements AIProvider {
  id = 'openai';
  name = 'OpenAI / совместимый API';
  kind = 'remote' as const;
  private cfg: RemoteConfig;

  constructor(cfg: RemoteConfig) {
    this.cfg = cfg;
  }

  isConfigured(): boolean {
    return !!this.cfg.apiKey;
  }

  private async call(system: string, user: string): Promise<string> {
    const res = await fetch(`${this.cfg.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cfg.apiKey}`,
      },
      body: JSON.stringify({
        model: this.cfg.model,
        temperature: 0.4,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
    if (!res.ok) throw new Error(`AI request failed: ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? '';
  }

  private async callJson<T>(system: string, user: string, fallback: T): Promise<T> {
    try {
      const raw = await this.call(system + '\nОтвечай строго валидным JSON без markdown.', user);
      const m = raw.match(/\{[\s\S]*\}/);
      return m ? (JSON.parse(m[0]) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  async chat(ctx: ChatContext, userText: string): Promise<ChatReply> {
    const sys = `Ты — партнёр по разговорному английскому в роли «${ctx.aiRole}». Сценарий: «${ctx.scenarioTitle}». Уровень ученика: ${ctx.level}.
Правила: говори только по-английски на уровне ${ctx.level}; поддерживай естественный диалог, задавай уточняющие вопросы; не исправляй ошибки прямо в реплике; ответ короткий (1–2 предложения).`;
    const hist = ctx.history.map((t) => `${t.role === 'ai' ? ctx.aiRole : 'Student'}: ${t.text}`).join('\n');
    const r = await this.callJson<{ text: string; hintRu?: string }>(
      sys,
      `${hist}\nStudent: ${userText}\nОтветь JSON: {"text": "<твоя реплика>", "hintRu": "<краткая подсказка ученику на русском, опционально>"}`,
      { text: "That's interesting! Tell me more." }
    );
    return { text: r.text, hintRu: r.hintRu, nextNode: ctx.nodeIndex + 1 };
  }

  async checkTranslation(task: TranslationTaskInput, userText: string): Promise<TranslationVerdict> {
    const r = await this.callJson<{ verdict: string; feedback: string }>(
      'Ты — проверяющий переводов. Прими любой корректный по смыслу вариант, не только эталон.',
      `Оригинал (${task.sourceLang}): «${task.source}». Перевод ученика: «${userText}». Эталонные варианты: ${task.answers.join(' | ')}.
JSON: {"verdict":"correct|almost|wrong","feedback":"<объяснение на русском>"}`,
      { verdict: 'almost', feedback: 'Не удалось проверить автоматически.' }
    );
    const v = r.verdict === 'correct' || r.verdict === 'almost' ? r.verdict : 'wrong';
    return { verdict: v, feedback: r.feedback };
  }

  async reviewUtterance(u: UtteranceInput): Promise<UtteranceFeedback> {
    const r = await this.callJson<{ grammarOk: boolean; notes: string[]; better?: string }>(
      'Ты — преподаватель английского. Проанализируй реплику ученика.',
      `Реплика: «${u.text}». JSON: {"grammarOk":true|false,"notes":["<замечание на русском>"],"better":"<более естественный вариант на английском>"}`,
      { grammarOk: true, notes: [] }
    );
    return { grammarOk: r.grammarOk, notes: r.notes ?? [], better: r.better };
  }

  async analyzeMonologue(m: MonologueInput): Promise<MonologueReport> {
    return this.callJson<MonologueReport>(
      `Ты — экзаменатор устной речи CEFR. Уровень ученика: ${m.level}.`,
      `Тема: «${m.prompt}». Транскрипт: «${m.transcript}». JSON: {"summary":"<кратко>","scores":{"grammar":0-100,"vocabulary":0-100,"fluency":0-100},"issues":["<ошибка>"],"recommendations":["<совет>"]}`,
      { summary: 'Анализ недоступен.', scores: { grammar: 50, vocabulary: 50, fluency: 50 }, issues: [], recommendations: [] }
    );
  }
}
