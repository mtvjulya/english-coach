import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getThemeById, ALL_WORDS } from '../../data/vocab';
import { useApp } from '../../engine/storage';
import { checkText } from '../../engine/checker';
import { Card, Button, ProgressBar, VerdictBadge } from '../../components/ui';
import { SpeakButton, MicButton } from '../../components/Audio';
import type { VocabWord } from '../../types';

type Task =
  | { kind: 'en2ru-choice'; word: VocabWord; options: string[] }
  | { kind: 'ru2en-type'; word: VocabWord }
  | { kind: 'gap'; word: VocabWord }
  | { kind: 'listen-choice'; word: VocabWord; options: string[] }
  | { kind: 'say'; word: VocabWord };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function distractors(word: VocabWord, n: number): string[] {
  return shuffle(ALL_WORDS.filter((w) => w.id !== word.id && w.pos === word.pos))
    .slice(0, n)
    .map((w) => w.ru);
}

function buildTasks(words: VocabWord[]): Task[] {
  const tasks: Task[] = [];
  const pick = shuffle(words);
  // разнообразные типы по кругу
  pick.forEach((w, i) => {
    const kind = i % 4;
    if (kind === 0) tasks.push({ kind: 'en2ru-choice', word: w, options: shuffle([w.ru, ...distractors(w, 3)]) });
    else if (kind === 1) tasks.push({ kind: 'ru2en-type', word: w });
    else if (kind === 2) tasks.push({ kind: 'listen-choice', word: w, options: shuffle([w.ru, ...distractors(w, 3)]) });
    else tasks.push({ kind: 'gap', word: w });
  });
  // одно задание «произнеси слово» на последнее слово
  tasks.push({ kind: 'say', word: pick[pick.length - 1] });
  return tasks;
}

export default function VocabPractice() {
  const { themeId = '' } = useParams();
  const theme = getThemeById(themeId);
  const s = useApp();
  const navigate = useNavigate();
  const tasks = useMemo(() => (theme ? buildTasks(theme.words) : []), [themeId]); // eslint-disable-line
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!theme) return <p>Тема не найдена.</p>;
  const task = tasks[Math.min(idx, tasks.length - 1)];

  const finish = (ok: boolean) => {
    const newScore = score + (ok ? 1 : 0);
    setScore(newScore);
    if (idx + 1 >= tasks.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
    }
  };

  if (done) {
    const pct = Math.round((score / tasks.length) * 100);
    return (
      <Card className="text-center py-8">
        <div className="text-4xl mb-2">{pct >= 80 ? '🎉' : '💪'}</div>
        <h3 className="font-bold text-lg mb-1">Практика завершена</h3>
        <div className="text-3xl font-bold text-brand-700 mb-2">{pct}%</div>
        <p className="text-sm text-slate-500 mb-4">
          {score} из {tasks.length} верно. Слова с ошибками вернутся на повторение раньше.
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate(`/vocab/${theme.id}/active`)}>К активному использованию →</Button>
          <Button variant="secondary" onClick={() => navigate('/vocab/review')}>
            Повторение слов
          </Button>
          <Button variant="ghost" onClick={() => navigate(`/vocab/${theme.id}`)}>
            К теме
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            {theme.title} · {idx + 1}/{tasks.length}
          </span>
        </div>
        <ProgressBar value={idx / tasks.length} />
      </div>
      <TaskCard key={idx} task={task} onFinish={finish} />
    </div>
  );
}

function TaskCard({ task, onFinish }: { task: Task; onFinish: (ok: boolean) => void }) {
  const s = useApp();
  const [picked, setPicked] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<'correct' | 'almost' | 'wrong' | null>(null);
  const [fb, setFb] = useState('');

  const w = task.word;

  const record = (ok: boolean) => {
    if (!ok) {
      s.addMistake({ tag: 'vocabulary', context: w.en, expected: w.ru, got: input });
    }
    onFinish(ok);
  };

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const opts = (task as { options: string[] }).options;
    const ok = opts[i] === w.ru;
    setVerdict(ok ? 'correct' : 'wrong');
    setFb(ok ? 'Верно!' : `Правильно: ${w.en} — ${w.ru}`);
    if (!ok) s.gradeWord(w.id, 1);
    else s.gradeWord(w.id, 2);
  };

  const submitType = (value?: string) => {
    const ans = (value ?? input).replace(/^to\s+/i, (m) => m); // сохраняем "to"
    const expected = w.en.replace(/^to\s+/i, '');
    const r = checkText(ans, [w.en, expected, w.en.toLowerCase()]);
    setVerdict(r.verdict);
    setFb(r.verdict === 'wrong' ? `Правильно: ${w.en}` : r.feedback);
    s.gradeWord(w.id, r.verdict === 'correct' ? 2 : r.verdict === 'almost' ? 1 : 0);
  };

  const submitGap = () => {
    // вставляем слово в пример: проверяем, что ввели именно это слово (или его форму)
    const expected = w.en.replace(/^to\s+/i, '').replace(/\s*\(.*?\)/g, '');
    const r = checkText(input, [expected, expected.split(' ')[0]]);
    setVerdict(r.verdict);
    setFb(r.verdict === 'wrong' ? `Подходит слово: ${w.en}` : r.feedback);
    s.gradeWord(w.id, r.verdict === 'correct' ? 2 : 0);
  };

  const title = {
    'en2ru-choice': 'Выберите перевод',
    'ru2en-type': 'Вспомните английское слово',
    'listen-choice': 'Прослушайте и выберите перевод',
    gap: 'Впишите пропущенное слово',
    say: 'Произнесите слово вслух',
  }[task.kind];

  const gapSentence = task.kind === 'gap' ? w.example.replace(new RegExp(w.en.replace(/^to\s+/i, '').split(' ')[0], 'i'), '___') : '';

  return (
    <Card className="rise">
      <div className="text-xs font-semibold text-slate-400 mb-2">{title}</div>

      {(task.kind === 'en2ru-choice' || task.kind === 'ru2en-type' || task.kind === 'say') && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold">{task.kind === 'ru2en-type' ? w.ru : w.en}</span>
          {task.kind !== 'ru2en-type' && <SpeakButton text={w.en} small />}
        </div>
      )}

      {task.kind === 'listen-choice' && (
        <div className="flex items-center gap-2 mb-3">
          <SpeakButton text={w.en} />
          <SpeakButton text={w.en} slow />
          <span className="text-xs text-slate-400">какое слово прозвучало?</span>
        </div>
      )}

      {task.kind === 'gap' && (
        <p className="text-base font-semibold mb-3">
          {gapSentence || w.example}
          <span className="block text-xs text-slate-400 font-normal mt-1">Подсказка (перевод): {w.ru}</span>
        </p>
      )}

      {(task.kind === 'en2ru-choice' || task.kind === 'listen-choice') && (
        <div className="flex flex-col gap-2">
          {(task as { options: string[] }).options.map((opt, i) => (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium ${
                picked === null
                  ? 'border-slate-200 active:border-brand-400'
                  : opt === w.ru
                    ? 'border-emerald-500 bg-emerald-50'
                    : picked === i
                      ? 'border-rose-400 bg-rose-50'
                      : 'border-slate-200 opacity-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {task.kind === 'ru2en-type' && (
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && input.trim() && verdict === null && submitType()}
            placeholder="Английское слово…"
            className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
          {verdict === null && (
            <Button onClick={() => submitType()} disabled={!input.trim()}>
              ОК
            </Button>
          )}
        </div>
      )}

      {task.kind === 'gap' && (
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && input.trim() && verdict === null && submitGap()}
            placeholder="Пропущенное слово…"
            className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
          {verdict === null && (
            <Button onClick={submitGap} disabled={!input.trim()}>
              ОК
            </Button>
          )}
        </div>
      )}

      {task.kind === 'say' && (
        <div>
          <p className="text-sm text-slate-600 mb-2">Скажите слово вслух (или напишите его):</p>
          <div className="mb-2">
            <MicButton
              onResult={(t) => {
                if (t) {
                  setInput(t);
                  const r = checkText(t, [w.en, w.en.toLowerCase()]);
                  setVerdict(r.verdict);
                  setFb(r.verdict === 'wrong' ? `Распознано: «${t}». Нужно: ${w.en}` : `Распознано: «${t}» — верно!`);
                  s.gradeWord(w.id, r.verdict === 'correct' ? 3 : 1);
                }
              }}
            />
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && input.trim() && verdict === null && submitType()}
              placeholder="Или напишите слово…"
              className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            {verdict === null && (
              <Button onClick={() => submitType()} disabled={!input.trim()}>
                ОК
              </Button>
            )}
          </div>
        </div>
      )}

      {verdict && (
        <div
          className={`mt-3 rounded-xl p-3 text-sm ${
            verdict === 'correct' ? 'bg-emerald-50 text-emerald-800' : verdict === 'almost' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'
          }`}
        >
          <VerdictBadge verdict={verdict} />
          <p className="mt-1">{fb}</p>
        </div>
      )}

      {verdict && (
        <Button className="w-full mt-3" onClick={() => record(verdict !== 'wrong')}>
          Далее →
        </Button>
      )}
    </Card>
  );
}
