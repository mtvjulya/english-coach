import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-4 ${className}`}>{children}</div>;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  className?: string;
  disabled?: boolean;
}) {
  const styles = {
    primary: 'bg-brand-600 text-white active:bg-brand-700',
    secondary: 'bg-white text-brand-700 border border-brand-200 active:bg-brand-50',
    ghost: 'bg-transparent text-slate-600 active:bg-slate-100',
    danger: 'bg-rose-600 text-white active:bg-rose-700',
    success: 'bg-emerald-600 text-white active:bg-emerald-700',
  } as const;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2.5 font-semibold text-sm transition-colors disabled:opacity-40 disabled:pointer-events-none ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2 rounded-full bg-slate-200 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-brand-600 transition-all duration-500"
        style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }}
      />
    </div>
  );
}

export function Tag({ children, color = 'slate' }: { children: ReactNode; color?: 'slate' | 'green' | 'amber' | 'red' | 'indigo' }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-600',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-rose-100 text-rose-700',
    indigo: 'bg-brand-100 text-brand-700',
  } as const;
  return <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color]}`}>{children}</span>;
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-base font-bold text-slate-800 ${className}`}>{children}</h2>;
}

export function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-3 text-center">
      <div className="text-xl font-bold text-brand-700">{value}</div>
      <div className="text-xs text-slate-500 font-medium">{label}</div>
      {sub && <div className="text-[10px] text-slate-400">{sub}</div>}
    </div>
  );
}

export function VerdictBadge({ verdict }: { verdict: 'correct' | 'almost' | 'wrong' }) {
  const map = {
    correct: { text: 'Верно', cls: 'bg-emerald-100 text-emerald-700' },
    almost: { text: 'Почти', cls: 'bg-amber-100 text-amber-700' },
    wrong: { text: 'Неверно', cls: 'bg-rose-100 text-rose-700' },
  } as const;
  const m = map[verdict];
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${m.cls}`}>{m.text}</span>;
}
