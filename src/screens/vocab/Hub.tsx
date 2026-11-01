import { Link, useParams } from 'react-router-dom';
import { getThemeById } from '../../data/vocab';
import { useApp } from '../../engine/storage';
import { Card, Tag } from '../../components/ui';
import { useEffect } from 'react';

const STAGES = [
  { n: 1, icon: '🃏', title: 'Изучение слов', desc: 'Карточки: слово, перевод, произношение, примеры' },
  { n: 2, icon: '✏️', title: 'Практика запоминания', desc: 'Выбор перевода, ввод слова, аудирование' },
  { n: 3, icon: '🔁', title: 'Интервальное повторение', desc: 'Система сама напомнит, когда повторять' },
  { n: 4, icon: '🗣️', title: 'Активное использование', desc: 'Свои предложения, мини-текст, диалог' },
];

export default function ThemeHub() {
  const { themeId = '' } = useParams();
  const theme = getThemeById(themeId);
  const s = useApp();

  useEffect(() => {
    if (theme) s.setLastLesson({ path: `/vocab/${theme.id}`, label: `Слова: ${theme.title}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeId]);

  if (!theme) return <p>Тема не найдена.</p>;
  const learned = theme.words.filter((w) => s.srs[w.id] && s.srs[w.id].status !== 'new').length;
  const allSeen = learned === theme.words.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold flex-1">{theme.title}</h2>
        <Tag color="indigo">{theme.level}</Tag>
      </div>
      <p className="text-sm text-slate-500 -mt-2">{theme.description}</p>

      <Card className="!py-2.5">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Слов: {theme.words.length}</span>
          <span>В работе: {learned}</span>
        </div>
      </Card>

      <div className="space-y-2">
        {STAGES.map((st) => (
          <Card key={st.n} className="!p-3.5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{st.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-sm">Этап {st.n}. {st.title}</div>
                <div className="text-xs text-slate-500">{st.desc}</div>
              </div>
              {st.n === 1 && (
                <Link to={`/vocab/${theme.id}/cards`} className="text-brand-600 font-bold text-sm">
                  Начать →
                </Link>
              )}
              {st.n === 2 && (
                <Link to={`/vocab/${theme.id}/practice`} className="text-brand-600 font-bold text-sm">
                  Начать →
                </Link>
              )}
              {st.n === 3 && (
                <Link to="/vocab/review" className="text-brand-600 font-bold text-sm">
                  Открыть →
                </Link>
              )}
              {st.n === 4 && (
                <Link
                  to={`/vocab/${theme.id}/active`}
                  className={`font-bold text-sm ${allSeen ? 'text-brand-600' : 'text-slate-300 pointer-events-none'}`}
                >
                  {allSeen ? 'Начать →' : '🔒'}
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
      {!allSeen && (
        <p className="text-xs text-slate-400 text-center">Этап 4 откроется, когда все слова темы будут просмотрены в карточках.</p>
      )}
    </div>
  );
}
