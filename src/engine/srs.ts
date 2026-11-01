// Интервальное повторение (упрощённый SM-2)

export interface SrsRecord {
  ease: number; // 1.3 .. 3.0
  interval: number; // дней
  due: number; // timestamp ms
  reps: number;
  lapses: number; // сколько раз забыл
  status: 'new' | 'learning' | 'review' | 'mastered';
  lastGrade?: number;
}

export const newRecord = (): SrsRecord => ({
  ease: 2.5,
  interval: 0,
  due: Date.now(),
  reps: 0,
  lapses: 0,
  status: 'new',
});

const DAY = 24 * 60 * 60 * 1000;

// quality: 0 = не помню, 1 = с трудом/ошибка, 2 = хорошо, 3 = легко
export function grade(rec: SrsRecord, quality: 0 | 1 | 2 | 3): SrsRecord {
  const r = { ...rec };
  r.lastGrade = quality;
  r.reps += 1;

  if (quality <= 1) {
    r.lapses += 1;
    r.status = 'learning';
    r.interval = quality === 0 ? 0 : 1;
    r.ease = Math.max(1.3, r.ease - 0.2);
    r.due = Date.now() + (quality === 0 ? 10 * 60 * 1000 : r.interval * DAY); // 10 мин или завтра
    return r;
  }

  r.ease = Math.min(3.0, Math.max(1.3, r.ease + (quality === 3 ? 0.15 : 0)));
  if (r.status === 'new' || r.status === 'learning') {
    r.interval = quality === 3 ? 3 : 1;
    r.status = 'learning';
  } else {
    r.interval = Math.round(r.interval * r.ease);
  }
  if (r.reps >= 4 && quality >= 2) r.status = 'review';
  if (r.interval >= 21) r.status = 'mastered';
  r.due = Date.now() + r.interval * DAY;
  return r;
}

export function isDue(rec: SrsRecord): boolean {
  return rec.due <= Date.now();
}

export function dueIn(rec: SrsRecord): string {
  const ms = rec.due - Date.now();
  if (ms <= 0) return 'сейчас';
  const d = Math.round(ms / DAY);
  if (d >= 1) return `через ${d} дн.`;
  const h = Math.round(ms / 3600000);
  return `через ${h} ч`;
}
