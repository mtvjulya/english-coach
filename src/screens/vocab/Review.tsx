import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWordById, themeOfWord } from '../../data/vocab';
import { useApp, dueWords } from '../../engine/storage';
import { isDue, dueIn } from '../../engine/srs';
import { Card, Button, ProgressBar, Tag } from '../../components/ui';
import { SpeakButton } from '../../components/Audio';
import { POS_RU } from '../../types';

export default function Review() {
  const s = useApp();
  const dueIds = useMemo(() => dueWords(s), [s.srs]); // eslint-disable-line
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // новые слова, ещё не добавленные в SRS — предлагаем изучить через темы
  const queue = dueIds;
  const done = idx >= queue.length;
  const word = queue.length ? getWordById(queue[Math.min(idx, queue.length - 1)]) : undefined;
  const rec = word ? s.srs[word.id] : undefined;

  // расписание ближайших повторений
  const upcoming = Object.entries(s.srs)
    .filter(([, r]) => !isDue(r) && r.status !== 'new')
    .sort((a, b) => a[1].due - b[1].due)
    .slice(0, 3);

  if (queue.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="text-center py-8">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="font-bold text-lg mb-1">Нечего повторять</h3>
          <p className="text-sm text-slate-500 mb-4">
            Все изученные слова повторены. Новые слова появятся в карточках тем.
          </p>
          {upcoming.length > 0 && (
            <div className="text-xs text-slate-400 mb-4">
              Ближайшие повторения:{' '}
              {upcoming.map(([id, r]) => `${getWordById(id)?.en ?? id} (${dueIn(r)})`).join(', ')}
            </div>
          )}
          <Link to="/vocab">
            <Button>Изучить новые слова →</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (done) {
    return (
      <Card className="text-center py-8">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="font-bold text-lg mb-1">Повторение завершено</h3>
        <p className="text-sm text-slate-500 mb-4">
          Просмотрено слов: {queue.length}. Сложные вернутся раньше, лёгкие — позже.
        </p>
        <Link to="/vocab">
          <Button>К темам слов</Button>
        </Link>
      </Card>
    );
  }

  if (!word || !rec) return null;
  const theme = themeOfWord(word.id);

  const mark = (q: 0 | 1 | 2 | 3) => {
    s.gradeWord(word.id, q);
    if (q <= 1) {
      s.addMistake({ tag: 'vocabulary', context: word.en, expected: word.ru, got: 'забыл при повторении' });
    }
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            Повторение · {idx + 1}/{queue.length}
          </span>
          <Tag color="amber">{theme?.title ?? ''}</Tag>
        </div>
        <ProgressBar value={idx / queue.length} />
      </div>

      <Card className="rise">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-bold">{word.en}</div>
            {word.transcription && <div className="text-sm text-slate-400">{word.transcription}</div>}
            <div className="text-xs text-slate-400 mt-0.5">{POS_RU[word.pos]}</div>
          </div>
          <SpeakButton text={word.en} />
        </div>

        {flipped ? (
          <div className="mt-4 space-y-3">
            <div className="text-lg font-semibold text-brand-700">{word.ru}</div>
            <div className="bg-slate-50 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <SpeakButton text={word.example} small />
                <div className="text-sm">{word.example}</div>
              </div>
              <div className="text-xs text-slate-500 mt-1">{word.exampleRu}</div>
            </div>
            <div className="text-xs text-slate-400">
              Повторений: {rec.reps} · Ошибок: {rec.lapses}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setFlipped(true)}
            className="w-full mt-4 py-3 rounded-xl bg-brand-50 text-brand-700 font-semibold text-sm"
          >
            Показать перевод
          </button>
        )}
      </Card>

      {flipped && (
        <div className="grid grid-cols-4 gap-2">
          <Button variant="danger" className="!px-1 !py-2 text-xs" onClick={() => mark(0)}>
            Не помню
          </Button>
          <Button variant="secondary" className="!px-1 !py-2 text-xs !border-amber-300 !text-amber-700" onClick={() => mark(1)}>
            С трудом
          </Button>
          <Button variant="secondary" className="!px-1 !py-2 text-xs" onClick={() => mark(2)}>
            Помню
          </Button>
          <Button variant="success" className="!px-1 !py-2 text-xs" onClick={() => mark(3)}>
            Легко
          </Button>
        </div>
      )}
    </div>
  );
}
