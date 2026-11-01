import { Link } from 'react-router-dom';
import { SCENARIOS } from '../../data/speaking/scenarios';
import { useApp } from '../../engine/storage';
import { Card, Tag } from '../../components/ui';

export default function Scenarios() {
  const s = useApp();
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        Выберите ситуацию: сначала аудирование, затем живой диалог с собеседником и свободная речь.
      </p>
      {SCENARIOS.map((sc) => {
        const p = s.speaking[sc.id];
        return (
          <Link key={sc.id} to={`/speaking/${sc.id}`}>
            <Card className="!p-3.5 active:bg-slate-50 mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{sc.title}</span>
                <div className="flex gap-1.5">
                  <Tag color="indigo">{sc.level}</Tag>
                  {p && p.attempts > 0 && <Tag color="green">✓ {p.attempts}×</Tag>}
                </div>
              </div>
              <div className="text-xs text-slate-500">{sc.description}</div>
              {p && (
                <div className="text-[10px] text-slate-400 mt-1">
                  Последняя оценка: {p.lastScore}/100
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
