import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLACEMENT_ITEMS, scorePlacement } from '../data/placement';
import { useApp } from '../engine/storage';
import { Card, Button, ProgressBar, Tag } from '../components/ui';
import { SpeakButton } from '../components/Audio';

export default function Placement() {
  const setPlacement = useApp((s) => s.setPlacement);
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState<Set<number>>(new Set());
  const [result, setResult] = useState<ReturnType<typeof scorePlacement> | null>(null);

  const item = PLACEMENT_ITEMS[idx];
  const total = PLACEMENT_ITEMS.length;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === item.correct) setCorrect((c) => new Set(c).add(idx));
  };

  const next = () => {
    if (idx + 1 >= total) {
      const r = scorePlacement(PLACEMENT_ITEMS, correct);
      setResult(r);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  if (result) {
    return (
      <div className="space-y-4">
        <Card className="text-center py-6">
          <div className="text-4xl mb-2">🎯</div>
          <h2 className="text-lg font-bold mb-3">Ваш примерный уровень</h2>
          <div className="flex justify-center gap-3 mb-4">
            <div>
              <div className="text-2xl font-bold text-brand-700">{result.grammar}</div>
              <div className="text-xs text-slate-500">грамматика</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-700">{result.vocab}</div>
              <div className="text-xs text-slate-500">словарь</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-700">{result.listening}</div>
              <div className="text-xs text-slate-500">аудирование</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Уровни хранятся отдельно: можно, например, хорошо знать грамматику, но слабее понимать речь.
            Приложение подстроит рекомендации. Уровень можно изменить в настройках.
          </p>
          <Button
            className="w-full"
            onClick={() => {
              setPlacement({ ...result, at: Date.now() });
              navigate('/');
            }}
          >
            Начать обучение →
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            Вопрос {idx + 1} из {total}
          </span>
          <Tag color="indigo">{item.kind === 'grammar' ? 'грамматика' : item.kind === 'vocab' ? 'словарь' : 'аудирование'}</Tag>
        </div>
        <ProgressBar value={idx / total} />
      </div>

      <Card>
        {item.kind === 'listening' && (
          <div className="flex items-center gap-3 mb-3">
            <SpeakButton text={item.question} />
            <SpeakButton text={item.question} slow />
            <span className="text-xs text-slate-400">Прослушайте фразу и выберите перевод</span>
          </div>
        )}
        {item.kind !== 'listening' && <p className="text-lg font-semibold mb-3">{item.question}</p>}
        <div className="flex flex-col gap-2">
          {item.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-colors ${
                picked === null
                  ? 'border-slate-200 active:border-brand-400'
                  : i === item.correct
                    ? 'border-emerald-500 bg-emerald-50'
                    : picked === i
                      ? 'border-rose-400 bg-rose-50'
                      : 'border-slate-200 opacity-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      {picked !== null && (
        <Button className="w-full" onClick={next}>
          {idx + 1 >= total ? 'Завершить тест' : 'Далее →'}
        </Button>
      )}
    </div>
  );
}
