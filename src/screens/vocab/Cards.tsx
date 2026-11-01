import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getThemeById } from '../../data/vocab';
import { useApp } from '../../engine/storage';
import { Card, Button, ProgressBar, Tag } from '../../components/ui';
import { SpeakButton } from '../../components/Audio';
import { POS_RU } from '../../types';

export default function Flashcards() {
  const { themeId = '' } = useParams();
  const theme = getThemeById(themeId);
  const s = useApp();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!theme) return <p>Тема не найдена.</p>;
  const w = theme.words[Math.min(idx, theme.words.length - 1)];
  const done = idx >= theme.words.length;

  if (done) {
    return (
      <Card className="text-center py-8">
        <div className="text-4xl mb-2">🃏</div>
        <h3 className="font-bold text-lg mb-1">Карточки просмотрены</h3>
        <p className="text-sm text-slate-500 mb-4">
          Все слова темы «{theme.title}» добавлены в систему повторения.
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate(`/vocab/${theme.id}/practice`)}>К практике →</Button>
          <Button variant="secondary" onClick={() => navigate(`/vocab/${theme.id}`)}>
            К теме
          </Button>
        </div>
      </Card>
    );
  }

  const fav = s.favorites.includes(w.id);
  const mark = (quality: 0 | 1 | 2 | 3) => {
    s.ensureWord(w.id);
    s.gradeWord(w.id, quality);
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            {theme.title} · {idx + 1}/{theme.words.length}
          </span>
          <Tag>{POS_RU[w.pos]}</Tag>
        </div>
        <ProgressBar value={idx / theme.words.length} />
      </div>

      <Card className="rise">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-bold">{w.en}</div>
            {w.transcription && <div className="text-sm text-slate-400">{w.transcription}</div>}
          </div>
          <div className="flex gap-1.5">
            <SpeakButton text={w.en} />
            <button
              onClick={() => s.toggleFavorite(w.id)}
              className={`w-10 h-10 rounded-full text-lg ${fav ? 'bg-amber-100' : 'bg-slate-100'}`}
              title="В избранное"
            >
              {fav ? '⭐' : '☆'}
            </button>
          </div>
        </div>

        {w.plural && <div className="text-xs text-slate-500 mt-1">мн.ч.: {w.plural}</div>}
        {w.forms && (
          <div className="text-xs text-slate-500 mt-1">
            формы: {w.forms[0]} — {w.forms[1]} — {w.forms[2]}
          </div>
        )}

        {flipped ? (
          <div className="mt-4 space-y-3">
            <div className="text-lg font-semibold text-brand-700">{w.ru}</div>
            <div className="bg-slate-50 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <SpeakButton text={w.example} small />
                <div className="text-sm">{w.example}</div>
              </div>
              <div className="text-xs text-slate-500 mt-1">{w.exampleRu}</div>
            </div>
            {w.collocations && (
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1">Типичные сочетания</div>
                <div className="flex flex-wrap gap-1.5">
                  {w.collocations.map((c, i) => (
                    <span key={i} className="text-xs bg-brand-50 text-brand-700 rounded-full px-2 py-1">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {w.alt && (
              <div className="text-xs text-slate-500">
                <b>Другое значение:</b> {w.alt[0].ru} — <i>{w.alt[0].example}</i> ({w.alt[0].exampleRu})
              </div>
            )}
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
            Не знаю
          </Button>
          <Button variant="secondary" className="!px-1 !py-2 text-xs !border-amber-300 !text-amber-700" onClick={() => mark(1)}>
            Сложно
          </Button>
          <Button variant="secondary" className="!px-1 !py-2 text-xs" onClick={() => mark(2)}>
            Хорошо
          </Button>
          <Button variant="success" className="!px-1 !py-2 text-xs" onClick={() => mark(3)}>
            Легко
          </Button>
        </div>
      )}
    </div>
  );
}
