import { useNavigate, useParams } from 'react-router-dom';
import { getTopicById } from '../../data/grammar';
import { useApp } from '../../engine/storage';
import { ExerciseCard, useExerciseRunner } from '../../components/Exercise';
import { Card, Button, ProgressBar } from '../../components/ui';

export default function Practice() {
  const { topicId = '' } = useParams();
  const topic = getTopicById(topicId);
  const saveStageScore = useApp((s) => s.saveStageScore);
  const navigate = useNavigate();

  if (!topic) return <p>Тема не найдена.</p>;
  return <PracticeRunner key={topic.id} topic={topic} saveStageScore={saveStageScore} navigate={navigate} />;
}

function PracticeRunner({
  topic,
  saveStageScore,
  navigate,
}: {
  topic: NonNullable<ReturnType<typeof getTopicById>>;
  saveStageScore: (id: string, stage: 'practice' | 'translation', score: number, pass: number) => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const r = useExerciseRunner(topic.exercises);

  if (r.done) {
    const pct = Math.round(r.score * 100);
    const passed = r.score >= topic.passScore;
    return (
      <Card className="text-center py-6">
        <div className="text-4xl mb-2">{passed ? '🎉' : '💪'}</div>
        <h3 className="text-lg font-bold mb-1">Практика завершена</h3>
        <div className="text-3xl font-bold text-brand-700 mb-1">{pct}%</div>
        <p className="text-sm text-slate-500 mb-4">
          {passed
            ? 'Отличный результат! Переходите к переводу и устной практике.'
            : `Для освоения нужно ${Math.round(topic.passScore * 100)}%. Повторите теорию и попробуйте снова.`}
        </p>
        <div className="flex flex-col gap-2">
          {passed ? (
            <Button
              onClick={() => {
                saveStageScore(topic.id, 'practice', r.score, topic.passScore);
                navigate(`/grammar/${topic.id}/translation`);
              }}
            >
              К этапу 3: перевод и речь →
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  saveStageScore(topic.id, 'practice', r.score, topic.passScore);
                  navigate(`/grammar/${topic.id}/theory`);
                }}
              >
                Повторить теорию
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  saveStageScore(topic.id, 'practice', r.score, topic.passScore);
                  navigate(0);
                }}
              >
                Ещё раз практика
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              saveStageScore(topic.id, 'practice', r.score, topic.passScore);
              navigate(`/grammar/${topic.id}`);
            }}
          >
            К теме
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            {topic.title} · упражнение {r.idx + 1}/{r.total}
          </span>
          <span>Этап 2 · практика</span>
        </div>
        <ProgressBar value={r.idx / r.total} />
      </div>
      <ExerciseCard key={r.idx} ex={r.current} topicId={topic.id} onDone={r.next} />
    </div>
  );
}
