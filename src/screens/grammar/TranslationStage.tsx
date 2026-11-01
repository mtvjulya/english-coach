import { useNavigate, useParams } from 'react-router-dom';
import { getTopicById } from '../../data/grammar';
import { useApp } from '../../engine/storage';
import { TranslationCard, useExerciseRunner } from '../../components/Exercise';
import { Card, Button, ProgressBar } from '../../components/ui';
import { buildRecommendations } from '../../engine/plan';
import { GRAMMAR_TOPICS } from '../../data/grammar';

export default function TranslationStage() {
  const { topicId = '' } = useParams();
  const topic = getTopicById(topicId);
  const saveStageScore = useApp((s) => s.saveStageScore);
  const setRecommendations = useApp((s) => s.setRecommendations);
  const navigate = useNavigate();

  if (!topic) return <p>Тема не найдена.</p>;
  return (
    <Runner
      key={topic.id}
      topic={topic}
      saveStageScore={saveStageScore}
      setRecommendations={setRecommendations}
      navigate={navigate}
    />
  );
}

function Runner({
  topic,
  saveStageScore,
  setRecommendations,
  navigate,
}: {
  topic: NonNullable<ReturnType<typeof getTopicById>>;
  saveStageScore: (id: string, stage: 'practice' | 'translation', score: number, pass: number) => void;
  setRecommendations: (r: string[]) => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const r = useExerciseRunner(topic.translation);
  const s = useApp();

  if (r.done) {
    const pct = Math.round(r.score * 100);
    const passed = r.score >= topic.passScore;
    const tp = s.topics[topic.id];
    const practiceScore = tp?.practiceScore ?? 0;
    const mastered = passed && practiceScore >= topic.passScore;

    return (
      <Card className="text-center py-6">
        <div className="text-4xl mb-2">{mastered ? '🏆' : passed ? '✅' : '📚'}</div>
        <h3 className="text-lg font-bold mb-1">
          {mastered ? 'Тема освоена!' : passed ? 'Перевод пройден' : 'Результат ниже порога'}
        </h3>
        <div className="text-3xl font-bold text-brand-700 mb-2">{pct}%</div>
        <p className="text-sm text-slate-500 mb-4">
          {mastered
            ? `«${topic.title}» закрыта: практика ${Math.round(practiceScore * 100)}%, перевод ${pct}%.`
            : passed
              ? 'Отлично! Чтобы освоить тему, доберите 80%+ и в практике.'
              : `Нужно ${Math.round(topic.passScore * 100)}%+. Повторите теорию — ошибки сохранены, появятся дополнительные упражнения.`}
        </p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => {
              saveStageScore(topic.id, 'translation', r.score, topic.passScore);
              setRecommendations(buildRecommendations(useApp.getState(), GRAMMAR_TOPICS));
              navigate(`/grammar/${topic.id}`);
            }}
          >
            {mastered ? 'Завершить тему →' : 'К теме'}
          </Button>
          {!mastered && (
            <>
              <Button variant="secondary" onClick={() => navigate(`/grammar/${topic.id}/theory`)}>
                Повторить теорию
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  saveStageScore(topic.id, 'translation', r.score, topic.passScore);
                  navigate(0);
                }}
              >
                Ещё раз переводы
              </Button>
            </>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            {topic.title} · задание {r.idx + 1}/{r.total}
          </span>
          <span>Этап 3 · перевод и речь</span>
        </div>
        <ProgressBar value={r.idx / r.total} />
      </div>
      <TranslationCard key={r.idx} task={r.current} onDone={r.next} />
    </div>
  );
}
