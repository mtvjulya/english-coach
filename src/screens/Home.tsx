import { Link, useNavigate } from 'react-router-dom';
import { useApp, streakDays, dueWords, mistakeStats } from '../engine/storage';
import { todayPlan, resumeLesson, buildRecommendations } from '../engine/plan';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { VOCAB_THEMES, ALL_WORDS } from '../data/vocab';
import { SCENARIOS } from '../data/speaking/scenarios';
import { Card, Button, ProgressBar, StatCard, SectionTitle, Tag } from '../components/ui';
import { ERROR_TAG_RU } from '../types';
import { useEffect } from 'react';

export default function Home() {
  const s = useApp();
  const navigate = useNavigate();
  const placement = s.placement;

  useEffect(() => {
    s.touchActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mastered = GRAMMAR_TOPICS.filter((t) => s.topics[t.id]?.mastered).length;
  const grammarProgress = mastered / GRAMMAR_TOPICS.length;
  const learnedWords = ALL_WORDS.filter((w) => s.srs[w.id] && s.srs[w.id].status !== 'new').length;
  const due = dueWords(s).length;
  const speakingDone = Object.values(s.speaking).reduce((a, p) => a + p.attempts, 0);
  const streak = streakDays(s.activity);
  const plan = todayPlan(s, GRAMMAR_TOPICS, VOCAB_THEMES, SCENARIOS);
  const resume = resumeLesson(s, GRAMMAR_TOPICS);
  const recs = buildRecommendations(s, GRAMMAR_TOPICS);
  const topMistakes = mistakeStats(s.mistakes).slice(0, 3);

  if (!placement) {
    return (
      <div className="space-y-4">
        <Card className="text-center py-8">
          <div className="text-5xl mb-3">🇬🇧</div>
          <h2 className="text-xl font-bold mb-2">Добро пожаловать!</h2>
          <p className="text-sm text-slate-600 mb-4">
            Пройдите короткий тест (≈5 минут), чтобы определить уровень грамматики, словаря и аудирования.
          </p>
          <Button onClick={() => navigate('/placement')} className="w-full">
            Начать входной тест →
          </Button>
          <button
            onClick={() => s.setPlacement({ grammar: 'A2', vocab: 'A2', listening: 'A2', at: Date.now() })}
            className="text-xs text-slate-400 underline mt-3"
          >
            Пропустить (уровень A2)
          </button>
        </Card>
        <Card>
          <SectionTitle className="mb-2">Что умеет приложение</SectionTitle>
          <ul className="text-sm text-slate-600 space-y-1.5">
            <li>📘 <b>Грамматика</b> — теория на русском, практика, переводы и устная речь</li>
            <li>📖 <b>Слова</b> — карточки с озвучкой, интервальное повторение</li>
            <li>🎙️ <b>Разговор</b> — аудирование, диалоги с собеседником, свободная речь</li>
            <li>📊 Учёт ошибок и персональные рекомендации</li>
          </ul>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* уровень и серия */}
      <Card className="bg-gradient-to-br from-brand-600 to-brand-700 text-white border-0">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs opacity-80">Ваш уровень</div>
            <div className="flex gap-3 mt-1">
              <span className="font-bold">Грамм. {placement.grammar}</span>
              <span className="font-bold">Слова {placement.vocab}</span>
              <span className="font-bold">Аудио {placement.listening}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">🔥 {streak}</div>
            <div className="text-[10px] opacity-80">{streak === 1 ? 'день подряд' : 'дней подряд'}</div>
          </div>
        </div>
        {resume && (
          <Button variant="secondary" className="w-full mt-3 !bg-white/15 !text-white !border-white/30" onClick={() => navigate(resume.path)}>
            ▶ Продолжить: {resume.label}
          </Button>
        )}
      </Card>

      {/* план на сегодня */}
      <Card>
        <SectionTitle className="mb-2">📅 План на сегодня</SectionTitle>
        {plan.length === 0 && <p className="text-sm text-slate-500">Всё выполнено! Загляните завтра или выберите урок сами.</p>}
        <div className="space-y-2">
          {plan.map((p) => (
            <Link
              key={p.id}
              to={p.path}
              className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 active:bg-slate-50"
            >
              <div>
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="text-xs text-slate-400">{p.subtitle}</div>
              </div>
              <span className="text-brand-600">→</span>
            </Link>
          ))}
        </div>
      </Card>

      {/* три модуля */}
      <div className="grid grid-cols-3 gap-2">
        <Link to="/grammar" className="bg-white rounded-2xl border border-slate-200 p-3 text-center active:bg-slate-50">
          <div className="text-2xl">📘</div>
          <div className="text-xs font-bold mt-1">Грамматика</div>
          <div className="text-[10px] text-slate-400">
            {mastered}/{GRAMMAR_TOPICS.length} тем
          </div>
        </Link>
        <Link to="/vocab" className="bg-white rounded-2xl border border-slate-200 p-3 text-center active:bg-slate-50">
          <div className="text-2xl">📖</div>
          <div className="text-xs font-bold mt-1">Слова</div>
          <div className="text-[10px] text-slate-400">
            {learnedWords}/{ALL_WORDS.length}
          </div>
        </Link>
        <Link to="/speaking" className="bg-white rounded-2xl border border-slate-200 p-3 text-center active:bg-slate-50">
          <div className="text-2xl">🎙️</div>
          <div className="text-xs font-bold mt-1">Разговор</div>
          <div className="text-[10px] text-slate-400">{speakingDone} практик</div>
        </Link>
      </div>

      {/* прогресс */}
      <Card>
        <SectionTitle className="mb-2">📊 Прогресс</SectionTitle>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Грамматика освоена</span>
          <span>{Math.round(grammarProgress * 100)}%</span>
        </div>
        <ProgressBar value={grammarProgress} />
        <div className="grid grid-cols-3 gap-2 mt-3">
          <StatCard label="слов на повторении" value={due} />
          <StatCard label="слов в работе" value={learnedWords} />
          <StatCard label="разговорных практик" value={speakingDone} />
        </div>
      </Card>

      {/* ошибки и рекомендации */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <SectionTitle>🎯 Ошибки и рекомендации</SectionTitle>
          <Link to="/mistakes" className="text-xs text-brand-600 font-semibold">
            Все →
          </Link>
        </div>
        {topMistakes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {topMistakes.map((m) => (
              <Tag key={m.tag} color="amber">
                {ERROR_TAG_RU[m.tag]} · {m.count}×
              </Tag>
            ))}
          </div>
        )}
        <ul className="text-sm text-slate-600 space-y-1">
          {recs.slice(0, 3).map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
