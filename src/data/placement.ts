import type { PlacementItem } from '../types';

// Входной тест: определяет уровень по трём направлениям отдельно.
// weight 1 ≈ A1/A2, 2 ≈ B1, 3 ≈ B2+

export const PLACEMENT_ITEMS: PlacementItem[] = [
  // ---- грамматика ----
  {
    kind: 'grammar', weight: 1,
    question: 'She ___ to work every day.',
    options: ['go', 'goes', 'going', 'is go'],
    correct: 1,
  },
  {
    kind: 'grammar', weight: 1,
    question: '___ you like coffee?',
    options: ['Does', 'Do', 'Is', 'Are'],
    correct: 1,
  },
  {
    kind: 'grammar', weight: 1,
    question: 'I ___ TV when he called.',
    options: ['watch', 'watched', 'was watching', 'am watching'],
    correct: 2,
  },
  {
    kind: 'grammar', weight: 2,
    question: 'I ___ here since 2015.',
    options: ['live', 'am living', 'have lived', 'lived'],
    correct: 2,
  },
  {
    kind: 'grammar', weight: 2,
    question: 'If it ___ tomorrow, we\'ll stay home.',
    options: ['will rain', 'rains', 'rain', 'raining'],
    correct: 1,
  },
  {
    kind: 'grammar', weight: 2,
    question: 'You ___ smoke in the hospital — it\'s forbidden.',
    options: ["don't have to", "mustn't", "shouldn't to", "can't to"],
    correct: 1,
  },
  {
    kind: 'grammar', weight: 3,
    question: 'By the time we arrived, the film ___.',
    options: ['started', 'has started', 'had started', 'was starting'],
    correct: 2,
  },
  {
    kind: 'grammar', weight: 3,
    question: 'I wish I ___ harder when I was at school.',
    options: ['studied', 'had studied', 'would study', 'study'],
    correct: 1,
  },

  // ---- словарь ----
  {
    kind: 'vocab', weight: 1,
    question: '«appointment» — это…',
    options: ['назначенная встреча/запись', 'увольнение', 'наклонность', 'извинение'],
    correct: 0,
  },
  {
    kind: 'vocab', weight: 1,
    question: '«to commute» значит…',
    options: ['отдыхать', 'ездить на работу', 'общаться', 'переезжать'],
    correct: 1,
  },
  {
    kind: 'vocab', weight: 2,
    question: '«receipt» — это…',
    options: ['рецепт блюда', 'чек', 'расписание', 'рекомендация'],
    correct: 1,
  },
  {
    kind: 'vocab', weight: 2,
    question: '«to put off» значит…',
    options: ['выключить', 'отложить', 'надеть', 'убрать'],
    correct: 1,
  },
  {
    kind: 'vocab', weight: 3,
    question: '«to come across» значит…',
      options: ['переходить дорогу', 'натолкнуться случайно', 'согласиться', 'сдаваться'],
    correct: 1,
  },
  {
    kind: 'vocab', weight: 3,
    question: '«It depends» значит…',
    options: ['это подделка', 'это дорого', 'по-разному', 'это точно'],
    correct: 2,
  },

  // ---- аудирование (озвучивается через TTS) ----
  {
    kind: 'listening', weight: 1,
    question: 'The meeting starts at nine thirty.',
    options: ['Встреча в 9:30', 'Встреча в 3:30', 'Встреча в 9:13', 'Встреча в 19:30'],
    correct: 0,
  },
  {
    kind: 'listening', weight: 2,
    question: 'I\'ve been waiting for the bus for twenty minutes.',
    options: ['Я жду автобус 20 минут', 'Я опоздал на автобус', 'Автобус едет 20 минут', 'Я ждал автобус вчера'],
    correct: 0,
  },
  {
    kind: 'listening', weight: 3,
    question: 'Had I known about the traffic, I would have left earlier.',
    options: [
      'Я знал о пробках и выехал раньше',
      'Если бы я знал о пробках, выехал бы раньше',
      'Я выеду раньше из-за пробок',
      'Пробки задержали меня вчера',
    ],
    correct: 1,
  },
];

// Баллы → уровень по каждому направлению
export function scorePlacement(items: PlacementItem[], correctIdx: Set<number>) {
  const calc = (kind: PlacementItem['kind']) => {
    let max = 0;
    let got = 0;
    items.forEach((it, i) => {
      if (it.kind !== kind) return;
      max += it.weight;
      if (correctIdx.has(i)) got += it.weight;
    });
    const r = max ? got / max : 0;
    if (r >= 0.85) return 'B2' as const;
    if (r >= 0.6) return 'B1' as const;
    if (r >= 0.35) return 'A2' as const;
    return 'A1' as const;
  };
  return { grammar: calc('grammar'), vocab: calc('vocab'), listening: calc('listening') };
}
