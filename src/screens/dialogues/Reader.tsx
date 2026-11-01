import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getDialogueById } from '../../data/dialogues';
import { useApp } from '../../engine/storage';
import { ALL_WORDS } from '../../data/vocab';
import { Card, Button, Tag } from '../../components/ui';
import { SpeakButton, useSequencePlayer } from '../../components/Audio';
import { isTtsSupported } from '../../engine/speech';
import { DIALOGUE_TOPIC_RU, POS_RU } from '../../types';
import type { DialogueExpression, DialogueLine, VocabWord } from '../../types';

type Sel =
  | { kind: 'expr'; expr: DialogueExpression; line: DialogueLine }
  | { kind: 'word'; word: VocabWord }
  | { kind: 'miss'; text: string };

// Разбивает строку на сегменты: найденные выражения + обычный текст
function segments(en: string, exprs: DialogueExpression[]): { text: string; expr?: DialogueExpression }[] {
  const out: { text: string; expr?: DialogueExpression }[] = [];
  let rest = en;
  while (rest) {
    let best: { idx: number; len: number; expr: DialogueExpression } | null = null;
    for (const e of exprs) {
      const i = rest.toLowerCase().indexOf(e.phrase.toLowerCase());
      if (i >= 0 && (!best || i < best.idx || (i === best.idx && e.phrase.length > best.len))) {
        best = { idx: i, len: e.phrase.length, expr: e };
      }
    }
    if (!best) {
      out.push({ text: rest });
      break;
    }
    if (best.idx > 0) out.push({ text: rest.slice(0, best.idx) });
    out.push({ text: rest.slice(best.idx, best.idx + best.len), expr: best.expr });
    rest = rest.slice(best.idx + best.len);
  }
  return out;
}

const norm = (w: string) => w.toLowerCase().replace(/[^a-z'-]/g, '');

export default function DialogueReader() {
  const { dialogueId = '' } = useParams();
  const d = getDialogueById(dialogueId);
  const s = useApp();
  const navigate = useNavigate();
  const seq = useSequencePlayer();
  const [showRu, setShowRu] = useState(true);
  const [sel, setSel] = useState<Sel | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    if (d) {
      s.touchDialogue(d.id);
      s.setLastLesson({ path: `/dialogues/${d.id}`, label: `Диалог: ${d.title}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogueId]);

  const speakers = useMemo(() => (d ? [...new Set(d.lines.map((l) => l.speaker))] : []), [d]);
  const speakerColor = (name: string) => (speakers.indexOf(name) === 0 ? 'text-brand-700' : 'text-rose-600');

  if (!d) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Диалог не найден.</p>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/dialogues')}>
          К библиотеке
        </Button>
      </Card>
    );
  }

  const tapWord = (token: string, line: DialogueLine) => {
    seq.stop();
    const w = norm(token);
    if (!w) return;
    const expr = d.expressions.find((e) => e.phrase.toLowerCase() === w);
    if (expr) {
      setSel({ kind: 'expr', expr, line });
      setSavedId(null);
      return;
    }
    const word = ALL_WORDS.find((x) => x.en.toLowerCase() === w || x.en.toLowerCase().split(' ')[0] === w);
    setSel(word ? { kind: 'word', word } : { kind: 'miss', text: w });
    setSavedId(null);
  };

  const saveExpr = (expr: DialogueExpression, line: DialogueLine) => {
    const id = `expr-${d.id}-${expr.phrase.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')}`;
    s.saveCustomWord({
      id,
      en: expr.phrase,
      ru: expr.ru,
      pos: 'phrase',
      example: expr.example?.en ?? line.en,
      exampleRu: expr.example?.ru ?? line.ru,
    });
    s.ensureWord(id);
    setSavedId(id);
  };

  const saveWord = (w: VocabWord) => {
    s.ensureWord(w.id);
    setSavedId(w.id);
  };

  return (
    <div className="space-y-3">
      <Card className="!p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-bold">{d.title}</h2>
            <div className="flex gap-1.5 mt-1.5">
              <Tag color="indigo">{d.level}</Tag>
              <Tag color="amber">{DIALOGUE_TOPIC_RU[d.topic]}</Tag>
              <Tag color="slate">≈{d.durationMin} мин</Tag>
            </div>
          </div>
          <button onClick={() => setShowRu(!showRu)} className="text-xs text-brand-600 underline whitespace-nowrap">
            {showRu ? 'Скрыть RU' : 'Перевод RU'}
          </button>
        </div>
        {isTtsSupported &&
          (seq.playing ? (
            <Button variant="danger" className="w-full mt-3" onClick={seq.stop}>
              ⏹ Остановить ({(seq.idx ?? 0) + 1}/{d.lines.length})
            </Button>
          ) : (
            <Button variant="secondary" className="w-full mt-3" onClick={() => seq.play(d.lines.map((l) => l.en))}>
              ▶ Проиграть весь диалог
            </Button>
          ))}
      </Card>

      <Card className="!p-3">
        <p className="text-[11px] text-slate-400 mb-2">
          Нажимайте на подчёркнутые выражения и любые слова — покажем перевод и можно сохранить в словарь.
        </p>
        <div className="space-y-3">
          {d.lines.map((line, i) => (
            <div
              key={i}
              className={`rounded-xl p-2.5 transition-colors border ${
                seq.idx === i ? 'bg-brand-50 border-brand-300' : 'bg-slate-50 border-transparent'
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-1" onClickCapture={seq.stop}>
                  <SpeakButton text={line.en} small />
                  <SpeakButton text={line.en} slow small />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[11px] font-bold ${speakerColor(line.speaker)}`}>{line.speaker}</div>
                  <p className="text-sm leading-relaxed">
                    {segments(line.en, d.expressions).map((seg, j) =>
                      seg.expr ? (
                        <button
                          key={j}
                          onClick={() => {
                            seq.stop();
                            setSel({ kind: 'expr', expr: seg.expr!, line });
                            setSavedId(null);
                          }}
                          className="text-brand-700 font-semibold underline decoration-dotted underline-offset-2 decoration-brand-400"
                        >
                          {seg.text}
                        </button>
                      ) : (
                        seg.text.split(/(\s+)/).map((tok, k) =>
                          /^\s+$/.test(tok) || !norm(tok) ? (
                            <span key={`${j}-${k}`}>{tok}</span>
                          ) : (
                            <button key={`${j}-${k}`} onClick={() => tapWord(tok, line)} className="active:text-brand-600">
                              {tok}
                            </button>
                          )
                        )
                      )
                    )}
                  </p>
                  {showRu && <p className="text-xs text-slate-500 mt-0.5">{line.ru}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Карточка выбранного выражения / слова — «шторка» над нижним меню */}
      {sel && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-app px-4 z-20">
          <Card className="shadow-xl border-brand-200 rise">
            {sel.kind === 'expr' && (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-bold text-base break-words">{sel.expr.phrase}</div>
                    <div className="text-sm text-brand-700 mt-0.5">{sel.expr.ru}</div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <SpeakButton text={sel.expr.phrase} small />
                    <button onClick={() => setSel(null)} className="text-slate-400 text-lg leading-none px-1">
                      ×
                    </button>
                  </div>
                </div>
                {sel.expr.note && <p className="text-xs text-slate-500 mt-2">{sel.expr.note}</p>}
                {sel.expr.example && (
                  <div className="bg-slate-50 rounded-xl p-2.5 mt-2">
                    <div className="flex items-center gap-2">
                      <SpeakButton text={sel.expr.example.en} small />
                      <span className="text-xs">{sel.expr.example.en}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{sel.expr.example.ru}</div>
                  </div>
                )}
                {savedId ? (
                  <div className="text-xs text-emerald-600 font-semibold mt-2.5">✓ В словаре — появится на повторении</div>
                ) : (
                  <Button variant="secondary" className="w-full mt-2.5 !py-2 text-sm" onClick={() => saveExpr(sel.expr, sel.line)}>
                    ★ В мой словарь
                  </Button>
                )}
              </>
            )}
            {sel.kind === 'word' && (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-bold text-base">{sel.word.en}</div>
                    {sel.word.transcription && <div className="text-[11px] text-slate-400">{sel.word.transcription}</div>}
                    <div className="text-sm text-brand-700 mt-0.5">{sel.word.ru}</div>
                    <div className="text-[11px] text-slate-400">{POS_RU[sel.word.pos]}</div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <SpeakButton text={sel.word.en} small />
                    <button onClick={() => setSel(null)} className="text-slate-400 text-lg leading-none px-1">
                      ×
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 mt-2">
                  <div className="text-xs">{sel.word.example}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{sel.word.exampleRu}</div>
                </div>
                {savedId ? (
                  <div className="text-xs text-emerald-600 font-semibold mt-2.5">✓ Добавлено на повторение</div>
                ) : (
                  <Button variant="secondary" className="w-full mt-2.5 !py-2 text-sm" onClick={() => saveWord(sel.word)}>
                    ★ На повторение
                  </Button>
                )}
              </>
            )}
            {sel.kind === 'miss' && (
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-slate-500">
                  «{sel.text}» пока нет в словаре приложения. Выражения с подчёркиванием всегда имеют перевод.
                </p>
                <button onClick={() => setSel(null)} className="text-slate-400 text-lg leading-none px-1">
                  ×
                </button>
              </div>
            )}
          </Card>
        </div>
      )}

      <div className="flex gap-2 pb-2">
        <Link to="/dialogues" className="flex-1">
          <Button variant="secondary" className="w-full">
            ← Библиотека
          </Button>
        </Link>
        <Link to="/vocab/review" className="flex-1">
          <Button className="w-full">Повторить слова →</Button>
        </Link>
      </div>
    </div>
  );
}
