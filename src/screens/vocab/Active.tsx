import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getThemeById } from '../../data/vocab';
import { useApp } from '../../engine/storage';
import { normalize, tokens } from '../../engine/checker';
import { Card, Button, ProgressBar, VerdictBadge } from '../../components/ui';
import { MicButton } from '../../components/Audio';
import type { VocabWord } from '../../types';

type Task =
  | { kind: 'sentence'; word: VocabWord }
  | { kind: 'text'; words: VocabWord[] }
  | { kind: 'voice'; word: VocabWord };

function wordKey(w: VocabWord): string {
  // ключевое слово для проверки: первый значимый токен без "to"/скобок
  const cleaned = w.en.replace(/^to\s+/i, '').replace(/\s*\(.*?\)/g, '').replace(/[?!.]/g, '');
  const toks = cleaned.split(' ').filter((t) => t.length > 2 && !['the', 'a', 'an'].includes(t));
  return normalize(toks[0] ?? cleaned);
}

export default function ActiveUse() {
  const { themeId = '' } = useParams();
  const theme = getThemeById(themeId);
  const navigate = useNavigate();
  const s = useApp();

  const tasks = useMemo<Task[]>(() => {
    if (!theme) return [];
    const words = theme.words.filter((w) => s.srs[w.id]);
    const pick = [...words].sort(() => Math.random() - 0.5);
    const list: Task[] = pick.slice(0, 3).map((w) => ({ kind: 'sentence', word: w }));
    if (pick.length >= 3) list.push({ kind: 'text', words: pick.slice(3, 6).length ? pick.slice(3, 6) : pick.slice(0, 3) });
    if (pick[6]) list.push({ kind: 'voice', word: pick[6] });
    else if (pick[0]) list.push({ kind: 'voice', word: pick[0] });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeId]);

  const [idx, setIdx] = useState(0);
  const [wins, setWins] = useState(0);
  const done = idx >= tasks.length;

  if (!theme) return <p>Тема не найдена.</p>;
  if (!tasks.length) {
    return (
      <Card className="text-center py-6">
        <p className="text-sm text-slate-500 mb-3">Сначала изучите слова темы в карточках.</p>
        <Button onClick={() => navigate(`/vocab/${theme.id}/cards`)}>К карточкам →</Button>
      </Card>
    );
  }

  if (done) {
    return (
      <Card className="text-center py-8">
        <div className="text-4xl mb-2">🗣️</div>
        <h3 className="font-bold text-lg mb-1">Активное использование завершено</h3>
        <p className="text-sm text-slate-500 mb-4">
          Выполнено заданий: {wins}/{tasks.length}. Слова, которые вы использовали сами, переходят в активный словарь.
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate('/vocab/review')}>Повторение →</Button>
          <Button variant="secondary" onClick={() => navigate('/vocab')}>
            К темам
          </Button>
        </div>
      </Card>
    );
  }

  const task = tasks[Math.min(idx, tasks.length - 1)];

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            Активное использование · {idx + 1}/{tasks.length}
          </span>
        </div>
        <ProgressBar value={idx / tasks.length} />
      </div>
      <ActiveCard
        key={idx}
        task={task}
        onDone={(ok) => {
          if (ok) setWins((x) => x + 1);
          setIdx((i) => i + 1);
        }}
      />
    </div>
  );
}

function ActiveCard({ task, onDone }: { task: Task; onDone: (ok: boolean) => void }) {
  const s = useApp();
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<'correct' | 'almost' | 'wrong' | null>(null);
  const [fb, setFb] = useState('');

  const usedWords = (words: VocabWord[]) =>
    words.filter((w) => normalize(input).includes(wordKey(w)));

  const check = (value?: string) => {
    const text = value ?? input;
    const wordCount = tokens(text).length;

    if (task.kind === 'sentence' || task.kind === 'voice') {
      const key = wordKey(task.word);
      if (wordCount < 4) {
        setVerdict('wrong');
        setFb('Предложение слишком короткое — минимум 4 слова.');
        return;
      }
      if (!normalize(text).includes(key)) {
        setVerdict('wrong');
        setFb(`В предложении нет слова «${task.word.en}». Используйте его.`);
        return;
      }
      setVerdict('correct');
      setFb(`Отлично! Слово «${task.word.en}» использовано в собственном предложении.`);
      s.gradeWord(task.word.id, 3);
      return;
    }

    // mini-text: нужно использовать все слова
    const used = usedWords(task.words);
    const missing = task.words.filter((w) => !used.some((u) => u.id === w.id));
    if (wordCount < 10) {
      setVerdict('wrong');
      setFb('Нужен связный текст из 2–3 предложений (10+ слов).');
      return;
    }
    if (missing.length === 0) {
      setVerdict('correct');
      setFb('Все слова использованы в связном тексте — именно так слова переходят в активный запас!');
      task.words.forEach((w) => s.gradeWord(w.id, 3));
    } else {
      setVerdict('almost');
      setFb(`Хорошо, но не использованы: ${missing.map((w) => w.en).join(', ')}. Можно дописать и отправить снова.`);
    }
  };

  const title =
    task.kind === 'sentence'
      ? 'Составьте своё предложение'
      : task.kind === 'text'
        ? 'Мини-текст со словами'
        : 'Ответьте голосом';

  return (
    <Card className="rise">
      <div className="text-xs font-semibold text-slate-400 mb-2">{title}</div>

      {task.kind === 'sentence' && (
        <p className="text-sm text-slate-700 mb-2">
          Придумайте предложение со словом <b>«{task.word.en}»</b> ({task.word.ru}) и произнесите его вслух.
        </p>
      )}

      {task.kind === 'text' && (
        <div className="mb-2">
          <p className="text-sm text-slate-700 mb-1.5">
            Напишите связный текст (2–3 предложения), используя все слова:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {task.words.map((w) => {
              const used = usedWords([w]).length > 0;
              return (
                <span
                  key={w.id}
                  className={`text-xs font-semibold rounded-full px-2 py-1 ${
                    used ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-50 text-brand-700'
                  }`}
                >
                  {used ? '✓ ' : ''}
                  {w.en}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {task.kind === 'voice' && (
        <>
          <p className="text-sm text-slate-700 mb-2">
            Ответьте на вопрос голосом, обязательно используя слово <b>«{task.word.en}»</b>:
          </p>
          <p className="text-sm font-semibold mb-2 italic">
            «Tell me about a situation where you {task.word.en.replace(/^to\s+/i, '')}.»
          </p>
          <div className="mb-2">
            <MicButton
              onResult={(t) => {
                if (t) {
                  setInput(t);
                  check(t);
                }
              }}
            />
          </div>
        </>
      )}

      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={task.kind === 'voice' ? 'Или напишите ответ…' : 'Ваше предложение…'}
          rows={task.kind === 'text' ? 3 : 2}
          className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none resize-none"
        />
      </div>
      {verdict === null || verdict === 'almost' ? (
        <Button className="mt-2 w-full" onClick={() => check()} disabled={!input.trim()}>
          Проверить
        </Button>
      ) : null}

      {verdict && (
        <div
          className={`mt-3 rounded-xl p-3 text-sm ${
            verdict === 'correct'
              ? 'bg-emerald-50 text-emerald-800'
              : verdict === 'almost'
                ? 'bg-amber-50 text-amber-800'
                : 'bg-rose-50 text-rose-800'
          }`}
        >
          <VerdictBadge verdict={verdict} />
          <p className="mt-1">{fb}</p>
        </div>
      )}

      {verdict && verdict !== 'almost' && (
        <Button className="w-full mt-3" onClick={() => onDone(verdict === 'correct')}>
          Далее →
        </Button>
      )}
    </Card>
  );
}
