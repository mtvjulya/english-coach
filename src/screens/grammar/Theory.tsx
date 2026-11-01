import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTopicById } from '../../data/grammar';
import { useApp } from '../../engine/storage';
import { Card, Button, SectionTitle } from '../../components/ui';
import { SpeakButton } from '../../components/Audio';

export default function Theory() {
  const { topicId = '' } = useParams();
  const topic = getTopicById(topicId);
  const markTheory = useApp((s) => s.markTheory);
  const navigate = useNavigate();
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!topic) return <p>Тема не найдена.</p>;
  const th = topic.theory;
  const quiz = th.quiz[quizIdx];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{topic.title}</h2>

      {/* объяснение */}
      <Card>
        <SectionTitle className="mb-2">📖 Правило</SectionTitle>
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          {th.explanation.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Card>

      {/* формулы */}
      <Card>
        <SectionTitle className="mb-3">🧩 Формулы</SectionTitle>
        <div className="space-y-3">
          <FormulaBox label="Утверждение +" color="emerald" lines={th.formulas.positive} />
          <FormulaBox label="Отрицание −" color="rose" lines={th.formulas.negative} />
          <FormulaBox label="Вопрос ?" color="amber" lines={th.formulas.question} />
        </div>
      </Card>

      {/* примеры */}
      <Card>
        <SectionTitle className="mb-2">💬 Примеры</SectionTitle>
        <div className="space-y-2.5">
          {th.examples.map((e, i) => (
            <div key={i} className="flex items-start gap-2">
              <SpeakButton text={e.en} small />
              <div>
                <div className="text-sm font-semibold">{e.en}</div>
                <div className="text-xs text-slate-500">{e.ru}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* сравнение */}
      {th.comparison.map((c, i) => (
        <Card key={i}>
          <SectionTitle className="mb-2">⚖️ {c.title}</SectionTitle>
          <div className="space-y-2">
            {c.points.map((p, j) => (
              <div key={j} className="grid grid-cols-[90px_1fr_1fr] gap-2 text-xs items-start">
                <span className="font-semibold text-slate-500">{p.aspect}</span>
                <span className="bg-brand-50 rounded-lg p-2">{p.this}</span>
                <span className="bg-slate-50 rounded-lg p-2">{p.other}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* типичные ошибки */}
      <Card>
        <SectionTitle className="mb-2">⚠️ Типичные ошибки русскоговорящих</SectionTitle>
        <div className="space-y-2">
          {th.mistakes.map((m, i) => (
            <div key={i} className="text-sm">
              <div className="line-through decoration-rose-400 text-slate-500">{m.wrong}</div>
              <div className="text-emerald-700 font-semibold">{m.right}</div>
              <div className="text-xs text-slate-500">{m.note}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* проверка понимания */}
      {!showQuiz ? (
        <Button className="w-full" onClick={() => setShowQuiz(true)}>
          Проверить понимание →
        </Button>
      ) : (
        <Card>
          <SectionTitle className="mb-1">✅ Быстрая проверка</SectionTitle>
          <p className="text-xs text-slate-400 mb-2">
            Вопрос {quizIdx + 1} из {th.quiz.length}
          </p>
          <p className="font-semibold text-sm mb-3">{quiz.question}</p>
          <div className="flex flex-col gap-2">
            {quiz.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setPicked(i)}
                className={`text-left px-3 py-2.5 rounded-xl border-2 text-sm font-medium ${
                  picked === null
                    ? 'border-slate-200 active:border-brand-400'
                    : i === quiz.correct
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
          {picked !== null && (
            <div className="mt-3 text-xs bg-slate-50 rounded-lg p-2.5 text-slate-600">{quiz.explanation}</div>
          )}
          {picked !== null &&
            (quizIdx + 1 < th.quiz.length ? (
              <Button
                className="w-full mt-3"
                onClick={() => {
                  setQuizIdx((i) => i + 1);
                  setPicked(null);
                }}
              >
                Следующий вопрос →
              </Button>
            ) : (
              <Button
                variant="success"
                className="w-full mt-3"
                onClick={() => {
                  markTheory(topic.id);
                  navigate(`/grammar/${topic.id}`);
                }}
              >
                Теория изучена — к практике! →
              </Button>
            ))}
        </Card>
      )}
    </div>
  );
}

function FormulaBox({ label, color, lines }: { label: string; color: 'emerald' | 'rose' | 'amber'; lines: string[] }) {
  const c = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    rose: 'bg-rose-50 border-rose-200 text-rose-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
  }[color];
  return (
    <div className={`rounded-xl border p-3 ${c}`}>
      <div className="text-xs font-bold mb-1">{label}</div>
      {lines.map((l, i) => (
        <div key={i} className="text-sm font-mono">
          {l}
        </div>
      ))}
    </div>
  );
}
