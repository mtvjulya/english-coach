import { useMemo, useState } from 'react';
import type { Exercise, TranslationTask } from '../types';
import { checkText, checkCompose, checkRuTranslation, tokens } from '../engine/checker';
import { useApp } from '../engine/storage';
import { Button, Card, VerdictBadge } from './ui';
import { SpeakButton, MicButton } from './Audio';

export interface ExerciseResult {
  verdict: 'correct' | 'almost' | 'wrong';
  attempts: number;
}

// ===== Плеер одного упражнения =====
export function ExerciseCard({
  ex,
  topicId,
  onDone,
}: {
  ex: Exercise;
  topicId?: string;
  onDone: (r: ExerciseResult) => void;
}) {
  const addMistake = useApp((s) => s.addMistake);
  const [input, setInput] = useState('');
  const [picked, setPicked] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<ExerciseResult['verdict'] | null>(null);
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  const fail = (fb: string, tag?: string, expected?: string, got?: string) => {
    setVerdict('wrong');
    setFeedback(fb);
    if (topicId && tag) {
      addMistake({
        tag: tag as never,
        context: 'exercise',
        expected: expected ?? '',
        got: got ?? '',
        topicId,
      });
    }
  };

  const check = (v: 'correct' | 'almost' | 'wrong', fb: string, exp: string, got: string, tag?: string) => {
    const a = attempts + 1;
    setAttempts(a);
    if (v === 'correct' || v === 'almost') {
      setVerdict(v);
      setFeedback(v === 'correct' ? fb : `${fb} (${'explanation' in ex ? ex.explanation : ''})`);
      setFinished(true);
    } else if (a >= 2) {
      // вторая ошибка — показываем ответ и идём дальше
      fail(`${fb}\n${'explanation' in ex ? ex.explanation : ''}`, tag, exp, got);
      setFinished(true);
    } else {
      fail(fb + ' Попробуйте ещё раз.', tag, exp, got);
    }
  };

  const checkChoice = (i: number) => {
    if (finished || picked === i) return;
    setPicked(i);
    if (ex.type !== 'choice') return;
    if (i === ex.answer) {
      setVerdict('correct');
      setFeedback(ex.explanation);
      setFinished(true);
      setAttempts((a) => a + 1);
    } else {
      const a = attempts + 1;
      setAttempts(a);
      if (a >= 2) {
        setVerdict('wrong');
        setFeedback(`Неверно. Правильный ответ: «${ex.options[ex.answer]}». ${ex.explanation}`);
        setFinished(true);
        if (topicId && ex.errorTag) {
          addMistake({ tag: ex.errorTag, context: ex.sentence, expected: ex.options[ex.answer], got: ex.options[i], topicId });
        }
      } else {
        setVerdict('wrong');
        setFeedback(`Неправильно. ${ex.explanation} Попробуйте ещё раз.`);
        setPicked(null);
      }
    }
  };

  const submitText = (value?: string) => {
    const answer = value ?? input;
    if (ex.type === 'gap' || ex.type === 'fix') {
      const r = checkText(answer, ex.answers);
      check(r.verdict, r.feedback, ex.answers[0], answer, ex.errorTag);
    } else if (ex.type === 'translate') {
      const r = checkText(answer, ex.answers, 0.85);
      check(r.verdict, r.feedback, ex.answers[0], answer, ex.errorTag);
    } else if (ex.type === 'compose') {
      const r = checkCompose(answer, ex.mustContain);
      check(r.verdict, r.feedback, ex.samples[0] ?? '', answer);
    }
  };

  return (
    <Card className="rise">
      <div className="text-xs font-semibold text-slate-400 mb-2">
        {ex.type === 'choice' && 'Выберите правильный вариант'}
        {ex.type === 'gap' && 'Вставьте пропущенное слово'}
        {ex.type === 'fix' && 'Исправьте ошибку'}
        {ex.type === 'translate' && 'Переведите на английский'}
        {ex.type === 'compose' && 'Составьте своё предложение'}
      </div>

      {'prompt' in ex && ex.prompt && <p className="text-sm text-slate-600 mb-1">{ex.prompt}</p>}

      {ex.type === 'choice' && (
        <>
          <p className="text-lg font-semibold mb-3">{ex.sentence}</p>
          <div className="flex flex-col gap-2">
            {ex.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => checkChoice(i)}
                className={`text-left px-4 py-3 rounded-xl border-2 font-medium transition-colors ${
                  picked === i
                    ? i === ex.answer
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-rose-400 bg-rose-50'
                    : finished && i === ex.answer
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 bg-white active:border-brand-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      {ex.type === 'gap' && (
        <GapInput sentence={ex.sentence} hint={ex.hint} input={input} setInput={setInput} onSubmit={() => submitText()} finished={finished} />
      )}

      {ex.type === 'fix' && (
        <>
          <p className="text-lg font-semibold mb-1 line-through decoration-rose-400 decoration-2">{ex.wrong}</p>
          <TextAnswer input={input} setInput={setInput} onSubmit={() => submitText()} finished={finished} placeholder="Введите исправленное предложение" />
        </>
      )}

      {ex.type === 'translate' && (
        <>
          <p className="text-lg font-semibold mb-1">«{ex.ru}»</p>
          <TextAnswer input={input} setInput={setInput} onSubmit={() => submitText()} finished={finished} placeholder="Ваш перевод…" />
        </>
      )}

      {ex.type === 'compose' && (
        <>
          <p className="text-sm text-slate-700 mb-2">{ex.prompt}</p>
          <div className="mb-2">
            <MicButton
              onResult={(t) => {
                if (t) {
                  setInput(t);
                  submitText(t);
                }
              }}
            />
          </div>
          <TextAnswer input={input} setInput={setInput} onSubmit={() => submitText()} finished={finished} placeholder="Или напишите предложение…" />
          {ex.samples.length > 0 && finished && (
            <p className="text-xs text-slate-500 mt-1">Пример: {ex.samples[0]}</p>
          )}
        </>
      )}

      {verdict && (
        <div
          className={`mt-3 rounded-xl p-3 text-sm whitespace-pre-line ${
            verdict === 'correct' ? 'bg-emerald-50 text-emerald-800' : verdict === 'almost' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <VerdictBadge verdict={verdict} />
            {attempts > 1 && verdict !== 'correct' && <span className="text-xs">попыток: {attempts}</span>}
          </div>
          {feedback}
        </div>
      )}

      {finished && (
        <Button className="mt-3 w-full" onClick={() => onDone({ verdict: verdict ?? 'wrong', attempts })}>
          Далее →
        </Button>
      )}
    </Card>
  );
}

function GapInput({
  sentence,
  hint,
  input,
  setInput,
  onSubmit,
  finished,
}: {
  sentence: string;
  hint?: string;
  input: string;
  setInput: (s: string) => void;
  onSubmit: () => void;
  finished: boolean;
}) {
  const parts = sentence.split('___');
  return (
    <div>
      <p className="text-lg font-semibold mb-2">
        {parts[0]}
        <span className="inline-block min-w-[60px] border-b-2 border-brand-500 text-brand-700 px-1">{input || '…'}</span>
        {parts[1] ?? ''}
      </p>
      {hint && <p className="text-xs text-slate-400 mb-2">Подсказка: {hint}</p>}
      <TextAnswer input={input} setInput={setInput} onSubmit={onSubmit} finished={finished} placeholder="Пропущенное слово…" />
    </div>
  );
}

function TextAnswer({
  input,
  setInput,
  onSubmit,
  finished,
  placeholder,
}: {
  input: string;
  setInput: (s: string) => void;
  onSubmit: () => void;
  finished: boolean;
  placeholder: string;
}) {
  return (
    <div className="flex gap-2 mt-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && input.trim() && onSubmit()}
        placeholder={placeholder}
        disabled={finished}
        className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none disabled:bg-slate-50"
      />
      {!finished && (
        <Button onClick={onSubmit} disabled={!input.trim()}>
          ОК
        </Button>
      )}
    </div>
  );
}

// ===== Задание этапа «Перевод и устная практика» =====
export function TranslationCard({
  task,
  onDone,
}: {
  task: TranslationTask;
  onDone: (r: ExerciseResult) => void;
}) {
  const addMistake = useApp((s) => s.addMistake);
  const [input, setInput] = useState('');
  const [heard, setHeard] = useState(false);
  const [verdict, setVerdict] = useState<ExerciseResult['verdict'] | null>(null);
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const grade = (v: 'correct' | 'almost' | 'wrong', fb: string, exp: string, got: string, tag?: string) => {
    const a = attempts + 1;
    setAttempts(a);
    if (v !== 'wrong' || a >= 2) {
      setVerdict(v);
      setFeedback(fb);
      setFinished(true);
      if (v === 'wrong' && tag) addMistake({ tag: tag as never, context: task.prompt, expected: exp, got });
    } else {
      setVerdict('wrong');
      setFeedback(fb + ' Попробуйте ещё раз.');
    }
  };

  const submit = (value?: string) => {
    const ans = value ?? input;
    if (task.kind === 'ru2en') {
      const r = checkText(ans, task.answers, 0.85);
      grade(r.verdict, r.feedback + (task.explanation ? `\n${task.explanation}` : ''), task.answers[0], ans, r.errorTags[0]);
    } else if (task.kind === 'en2ru' || task.kind === 'listen') {
      const r = checkRuTranslation(ans, task.keywordsRu ?? [], task.answers);
      grade(r.verdict, r.feedback + (task.explanation ? `\n${task.explanation}` : ''), task.answers[0], ans, 'vocabulary');
    } else if (task.kind === 'speak') {
      const r = checkCompose(ans, task.keywords?.length ? task.keywords : []);
      const len = tokens(ans).length;
      const v = len >= 12 && r.verdict !== 'wrong' ? 'correct' : r.verdict;
      grade(v, r.feedback, task.answers[0] ?? task.prompt, ans);
    }
  };

  return (
    <Card className="rise">
      <div className="text-xs font-semibold text-slate-400 mb-2">
        {task.kind === 'ru2en' && 'Переведите на английский'}
        {task.kind === 'en2ru' && 'Переведите на русский'}
        {task.kind === 'listen' && 'Прослушайте и переведите'}
        {task.kind === 'speak' && 'Скажите вслух'}
      </div>

      {task.kind === 'en2ru' && (
        <div className="flex items-center gap-2 mb-1">
          <p className="text-lg font-semibold">{task.prompt}</p>
          <SpeakButton text={task.prompt} small />
        </div>
      )}

      {task.kind === 'ru2en' && <p className="text-lg font-semibold mb-1">«{task.prompt}»</p>}

      {task.kind === 'listen' && (
        <div className="flex items-center gap-2 mb-2">
          <SpeakButton text={task.prompt} />
          <SpeakButton text={task.prompt} slow />
          <button onClick={() => setHeard(!heard)} className="text-xs text-brand-600 underline">
            {heard ? 'Скрыть текст' : 'Показать текст'}
          </button>
          {heard && <p className="text-sm text-slate-500 italic">{task.prompt}</p>}
        </div>
      )}

      {task.kind === 'speak' && (
        <>
          <p className="text-sm text-slate-700 mb-2">{task.prompt}</p>
          <div className="mb-2">
            <MicButton
              onResult={(t, conf) => {
                if (t) {
                  setInput(t);
                  submit(t);
                }
              }}
            />
          </div>
        </>
      )}

      {task.kind !== 'speak' && (
        <TextAnswer input={input} setInput={setInput} onSubmit={() => submit()} finished={finished} placeholder="Ваш ответ…" />
      )}
      {task.kind === 'speak' && (
        <TextAnswer input={input} setInput={setInput} onSubmit={() => submit()} finished={finished} placeholder="Или напишите то, что сказали…" />
      )}

      {task.hint && (
        <button onClick={() => setShowHint(!showHint)} className="text-xs text-brand-600 underline mt-2">
          {showHint ? 'Скрыть подсказку' : 'Подсказка'}
        </button>
      )}
      {showHint && task.hint && <p className="text-xs text-slate-500 mt-1">{task.hint}</p>}

      {verdict && (
        <div
          className={`mt-3 rounded-xl p-3 text-sm whitespace-pre-line ${
            verdict === 'correct' ? 'bg-emerald-50 text-emerald-800' : verdict === 'almost' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'
          }`}
        >
          <VerdictBadge verdict={verdict} />
          <p className="mt-1">{feedback}</p>
        </div>
      )}

      {finished && (
        <Button className="mt-3 w-full" onClick={() => onDone({ verdict: verdict ?? 'wrong', attempts })}>
          Далее →
        </Button>
      )}
    </Card>
  );
}

// ===== Общий раннер: прогоняет список упражнений и отдаёт итог =====
export function useExerciseRunner<T>(items: T[]) {
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const done = idx >= items.length;
  const score = useMemo(() => {
    if (!results.length) return 0;
    const pts = results.reduce((acc, r) => acc + (r.verdict === 'correct' ? 1 : r.verdict === 'almost' ? 0.6 : 0), 0);
    return pts / results.length;
  }, [results]);
  return {
    idx,
    done,
    score,
    current: items[Math.min(idx, items.length - 1)],
    total: items.length,
    next: (r: ExerciseResult) => {
      setResults((rs) => [...rs, r]);
      setIdx((i) => i + 1);
    },
  };
}
