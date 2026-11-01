import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { aiMode } from '../engine/ai';

const tabs = [
  { to: '/', icon: '🏠', label: 'Главная' },
  { to: '/grammar', icon: '📘', label: 'Грамм.' },
  { to: '/vocab', icon: '📖', label: 'Слова' },
  { to: '/speaking', icon: '🎙️', label: 'Разговор' },
  { to: '/sentences', icon: '🧩', label: 'Фразы' },
  { to: '/dialogues', icon: '💬', label: 'Диалоги' },
];

const TITLES: [RegExp, string][] = [
  [/^\/placement/, 'Входной тест'],
  [/^\/grammar\/[^/]+\/theory/, 'Теория'],
  [/^\/grammar\/[^/]+\/practice/, 'Практика'],
  [/^\/grammar\/[^/]+\/translation/, 'Перевод и речь'],
  [/^\/grammar\/[^/]+/, 'Тема'],
  [/^\/grammar/, 'Грамматика'],
  [/^\/vocab\/review/, 'Повторение слов'],
  [/^\/vocab\/[^/]+\/cards/, 'Карточки'],
  [/^\/vocab\/[^/]+\/practice/, 'Практика слов'],
  [/^\/vocab\/[^/]+\/active/, 'Активное использование'],
  [/^\/vocab\/[^/]+/, 'Тема слов'],
  [/^\/vocab/, 'Словарный запас'],
  [/^\/speaking\/[^/]+/, 'Разговорная практика'],
  [/^\/speaking/, 'Разговорный английский'],
  [/^\/sentences\/[^/]+/, 'Конструктор предложений'],
  [/^\/sentences/, 'Построение предложений'],
  [/^\/dialogues\/[^/]+/, 'Диалог: читаем и слушаем'],
  [/^\/dialogues/, 'Диалоги'],
  [/^\/mistakes/, 'Ошибки и рекомендации'],
  [/^\/settings/, 'Настройки'],
];

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ai = aiMode();
  const topLevel = ['/', '/grammar', '/vocab', '/speaking', '/sentences', '/dialogues'].includes(pathname);
  const title = TITLES.find(([re]) => re.test(pathname))?.[1] ?? 'English Coach';
  return (
    <div className="mx-auto max-w-app min-h-dvh bg-slate-100 flex flex-col">
      <header className="sticky top-0 z-10 bg-brand-600 text-white px-4 pt-3 pb-3 shadow-sm flex items-center gap-2">
        {!topLevel && (
          <button onClick={() => navigate(-1)} className="text-xl leading-none">
            ←
          </button>
        )}
        <h1 className="text-lg font-bold flex-1 truncate">{title}</h1>
        {ai === 'remote' && <span className="text-[10px] bg-emerald-400 text-emerald-900 px-2 py-0.5 rounded-full font-bold">AI</span>}
        <NavLink to="/settings" className="text-lg leading-none opacity-80">
          ⚙️
        </NavLink>
      </header>
      <main className="flex-1 px-4 py-4 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app bg-white border-t border-slate-200 flex justify-around py-1.5 z-10 overflow-x-auto">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center px-2 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-colors ${
                isActive ? 'text-brand-700' : 'text-slate-400'
              }`
            }
          >
            <span className="text-lg">{t.icon}</span>
            {t.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
