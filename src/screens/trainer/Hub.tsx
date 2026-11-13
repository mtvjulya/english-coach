import { Link } from 'react-router-dom';
import { DRILL_SECTIONS } from '../../data/trainer';
import { useApp } from '../../engine/storage';
import { Card, Tag, ProgressBar } from '../../components/ui';

export default function TrainerHub() {
  const s = useApp();

  return (
    <div className="space-y-3">
      <Card className="!p-3.5 bg-brand-50 border-brand-200">
        <div className="font-bold text-sm">📋 Грамматический тренажёр</div>
        <p className="text-xs text-slate-500 mt-1">
          Пронумерованные упражнения по возрастанию сложности — как в школьном пособии:
          раздел → правила → упражнения. Всего разделов: {DRILL_SECTIONS.length} (5–11 класс).
        </p>
      </Card>

      <div className="space-y-2">
        {DRILL_SECTIONS.map((sec, i) => {
          const done = sec.exercises.filter((e) => s.trainer[`${sec.id}#${e.num}`]).length;
          const scores = sec.exercises
            .map((e) => s.trainer[`${sec.id}#${e.num}`]?.score)
            .filter((x): x is number => x !== undefined);
          const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
          return (
            <Link key={sec.id} to={`/trainer/${sec.id}`}>
              <Card className="!p-3.5 active:bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">
                    {i + 1}. {sec.title}
                  </span>
                  <div className="flex gap-1.5">
                    <Tag color="slate">{sec.grades}</Tag>
                    <Tag color="indigo">{sec.level}</Tag>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressBar value={done / sec.exercises.length} className="flex-1" />
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {done}/{sec.exercises.length} упр.{avg > 0 && ` · ${Math.round(avg * 100)}%`}
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
