import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScenarioById } from '../../data/speaking/scenarios';
import { useApp } from '../../engine/storage';
import { getAI, registerScenario, aiMode } from '../../engine/ai';
import type { ChatTurn, UtteranceFeedback } from '../../engine/ai/types';
import { Card, Button, ProgressBar, Tag, VerdictBadge } from '../../components/ui';
import { SpeakButton, MicButton } from '../../components/Audio';
import { tokens } from '../../engine/checker';
import { listenOnce, isSttSupported } from '../../engine/speech';

type Phase = 'listen' | 'comprehension' | 'dialogue' | 'monologue' | 'done';

export default function Dialogue() {
  const { scenarioId = '' } = useParams();
  const sc = getScenarioById(scenarioId);
  const s = useApp();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('listen');

  useEffect(() => {
    if (sc) {
      registerScenario(sc.id, sc.script);
      s.setLastLesson({ path: `/speaking/${sc.id}`, label: `Разговор: ${sc.title}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]);

  if (!sc) return <p>Сценарий не найден.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold flex-1">{sc.title}</h2>
        <Tag color="indigo">{sc.level}</Tag>
      </div>
      <ProgressBar
        value={phase === 'listen' ? 0.1 : phase === 'comprehension' ? 0.3 : phase === 'dialogue' ? 0.55 : phase === 'monologue' ? 0.85 : 1}
      />

      {phase === 'listen' && <ListenPhase sc={sc} onNext={() => setPhase('comprehension')} />}
      {phase === 'comprehension' && <ComprehensionPhase sc={sc} onNext={() => setPhase('dialogue')} />}
      {phase === 'dialogue' && <DialoguePhase sc={sc} onNext={(score) => setPhase('monologue')} />}
      {phase === 'monologue' && (
        <MonologuePhase
          sc={sc}
          onDone={(score) => {
            s.saveSpeaking(sc.id, score);
            setPhase('done');
          }}
        />
      )}
      {phase === 'done' && (
        <Card className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-bold text-lg mb-2">Разговорная практика завершена</h3>
          <p className="text-sm text-slate-500 mb-4">Результат сохранён. Можно пройти сценарий снова или выбрать другой.</p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate(0)}>Ещё раз</Button>
            <Button variant="secondary" onClick={() => navigate('/speaking')}>
              Все сценарии
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ===== Этап 2: аудирование =====
function ListenPhase({ sc, onNext }: { sc: NonNullable<ReturnType<typeof getScenarioById>>; onNext: () => void }) {
  const [showText, setShowText] = useState(true);
  const [showRu, setShowRu] = useState(false);
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold">🎧 Послушайте диалог</span>
        <div className="flex gap-3 text-xs">
          <button onClick={() => setShowText(!showText)} className="text-brand-600 underline">
            {showText ? 'Скрыть текст' : 'Текст EN'}
          </button>
          <button onClick={() => setShowRu(!showRu)} className="text-brand-600 underline">
            {showRu ? 'Скрыть перевод' : 'Перевод RU'}
          </button>
        </div>
      </div>
      <div className="space-y-2.5 max-h-[46vh] overflow-y-auto">
        {sc.listening.map((line, i) => (
          <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-xl p-2.5">
            <div className="flex flex-col gap-1">
              <SpeakButton text={line.en} small />
              <SpeakButton text={line.en} slow small />
            </div>
            <div className="flex-1">
              {showText ? (
                <div className="text-sm font-medium">{line.en}</div>
              ) : (
                <div className="text-sm text-slate-300 select-none">••••••••••••</div>
              )}
              {showRu && <div className="text-xs text-slate-500 mt-0.5">{line.ru}</div>}
            </div>
          </div>
        ))}
      </div>
      <Button className="w-full mt-3" onClick={onNext}>
        Понял(а) — к вопросам →
      </Button>
    </Card>
  );
}

// ===== Проверка понимания =====
function ComprehensionPhase({
  sc,
  onNext,
}: {
  sc: NonNullable<ReturnType<typeof getScenarioById>>;
  onNext: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = sc.comprehension[idx];
  return (
    <Card>
      <span className="text-sm font-bold">❓ Проверка понимания ({idx + 1}/{sc.comprehension.length})</span>
      <p className="text-sm font-semibold mt-2 mb-3">{q.question}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setPicked(i)}
            className={`text-left px-3 py-2.5 rounded-xl border-2 text-sm font-medium ${
              picked === null
                ? 'border-slate-200 active:border-brand-400'
                : i === q.correct
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
      {picked !== null && (
        <>
          <p className="text-xs text-slate-500 mt-2 bg-slate-50 rounded-lg p-2">{q.explanation}</p>
          {idx + 1 < sc.comprehension.length ? (
            <Button
              className="w-full mt-3"
              onClick={() => {
                setIdx((i) => i + 1);
                setPicked(null);
              }}
            >
              Далее →
            </Button>
          ) : (
            <Button className="w-full mt-3" variant="success" onClick={onNext}>
              К живому диалогу →
            </Button>
          )}
        </>
      )}
    </Card>
  );
}

// ===== Этап 3: диалог с AI-собеседником =====
function DialoguePhase({
  sc,
  onNext,
}: {
  sc: NonNullable<ReturnType<typeof getScenarioById>>;
  onNext: (score: number) => void;
}) {
  const s = useApp();
  const ai = useMemo(() => getAI(), []);
  const [history, setHistory] = useState<ChatTurn[]>([{ role: 'ai', text: sc.script[0].ai }]);
  const [nodeIdx, setNodeIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<UtteranceFeedback | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [over, setOver] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [sttConf, setSttConf] = useState<number | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isRemote = aiMode() === 'remote';

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, feedback]);

  const send = async (text: string, confidence?: number) => {
    if (!text.trim() || thinking || over) return;
    const ctx = {
      scenarioId: sc.id,
      scenarioTitle: sc.title,
      aiRole: sc.roles.ai,
      userRole: sc.roles.user,
      level: s.placement?.listening ?? 'A2',
      history,
      nodeIndex: nodeIdx,
    };
    setThinking(true);
    setFeedback(null);
    setHint(null);
    setSttConf(confidence);

    const userTurn: ChatTurn = { role: 'user', text };
    const [reply, fb] = await Promise.all([
      ai.chat(ctx, text),
      ai.reviewUtterance({ text, context: history, expected: sc.script[nodeIdx]?.expect, sttConfidence: confidence }),
    ]);

    const newHistory = [...history, userTurn, { role: 'ai' as const, text: reply.text }];
    setHistory(newHistory);
    setFeedback(fb);
    setHint(reply.hintRu ?? null);
    setInput('');
    setThinking(false);

    const turnScore = fb.grammarOk ? (fb.pronunciation ? Math.round((fb.pronunciation.score + 100) / 2) : 85) : 55;
    setScores((x) => [...x, turnScore]);

    if (fb.notes.length) {
      const tags = (fb as unknown as { _tags?: string[] })._tags ?? [];
      tags.forEach((t) =>
        s.addMistake({ tag: t as never, context: `диалог: ${sc.title}`, expected: '', got: text })
      );
    }

    if (reply.nextNode === null || reply.nextNode == null || reply.nextNode >= sc.script.length - 1) {
      setOver(true);
    } else {
      setNodeIdx(reply.nextNode);
    }
  };

  const totalScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const node = sc.script[Math.min(nodeIdx, sc.script.length - 1)];

  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold">💬 Диалог — вы: {sc.roles.user}, собеседник: {sc.roles.ai}</span>
        <Tag color={isRemote ? 'green' : 'slate'}>{isRemote ? 'AI' : 'офлайн'}</Tag>
      </div>

      <div ref={scrollRef} className="space-y-2 max-h-[38vh] overflow-y-auto mb-3">
        {history.map((t, i) => (
          <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                t.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-100'
              }`}
            >
              {t.role === 'ai' && (
                <div className="flex items-start gap-1.5">
                  <span className="flex-1">{t.text}</span>
                  <SpeakButton text={t.text} small />
                </div>
              )}
              {t.role === 'user' && t.text}
            </div>
          </div>
        ))}
        {thinking && <div className="text-xs text-slate-400 italic">собеседник печатает…</div>}
      </div>

      {/* фидбек на последнюю реплику */}
      {feedback && (
        <div className={`rounded-xl p-3 mb-3 text-xs ${feedback.grammarOk ? 'bg-emerald-50' : 'bg-amber-50'}`}>
          <div className="font-bold mb-1">
            {feedback.grammarOk ? '✓ Отличная реплика' : '💡 Что улучшить'}
          </div>
          {feedback.notes.map((n, i) => (
            <div key={i}>• {n}</div>
          ))}
          {feedback.better && <div className="mt-1">Естественнее: <i>«{feedback.better}»</i></div>}
          {feedback.pronunciation && (
            <div className="mt-1 border-t border-slate-200 pt-1">
              🎤 Распознавание: {feedback.pronunciation.score}/100
              {feedback.pronunciation.missed.length > 0 && ` · пропущено: ${feedback.pronunciation.missed.join(', ')}`}
              <div className="text-[10px] text-slate-400">{feedback.pronunciation.notes.join(' ')}</div>
            </div>
          )}
        </div>
      )}

      {!over ? (
        <>
          {node?.hints?.length ? (
            <button onClick={() => setHint(hint ? null : node.hints![0])} className="text-xs text-brand-600 underline mb-2">
              {hint ? 'Скрыть подсказку' : '💡 Подсказка'}
            </button>
          ) : null}
          {hint && <p className="text-xs bg-amber-50 rounded-lg p-2 mb-2">{hint}</p>}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Ваш ответ по-английски…"
              className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            <MicButton onResult={(t, c) => (t ? send(t, c) : undefined)} />
            <Button onClick={() => send(input)} disabled={!input.trim() || thinking} className="!px-3">
              ➤
            </Button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Отвечайте голосом 🎤 или текстом. Не торопитесь — собеседник подождёт.</p>
        </>
      ) : (
        <div className="text-center">
          <div className="text-sm font-bold mb-1">Диалог завершён · оценка {totalScore}/100</div>
          <Button onClick={() => onNext(totalScore)}>К свободной речи →</Button>
        </div>
      )}
    </Card>
  );
}

// ===== Этап 5: самостоятельная речь =====
function MonologuePhase({
  sc,
  onDone,
}: {
  sc: NonNullable<ReturnType<typeof getScenarioById>>;
  onDone: (score: number) => void;
}) {
  const s = useApp();
  const ai = useMemo(() => getAI(), []);
  const prompt = sc.monologue[0];
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const [report, setReport] = useState<Awaited<ReturnType<typeof ai.analyzeMonologue>> | null>(null);
  const [busy, setBusy] = useState(false);
  const recStart = useRef(0);
  const pieces = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const startRec = async () => {
    if (!isSttSupported) return;
    setRecording(true);
    setElapsed(0);
    pieces.current = [];
    recStart.current = Date.now();
    timerRef.current = setInterval(() => setElapsed(Math.round((Date.now() - recStart.current) / 1000)), 500);
    // слушаем до 95 сек сегментами; после серии пустых сегментов останавливаемся
    let emptyRuns = 0;
    while (Date.now() - recStart.current < 95000 && recStart.current > 0) {
      const r = await listenOnce({ timeoutMs: 20000 });
      if (r?.transcript) {
        emptyRuns = 0;
        pieces.current.push(r.transcript);
        setTranscript(pieces.current.join(' '));
      } else {
        emptyRuns += 1;
        if (emptyRuns >= 2) break;
      }
      if (recStart.current <= 0) break;
    }
    stopRec();
  };

  const stopRec = () => {
    recStart.current = 0;
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const analyze = async () => {
    setBusy(true);
    const text = transcript || pieces.current.join(' ');
    const rep = await ai.analyzeMonologue({
      transcript: text,
      prompt,
      durationSec: Math.max(elapsed, 5),
      level: s.placement?.listening ?? 'A2',
    });
    setReport(rep);
    setBusy(false);
    const score = Math.round((rep.scores.grammar + rep.scores.vocabulary + rep.scores.fluency) / 3);
    s.setRecommendations(rep.recommendations);
    return score;
  };

  if (report) {
    const score = Math.round((report.scores.grammar + report.scores.vocabulary + report.scores.fluency) / 3);
    return (
      <Card>
        <div className="text-sm font-bold mb-2">📋 Анализ вашей речи</div>
        <p className="text-xs text-slate-500 mb-3">{report.summary}</p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {(['grammar', 'vocabulary', 'fluency'] as const).map((k) => (
            <div key={k} className="text-center bg-slate-50 rounded-xl p-2">
              <div className="text-lg font-bold text-brand-700">{report.scores[k]}</div>
              <div className="text-[10px] text-slate-500">
                {k === 'grammar' ? 'грамматика' : k === 'vocabulary' ? 'лексика' : 'беглость'}
              </div>
            </div>
          ))}
        </div>
        {report.issues.length > 0 && (
          <div className="text-xs mb-2">
            <b>Замечания:</b>
            {report.issues.map((i, n) => (
              <div key={n}>• {i}</div>
            ))}
          </div>
        )}
        <div className="text-xs mb-3">
          <b>Рекомендации:</b>
          {report.recommendations.map((r, n) => (
            <div key={n}>• {r}</div>
          ))}
        </div>
        <Button className="w-full" onClick={() => onDone(score)}>
          Завершить занятие ({score}/100)
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <div className="text-sm font-bold mb-1">🗣️ Свободная речь (30–90 сек)</div>
      <p className="text-sm mb-3">{prompt}</p>
      <div className="flex items-center gap-3 mb-3">
        {isSttSupported ? (
          !recording ? (
            <Button variant="danger" onClick={startRec}>
              ● Запись
            </Button>
          ) : (
            <Button variant="secondary" onClick={stopRec}>
              ⏹ Стоп ({elapsed}с)
            </Button>
          )
        ) : (
          <span className="text-xs text-slate-400">Запись недоступна в этом браузере — напишите текст вручную.</span>
        )}
        {recording && <span className="text-xs text-rose-600 font-semibold">идёт запись… говорите на английском</span>}
      </div>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={4}
        placeholder="Здесь появится расшифровка речи — или напишите текст вручную."
        className="w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none resize-none"
      />
      {transcript && <p className="text-xs text-slate-400 mt-1">{tokens(transcript).length} слов</p>}
      <Button className="w-full mt-2" onClick={analyze} disabled={tokens(transcript).length < 5 || busy}>
        {busy ? 'Анализирую…' : 'Проанализировать →'}
      </Button>
      <p className="text-[10px] text-slate-400 mt-2">
        Запись идёт через бесплатное распознавание речи браузера: оцениваем текст, грамматику и лексику — не акцент.
      </p>
    </Card>
  );
}
