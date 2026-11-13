import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSectionById } from '../../data/trainer';
import { useApp } from '../../engine/storage';
import { Card, Button, Tag } from '../../components/ui';

export default function TrainerSection() {
  const { sectionId = '' } = useParams();
  const sec = getSectionById(sectionId);
  const s = useApp();
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (sec) s.setLastLesson({ path: `/trainer/${sec.id}`, label: `Тренажёр: ${sec.title}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  if (!sec) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Раздел не найден.</p>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/trainer')}>
          К тренажёру
        </Button>
      </Card>
    );
  }

  const doneCount = sec.exercises.filter((e) => s.trainer[`${sec.id}#${e.num}`]).length;

  return (
    <div className="space-y-3">
      <Card className="!p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold">{sec.title}</h2>
            <div className="flex gap-1.5 mt-1.5">
              <Tag color="slate">{sec.grades}</Tag>
              <Tag color="indigo">{sec.level}</Tag>
              <Tag color="green">
                {doneCount}/{sec.exercises.length} выполнено
              </Tag>
            </div>
          </div>
        </div>
        <button onClick={() => setShowRules(!showRules)} className="text-xs text-brand-600 underline mt-2">
          {showRules ? 'Скрыть правила ▲' : '📖 Правила раздела ▼'}
        </button>
        {showRules && (
          <ul className="mt-2 space-y-1.5 bg-slate-50 rounded-xl p-3">
            {sec.rules.map((r, i) => (
              <li key={i} className="text-xs text-slate-600">
                • {r}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="space-y-2">
        {sec.exercises.map((e) => {
          const rec = s.trainer[`${sec.id}#${e.num}`];
          return (
            <Link key={e.num} to={`/trainer/${sec.id}/${e.num}`}>
              <Card className="!p-3.5 active:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">Упражнение {e.num}</div>
                    <div className="text-xs text-slate-500">{e.title}</div>
                    <div className="text-[11px] text-slate-400">{e.items.length} заданий</div>
                  </div>
                  {rec ? (
                    <Tag color={rec.score >= 0.8 ? 'green' : rec.score >= 0.5 ? 'amber' : 'red'}>
                      {Math.round(rec.score * 100)}%
                    </Tag>
                  ) : (
                    <span className="text-slate-300 text-lg">→</span>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <Link to="/trainer">
        <Button variant="secondary" className="w-full">
          ← Все разделы
        </Button>
      </Link>
    </div>
  );
}
