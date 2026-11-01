import { Link, useParams } from 'react-router-dom';
import { getTopicById } from '../../data/grammar';
import { useApp, getTopic } from '../../engine/storage';
import { Card, Button, Tag } from '../../components/ui';
import { useEffect } from 'react';

const STAGES = [
  { n: 1, icon: '📘', title: 'Теория', desc: 'Правило, формулы, примеры, типичные ошибки' },
  { n: 2, icon: '✏️', title: 'Практика', desc: 'Разные типы упражнений с объяснениями' },
  { n: 3, icon: '🔄', title: 'Перевод и устная практика', desc: 'Перевод в обе стороны, аудирование, своя речь' },
  { n: 4, icon: '🏁', title: 'Завершение', desc: 'Итоговый результат — нужно 80%+' },
];

export default function TopicHub() {
  const { topicId = '' } = useParams();
  const topic = getTopicById(topicId);
  const s = useApp();

  useEffect(() => {
    if (topic) s.setLastLesson({ path: `/grammar/${topic.id}`, label: `Грамматика: ${topic.title}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  if (!topic) return <p>Тема не найдена.</p>;
  const p = getTopic(s, topic.id);

  const stagePath = (n: number) =>
    n === 1 ? `/grammar/${topic.id}/theory` : n === 2 ? `/grammar/${topic.id}/practice` : `/grammar/${topic.id}/translation`;

  const stageDone = (n: number) =>
    n === 1 ? p.theoryDone : n === 2 ? p.practiceDone : n === 3 ? p.translationDone : p.mastered;

  const stageUnlocked = (n: number) => n <= 3 || p.translationDone;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold flex-1">{topic.title}</h2>
        <Tag color="indigo">{topic.level}</Tag>
        {p.mastered && <Tag color="green">освоено</Tag>}
      </div>

      {p.attempts > 0 && (
        <Card className="!py-2.5">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Попыток: {p.attempts}</span>
            <span>Лучший результат: {Math.round(Math.max(p.practiceScore, p.translationScore) * 100)}%</span>
            <span>Нужно: {Math.round(topic.passScore * 100)}%</span>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {STAGES.map((st) => {
          const done = stageDone(st.n);
          const unlocked = stageUnlocked(st.n);
          return (
            <Card key={st.n} className={`!p-3.5 ${!unlocked ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{st.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-sm flex items-center gap-2">
                    Этап {st.n}. {st.title}
                    {done && <span className="text-emerald-600">✓</span>}
                  </div>
                  <div className="text-xs text-slate-500">{st.desc}</div>
                </div>
                {st.n < 4 ? (
                  <Link to={stagePath(st.n)}>
                    <Button variant={done ? 'secondary' : 'primary'} className="!px-3 !py-1.5 text-xs">
                      {done ? 'Повторить' : 'Начать'}
                    </Button>
                  </Link>
                ) : (
                  <Link to={stagePath(3)}>
                    <Button variant="secondary" className="!px-3 !py-1.5 text-xs" disabled={!unlocked}>
                      {unlocked ? 'Итог' : '🔒'}
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
