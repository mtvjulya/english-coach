import { Link } from 'react-router-dom';
import { GRAMMAR_TOPICS } from '../../data/grammar';
import { useApp, getTopic } from '../../engine/storage';
import { Card, Tag, ProgressBar } from '../../components/ui';
import type { Level } from '../../types';

const LEVEL_ORDER: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export default function GrammarTopics() {
  const s = useApp();
  const grouped = LEVEL_ORDER.map((lv) => ({ lv, topics: GRAMMAR_TOPICS.filter((t) => t.level === lv) })).filter(
    (g) => g.topics.length
  );

  return (
    <div className="space-y-5">
      {grouped.map(({ lv, topics }) => (
        <section key={lv}>
          <h3 className="text-sm font-bold text-slate-500 mb-2">Уровень {lv}</h3>
          <div className="space-y-2">
            {topics.map((t) => {
              const p = getTopic(s, t.id);
              const status = p.mastered
                ? { label: 'Освоено', color: 'green' as const }
                : p.practiceDone || p.theoryDone
                  ? { label: 'В работе', color: 'amber' as const }
                  : { label: 'Новая', color: 'slate' as const };
              const stage = !p.theoryDone ? 0 : !p.practiceDone ? 1 : !p.translationDone ? 2 : 3;
              const best = Math.max(p.practiceScore, p.translationScore);
              return (
                <Link key={t.id} to={`/grammar/${t.id}`}>
                  <Card className="!p-3.5 active:bg-slate-50">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm">{t.title}</span>
                      <Tag color={status.color}>{status.label}</Tag>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={p.mastered ? 1 : best} className="flex-1" />
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {p.mastered ? '✓' : `этап ${stage + 1}/4`}
                        {best > 0 && !p.mastered && ` · ${Math.round(best * 100)}%`}
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
