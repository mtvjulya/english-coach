import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackById, SENTENCE_PACKS, STEP_LEVELS } from '../../data/sentences';
import { useApp } from '../../engine/storage';
import { checkText, checkCompose, normalize, tokens, diffWords, similarity } from '../../engine/checker';
import { pronunciationScore } from '../../engine/speech';
import { SpeakButton, MicButton } from '../../components/Audio';
import { Card, Button, Tag, ProgressBar, VerdictBadge, SectionTitle } from '../../components/ui';
import type { CheckResult } from '../../engine/checker';
import type { ChunkRole, ErrorTag, SentenceChunk, SentencePack, SentenceStep, Verdict } from '../../types';
import { CHUNK_ROLE_RU, ERROR_TAG_RU } from '../../types';

// Цвета ролей блоков для визуальной схемы предложения
const ROLE_STYLE: Record<ChunkRole, string> = {
  subject: 'bg-sky-100 text-sky-800 border-sky-300',
  predicate: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  object: 'bg-amber-100 text-amber-800 border-amber-300',
  complement: 'bg-orange-100 text-orange-800 border-orange-300',
  adverbial: 'bg-violet-100 text-violet-800 border-violet-300',
  connector: 'bg-rose-100 text-rose-800 border-rose-300',
  clause: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  modifier: 'bg-teal-100 text-teal-800 border-teal-300',
};

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // не оставляем случайно правильный порядок
  if (a.length > 1 && a.every((x, i) => x === arr[i])) {
    [a[0], a[1]] = [a[1], a[0]];
  }
  return a;
}

const assemble = (chunks: SentenceChunk[]) => chunks.map((c) => c.text).join(' ').replace(/ ,/g, ',');
const points = (v: Verdict) => (v === 'correct' ? 1 : v === 'almost' ? 0.6 : 0);

export default function SentenceLesson() {
  const { packId = '' } = useParams();
  const pack = getPackById(packId);
  const s = useApp();
  const navigate = useNavigate();

  const [stepIdx, setStepIdx] = useState(0);
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);
  const [tags, setTags] = useState<ErrorTag[]>([]);
  const [composeVerdict, setComposeVerdict] = useState<Verdict | null>(null);
  const [phase, setPhase] = useState<'steps' | 'compose' | 'result'>('steps');

  useEffect(() => {
    if (pack) s.setLastLesson({ path: `/sentences/${pack.id}`, label: `Конструктор: ${pack.title}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack?.id]);

  if (!pack) return <p>Пакет не найден.</p>;

  const addTags = (t: ErrorTag[]) => setTags((x) => [...x, ...t]);

  const stepDone = (v: Verdict, newTags: ErrorTag[]) => {
    setVerdicts((vs) => [...vs, v]);
    addTags(newTags);
    if (stepIdx + 1 < pack.steps.length) {
      setStepIdx(stepIdx + 1);
    } else {
      setPhase('compose');
    }
  };

  // итог после фазы compose
  if (phase === 'result') {
    return (
      <ResultScreen
        pack={pack}
        verdicts={verdicts}
        composeVerdict={composeVerdict}
        tags={tags}
        onRestart={() => navigate(0)}
      />
    );
  }

  const step = pack.steps[Math.min(stepIdx, pack.steps.length - 1)];
  const prev = stepIdx > 0 ? pack.steps[stepIdx - 1] : null;
  const totalUnits = pack.steps.length + 1; // шаги + своё предложение

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{pack.title}</span>
          <span>
            {phase === 'compose'
              ? 'Финал: своё предложение'
              : `Уровень ${stepIdx + 1}/${pack.steps.length}: ${STEP_LEVELS[stepIdx] ?? ''}`}
          </span>
        </div>
        <ProgressBar value={(verdicts.length + (composeVerdict ? 1 : 0)) / totalUnits} />
      </div>

      {phase === 'steps' && (
        <StepCard
          key={stepIdx}
          pack={pack}
          step={step}
          prev={prev}
          stepIdx={stepIdx}
          onDone={stepDone}
        />
      )}
      {phase === 'compose' && (
        <ComposePhase
          pack={pack}
          onDone={(v, t) => {
            setComposeVerdict(v);
            addTags(t);
            setPhase('result');
          }}
        />
      )}
    </div>
  );
}

// ===== Шаг: собрать предложение уровня =====

function StepCard({
  pack,
  step,
  prev,
  stepIdx,
  onDone,
}: {
  pack: SentencePack;
  step: SentenceStep;
  prev: SentenceStep | null;
  stepIdx: number;
  onDone: (v: Verdict, tags: ErrorTag[]) => void;
}) {
  const addMistake = useApp((s) => s.addMistake);
  const [pool, setPool] = useState<SentenceChunk[]>(() => shuffled(step.chunks));
  const [picked, setPicked] = useState<number[]>([]);
  const [mode, setMode] = useState<'build' | 'type'>('build');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [pron, setPron] = useState<{ score: number; missed: string[] } | null>(null);
  const [mistakeLogged, setMistakeLogged] = useState(false);

  const answer = mode === 'build' ? assemble(picked.map((i) => pool[i])) : input;
  const finished = result !== null && (result.verdict !== 'wrong' || attempts >= 2);
  const passed = result !== null && result.verdict !== 'wrong';
  const allTags = result?.errorTags ?? [];

  const reset = () => {
    setPool(shuffled(step.chunks));
    setPicked([]);
    setInput('');
    setResult(null);
  };

  const submit = () => {
    const ans = answer.trim();
    if (!ans) return;
    const r = checkText(ans, [step.en, ...(step.accepts ?? [])], 0.88);
    const a = attempts + 1;
    setAttempts(a);
    setResult(r);
    if (r.verdict === 'wrong' && !mistakeLogged) {
      setMistakeLogged(true);
      addMistake({
        tag: r.errorTags[0] ?? 'other',
        context: `конструктор: ${pack.title} · ${STEP_LEVELS[stepIdx]}`,
        expected: step.en,
        got: ans,
        topicId: pack.grammarTopicIds?.[0],
      });
    }
  };

  const pickChip = (i: number) => !finished && setPicked((p) => [...p, i]);
  const unpick = (pos: number) => !finished && setPicked((p) => p.filter((_, idx) => idx !== pos));
  const poolIndexUsed = new Set(picked);

  return (
    <div className="space-y-4">
      <Card className="rise">
        <div className="text-xs font-semibold text-slate-400 mb-1">
          Уровень {stepIdx + 1}: {STEP_LEVELS[stepIdx]} · соберите предложение
        </div>
        <p className="text-lg font-semibold mb-3">«{step.ru}»</p>

        {mode === 'build' ? (
          <>
            {/* зона сборки */}
            <div className="min-h-[52px] rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/50 p-2 flex flex-wrap gap-1.5 mb-2">
              {picked.length === 0 && <span className="text-xs text-slate-400 self-center">Нажимайте на блоки ниже…</span>}
              {picked.map((pi, pos) => (
                <button
                  key={pos}
                  onClick={() => unpick(pos)}
                  className={`rounded-lg border px-2 py-1 text-sm font-medium ${ROLE_STYLE[pool[pi].role]}`}
                  title={CHUNK_ROLE_RU[pool[pi].role]}
                >
                  {pool[pi].text}
                </button>
              ))}
            </div>
            {/* банк блоков */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pool.map((c, i) =>
                poolIndexUsed.has(i) ? null : (
                  <button
                    key={i}
                    onClick={() => pickChip(i)}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm active:bg-slate-100"
                  >
                    {c.text}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            disabled={finished}
            placeholder="Введите предложение целиком…"
            className="w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm mb-3 focus:border-brand-500 focus:outline-none disabled:bg-slate-50"
          />
        )}

        <div className="flex items-center gap-2">
          {!finished && (
            <Button onClick={submit} disabled={!answer.trim()}>
              Проверить
            </Button>
          )}
          {!finished && (
            <button onClick={() => setMode(mode === 'build' ? 'type' : 'build')} className="text-xs text-brand-600 underline">
              {mode === 'build' ? 'ввести вручную' : 'собрать из блоков'}
            </button>
          )}
          {result && result.verdict === 'wrong' && !finished && (
            <Button variant="secondary" onClick={reset}>
              Ещё раз
            </Button>
          )}
        </div>

        {result && (
          <div
            className={`mt-3 rounded-xl p-3 text-sm ${
              result.verdict === 'correct'
                ? 'bg-emerald-50 text-emerald-800'
                : result.verdict === 'almost'
                  ? 'bg-amber-50 text-amber-800'
                  : 'bg-rose-50 text-rose-800'
            }`}
          >
            <VerdictBadge verdict={result.verdict} />
            <p className="mt-1">{result.feedback}</p>
            {allTags.length > 0 && result.verdict === 'wrong' && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {allTags.map((t) => (
                  <Tag key={t} color="red">{ERROR_TAG_RU[t]}</Tag>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>

      {finished && (
        <>
          {/* визуальная схема + анализ */}
          <Card className="rise">
            <div className="flex items-center justify-between mb-2">
              <SectionTitle>🔍 Схема предложения</SectionTitle>
              <SpeakButton text={step.en} small />
            </div>
            <p className="text-base font-semibold mb-2">{step.en}</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {step.chunks.map((c, i) => {
                const isNew = prev ? !normalize(prev.en).includes(normalize(c.text.replace(/,$/, ''))) : false;
                return (
                  <div key={i} className="flex flex-col items-start">
                    <span className={`rounded-lg border px-2 py-1 text-sm font-medium ${ROLE_STYLE[c.role]} ${isNew ? 'ring-2 ring-emerald-400' : ''}`}>
                      {c.text}
                      {isNew && <span className="ml-1 text-[9px] text-emerald-600 font-bold">NEW</span>}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">{CHUNK_ROLE_RU[c.role]}{c.ru ? ` · ${c.ru}` : ''}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500">{step.grammarNote}</p>
          </Card>

          {/* сравнение с предыдущим уровнем */}
          {prev && step.diffNote && (
            <Card className="rise">
              <SectionTitle className="mb-2">📈 Что изменилось</SectionTitle>
              <div className="text-xs space-y-1 mb-2">
                <div className="text-slate-400">Ур.{stepIdx}: <span className="line-through decoration-rose-300">{prev.en}</span></div>
                <div className="text-slate-700 font-medium">Ур.{stepIdx + 1}: {step.en}</div>
              </div>
              <p className="text-xs text-slate-500">{step.diffNote}</p>
            </Card>
          )}

          {/* произношение */}
          <Card className="rise">
            <SectionTitle className="mb-2">🎤 Произнесите предложение</SectionTitle>
            <div className="flex items-center gap-2 mb-2">
              <SpeakButton text={step.en} />
              <SpeakButton text={step.en} slow />
              <MicButton
                onResult={(t, conf) => {
                  if (!t) return;
                  setPron({ score: pronunciationScore(step.en, t, conf), missed: diffWords(step.en, t).missed });
                }}
              />
            </div>
            {pron && (
              <div className="text-xs text-slate-600">
                Распознавание: <b>{pron.score}/100</b>
                {pron.missed.length > 0 && <span className="text-rose-600"> · не распознано: {pron.missed.join(', ')}</span>}
                <div className="text-[10px] text-slate-400 mt-0.5">Оценивается распознавание слов, а не акцент.</div>
              </div>
            )}
          </Card>

          <div className="flex flex-col gap-2">
            {passed ? (
              <Button onClick={() => onDone(result!.verdict, [])}>
                {stepIdx + 1 < pack.steps.length ? 'Следующий уровень →' : 'К своему предложению →'}
              </Button>
            ) : (
              <>
                <Button onClick={reset}>Попробовать снова</Button>
                <Button variant="ghost" onClick={() => onDone('wrong', allTags)}>
                  Продолжить дальше (по выбору) →
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ===== Финал: своё предложение по модели =====

function ComposePhase({ pack, onDone }: { pack: SentencePack; onDone: (v: Verdict, tags: ErrorTag[]) => void }) {
  const addMistake = useApp((s) => s.addMistake);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [attempts, setAttempts] = useState(0);

  const submit = (value?: string) => {
    const ans = (value ?? input).trim();
    if (!ans) return;
    // mustContain поддерживает альтернативы через '|': достаточно одной из группы
    const u = ` ${normalize(ans)} `;
    const groups = pack.compose.mustContain.map((g) => g.split('|'));
    const missingGroups = groups.filter((g) => !g.some((alt) => u.includes(normalize(alt))));
    let r: CheckResult;
    if (missingGroups.length === 0 && tokens(ans).length >= 4) {
      const best = Math.max(...pack.compose.samples.map((sm) => similarity(ans, sm)), 0);
      r = { verdict: 'correct', similarity: 1, feedback: `Отлично! Конструкция соблюдена.${best > 0.8 ? ' Почти как в примере.' : ''}`, errorTags: [] };
    } else if (missingGroups.length === 0) {
      r = { verdict: 'almost', similarity: 0.7, feedback: 'Конструкция есть, но предложение слишком короткое — добавьте деталей.', errorTags: ['other'] };
    } else {
      const base = checkCompose(ans, pack.compose.mustContain.map((g) => g.split('|')[0]));
      r = { ...base, verdict: 'wrong', feedback: `Не хватает конструкции: ${missingGroups.map((g) => g[0]).join(', ')}. Пример: «${pack.compose.samples[0]}».` };
    }
    const a = attempts + 1;
    setAttempts(a);
    setResult(r);
    if (r.verdict === 'wrong') {
      addMistake({
        tag: r.errorTags[0] ?? 'other',
        context: `конструктор: ${pack.title} · своё предложение`,
        expected: pack.compose.samples[0] ?? '',
        got: ans,
        topicId: pack.grammarTopicIds?.[0],
      });
    }
  };

  const finished = result !== null && (result.verdict !== 'wrong' || attempts >= 2);

  return (
    <div className="space-y-4">
      <Card className="rise">
        <div className="text-xs font-semibold text-slate-400 mb-1">Финальный шаг — постройте своё предложение по модели</div>
        <p className="text-sm text-slate-700 mb-3">{pack.compose.prompt}</p>
        <div className="mb-2">
          <MicButton onResult={(t) => t && setInput(t)} />
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={finished}
          rows={2}
          placeholder="Ваше предложение на английском…"
          className="w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none disabled:bg-slate-50"
        />
        {!finished && (
          <Button className="mt-2" onClick={() => submit()} disabled={!input.trim()}>
            Проверить
          </Button>
        )}
        {result && (
          <div
            className={`mt-3 rounded-xl p-3 text-sm ${
              result.verdict === 'correct'
                ? 'bg-emerald-50 text-emerald-800'
                : result.verdict === 'almost'
                  ? 'bg-amber-50 text-amber-800'
                  : 'bg-rose-50 text-rose-800'
            }`}
          >
            <VerdictBadge verdict={result.verdict} />
            <p className="mt-1">{result.feedback}</p>
            {result.verdict !== 'wrong' && (
              <p className="text-[11px] opacity-70 mt-1">Пример: {pack.compose.samples[0]}</p>
            )}
          </div>
        )}
      </Card>
      {finished && (
        <Button className="w-full" onClick={() => onDone(result!.verdict, result!.errorTags)}>
          Завершить урок →
        </Button>
      )}
    </div>
  );
}

// ===== Итоги + персональные упражнения на ошибки =====

function ResultScreen({
  pack,
  verdicts,
  composeVerdict,
  tags,
  onRestart,
}: {
  pack: SentencePack;
  verdicts: Verdict[];
  composeVerdict: Verdict | null;
  tags: ErrorTag[];
  onRestart: () => void;
}) {
  const s = useApp();
  const navigate = useNavigate();
  const all = [...verdicts, ...(composeVerdict ? [composeVerdict] : [])];
  const score = all.length ? all.reduce((a, v) => a + points(v), 0) / all.length : 0;
  const passScore = 0.7;
  const mastered = score >= passScore;
  const passedSteps = verdicts.filter((v) => v !== 'wrong').length;

  useEffect(() => {
    s.saveSentence(pack.id, score, passedSteps, passScore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniqTags = [...new Set(tags)];
  const drills = pack.remedial.filter((d) => uniqTags.includes(d.tag));
  const nextIdx = SENTENCE_PACKS.findIndex((p) => p.id === pack.id) + 1;
  const next = SENTENCE_PACKS[nextIdx];
  const [drillOpen, setDrillOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Card className="text-center py-6">
        <div className="text-4xl mb-2">{mastered ? '🎉' : '💪'}</div>
        <h3 className="text-lg font-bold mb-1">{pack.title}: урок завершён</h3>
        <div className="text-3xl font-bold text-brand-700 mb-1">{Math.round(score * 100)}%</div>
        <p className="text-sm text-slate-500 mb-2">
          Уровней пройдено: {passedSteps}/{pack.steps.length}
          {mastered ? ' · пакет освоен!' : ` · для освоения нужно ${Math.round(passScore * 100)}%`}
        </p>
      </Card>

      {drills.length > 0 && !drillOpen && (
        <Card className="rise">
          <SectionTitle className="mb-1">🛠 Персональные упражнения</SectionTitle>
          <p className="text-xs text-slate-500 mb-2">
            По вашим ошибкам подобраны короткие дриллы: {drills.map((d) => ERROR_TAG_RU[d.tag]).join(', ')}.
          </p>
          <Button variant="secondary" onClick={() => setDrillOpen(true)}>
            Начать упражнения ({drills.reduce((a, d) => a + d.items.length, 0)} заданий)
          </Button>
        </Card>
      )}

      {drillOpen && drills.map((d) => <DrillRunner key={d.tag} drill={d} pack={pack} />)}

      <div className="flex flex-col gap-2">
        {mastered && next && (
          <Button onClick={() => navigate(`/sentences/${next.id}`)}>Следующий пакет: {next.title} →</Button>
        )}
        {!mastered && <Button onClick={onRestart}>Пройти ещё раз</Button>}
        {mastered && !next && <p className="text-center text-sm text-slate-500">Это был последний пакет — отличная работа! 🏆</p>}
        <Button variant="ghost" onClick={() => navigate('/sentences')}>К списку пакетов</Button>
      </div>
    </div>
  );
}

function DrillRunner({ drill, pack }: { drill: SentencePack['remedial'][number]; pack: SentencePack }) {
  const addMistake = useApp((s) => s.addMistake);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [res, setRes] = useState<CheckResult | null>(null);
  const [doneCount, setDoneCount] = useState(0);
  const item = drill.items[Math.min(idx, drill.items.length - 1)];
  const finished = idx >= drill.items.length;

  if (finished) {
    return (
      <Card className="rise">
        <SectionTitle className="mb-1">✅ {drill.title}</SectionTitle>
        <p className="text-sm text-slate-500">Упражнение завершено: {doneCount}/{drill.items.length} верно.</p>
      </Card>
    );
  }

  const submit = () => {
    const r = checkText(input, item.answers, 0.85);
    setRes(r);
    if (r.verdict === 'wrong') {
      addMistake({
        tag: drill.tag,
        context: `дрилл: ${drill.title}`,
        expected: item.answers[0],
        got: input,
        topicId: pack.grammarTopicIds?.[0],
      });
    }
  };

  return (
    <Card className="rise">
      <div className="text-xs font-semibold text-slate-400 mb-1">
        {drill.title} · {idx + 1}/{drill.items.length}
      </div>
      <p className="text-sm font-semibold mb-2">«{item.ru}»</p>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (res ? next() : input.trim() && submit())}
          disabled={!!res}
          placeholder="Переведите…"
          className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none disabled:bg-slate-50"
        />
        {!res ? (
          <Button onClick={submit} disabled={!input.trim()}>ОК</Button>
        ) : (
          <Button onClick={next}>→</Button>
        )}
      </div>
      {res && (
        <div className={`mt-2 rounded-lg p-2 text-xs ${res.verdict === 'wrong' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {res.feedback}
        </div>
      )}
    </Card>
  );

  function next() {
    if (res && res.verdict !== 'wrong') setDoneCount((c) => c + 1);
    setIdx((i) => i + 1);
    setInput('');
    setRes(null);
  }
}
