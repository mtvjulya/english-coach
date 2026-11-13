import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getSectionById } from '../../data/trainer';
import { useApp } from '../../engine/storage';
import { checkText, type CheckResult } from '../../engine/checker';
import { Card, Button, Tag, ProgressBar } from '../../components/ui';
import { SpeakButton } from '../../components/Audio';

export default function Drill() {
  const { sectionId = '', exNum = '' } = useParams();
  const sec = getSectionById(sectionId);
  const ex = sec?.exercises.find((e) => e.num === Number(exNum));
  const s = useApp();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<string[]>(() => (ex ? ex.items.map(() => '') : []));
  const [results, setResults] = useState<(CheckResult | null)[]>(() => (ex ? ex.items.map(() => null) : []));

  const checked = useMemo(() => results.some(Boolean), [results]);
  const correctCount = results.reduce((a, r) => a + (r?.verdict === 'correct' ? 1 : r?.verdict === 'almost' ? 0.5 : 0), 0);
  const score = ex ? correctCount / ex.items.length : 0;

  if (!sec || !ex) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Упражнение не найдено.</p>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/trainer')}>
          К тренажёру
        </Button>
      </Card>
    );
  }

  const nextEx = sec.exercises.find((e) => e.num === ex.num + 1);

  const checkAll = () => {
    const res = ex.items.map((item, i) => checkText(inputs[i], item.answers, 0.94));
    setResults(res);
    res.forEach((r, i) => {
      if (r && r.verdict !== 'correct') {
        s.addMistake({
          tag: r.errorTags[0] ?? sec.errorTag,
          context: `Тренажёр ${sec.title}, упр.${ex.num}: ${ex.items[i].task}`,
          expected: r.matched ?? ex.items[i].answers[0],
          got: inputs[i] || '(пусто)',
        });
      }
    });
    s.saveTrainer(`${sec.id}#${ex.num}`, res.reduce((a, r) => a + (r.verdict === 'correct' ? 1 : r.verdict === 'almost' ? 0.5 : 0), 0) / ex.items.length);
  };

  const retryWrong = () => {
    setInputs(inputs.map((v, i) => (results[i]?.verdict === 'correct' ? v : '')));
    setResults(results.map((r) => (r?.verdict === 'correct' ? r : null)));
  };

  const resetAll = () => {
    setInputs(ex.items.map(() => ''));
    setResults(ex.items.map(() => null));
  };

  return (
    <div className="space-y-3">
      <Card className="!p-3.5">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="text-xs text-slate-400">
              {sec.title} · {sec.grades}
            </div>
            <h2 className="font-bold text-sm">Упражнение {ex.num}</h2>
          </div>
          <Tag color="indigo">{sec.level}</Tag>
        </div>
        <p className="text-sm text-slate-600 mt-1">{ex.title}</p>
        {checked && (
          <div className="mt-2">
            <ProgressBar value={score} />
            <div className="text-xs text-slate-500 mt-1">
              Результат: {Math.round(score * 100)}% ({correctCount} из {ex.items.length})
            </div>
          </div>
        )}
      </Card>

      <Card className="!p-3">
        <div className="space-y-3">
          {ex.items.map((item, i) => {
            const r = results[i];
            const border = !r
              ? 'border-slate-200'
              : r.verdict === 'correct'
                ? 'border-emerald-300 bg-emerald-50/50'
                : r.verdict === 'almost'
                  ? 'border-amber-300 bg-amber-50/50'
                  : 'border-rose-300 bg-rose-50/50';
            return (
              <div key={i} className={`rounded-xl border p-2.5 ${border}`}>
                <div className="flex items-start gap-2">
                  <span className="text-[11px] text-slate-400 font-bold mt-1 w-4 shrink-0">{i + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm flex items-center gap-1.5">
                      <span>{item.task}</span>
                      <SpeakButton text={item.task.replace('___', item.answers[0])} small />
                    </div>
                    {item.hint && <div className="text-[11px] text-slate-400">{item.hint}</div>}
                    <input
                      value={inputs[i]}
                      onChange={(e) => {
                        const v = e.target.value;
                        setInputs(inputs.map((x, j) => (j === i ? v : x)));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') checkAll();
                      }}
                      disabled={r?.verdict === 'correct'}
                      placeholder={item.task.includes('___') ? 'пропуск…' : 'ответ…'}
                      className={`mt-1.5 w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none focus:border-brand-400 ${
                        r?.verdict === 'correct' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-white border-slate-300'
                      }`}
                    />
                    {r && r.verdict !== 'correct' && (
                      <div className="text-xs mt-1.5">
                        <span className={r.verdict === 'almost' ? 'text-amber-600' : 'text-rose-600'}>
                          {r.verdict === 'almost' ? '≈ почти' : '✗ неверно'}
                        </span>
                        <span className="text-slate-500"> — правильно: </span>
                        <span className="font-semibold text-slate-700">{r.matched ?? item.answers[0]}</span>
                      </div>
                    )}
                  </div>
                  {r && (
                    <span className="text-sm shrink-0">{r.verdict === 'correct' ? '✅' : r.verdict === 'almost' ? '🟡' : '❌'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!checked ? (
          <Button className="w-full mt-3" onClick={checkAll}>
            Проверить
          </Button>
        ) : (
          <div className="flex flex-col gap-2 mt-3">
            {results.some((r) => r && r.verdict !== 'correct') && (
              <Button variant="secondary" onClick={retryWrong}>
                ↺ Исправить ошибки
              </Button>
            )}
            <Button variant="secondary" onClick={resetAll}>
              Пройти заново
            </Button>
            {nextEx ? (
              <Button onClick={() => navigate(`/trainer/${sec.id}/${nextEx.num}`)}>Упражнение {nextEx.num} →</Button>
            ) : (
              <Link to={`/trainer/${sec.id}`}>
                <Button variant="success" className="w-full">
                  ✓ Раздел завершён — к списку
                </Button>
              </Link>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
