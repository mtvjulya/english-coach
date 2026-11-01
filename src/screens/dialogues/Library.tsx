import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { READ_DIALOGUES } from '../../data/dialogues';
import { useApp } from '../../engine/storage';
import { Card, Tag, SectionTitle } from '../../components/ui';
import { DIALOGUE_TOPIC_RU } from '../../types';
import type { DialogueTopic, Level } from '../../types';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
const TOPICS = Object.keys(DIALOGUE_TOPIC_RU) as DialogueTopic[];

// длительность: короткие ≤1.5 мин, средние ≤3, длинные >3
const DURATIONS = [
  { id: 'any', label: 'Любая', test: () => true },
  { id: 'short', label: '≤ 2 мин', test: (m: number) => m <= 2 },
  { id: 'long', label: '> 2 мин', test: (m: number) => m > 2 },
] as const;

export default function DialogueLibrary() {
  const s = useApp();
  const [level, setLevel] = useState<Level | null>(null);
  const [topic, setTopic] = useState<DialogueTopic | null>(null);
  const [dur, setDur] = useState<(typeof DURATIONS)[number]['id']>('any');

  const list = useMemo(
    () =>
      READ_DIALOGUES.filter(
        (d) =>
          (!level || d.level === level) &&
          (!topic || d.topic === topic) &&
          DURATIONS.find((x) => x.id === dur)!.test(d.durationMin)
      ),
    [level, topic, dur]
  );

  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
      active ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 text-slate-600 active:bg-slate-50'
    }`;

  return (
    <div className="space-y-4">
      <Card className="!p-3">
        <div className="text-xs font-semibold text-slate-500 mb-1.5">Уровень</div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button className={chip(!level)} onClick={() => setLevel(null)}>
            Все
          </button>
          {LEVELS.map((l) => (
            <button key={l} className={chip(level === l)} onClick={() => setLevel(level === l ? null : l)}>
              {l}
            </button>
          ))}
        </div>
        <div className="text-xs font-semibold text-slate-500 mb-1.5">Тема</div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button className={chip(!topic)} onClick={() => setTopic(null)}>
            Все
          </button>
          {TOPICS.map((t) => (
            <button key={t} className={chip(topic === t)} onClick={() => setTopic(topic === t ? null : t)}>
              {DIALOGUE_TOPIC_RU[t]}
            </button>
          ))}
        </div>
        <div className="text-xs font-semibold text-slate-500 mb-1.5">Длительность</div>
        <div className="flex flex-wrap gap-1.5">
          {DURATIONS.map((d) => (
            <button key={d.id} className={chip(dur === d.id)} onClick={() => setDur(d.id)}>
              {d.label}
            </button>
          ))}
        </div>
      </Card>

      <SectionTitle>Диалоги ({list.length})</SectionTitle>
      {list.length === 0 && <p className="text-sm text-slate-500">Ничего не найдено — попробуйте сбросить фильтры.</p>}
      <div className="space-y-2">
        {list.map((d) => {
          const prog = s.dialogues[d.id];
          return (
            <Link key={d.id} to={`/dialogues/${d.id}`}>
              <Card className="!p-3.5 active:bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{d.title}</span>
                  {prog && <Tag color="green">✓ читали {prog.opened}×</Tag>}
                </div>
                <div className="text-xs text-slate-500 mb-2">
                  {d.lines.length} реплик · {d.expressions.length} выражений · ≈{d.durationMin} мин
                </div>
                <div className="flex gap-1.5">
                  <Tag color="indigo">{d.level}</Tag>
                  <Tag color="amber">{DIALOGUE_TOPIC_RU[d.topic]}</Tag>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
