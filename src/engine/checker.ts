import type { ErrorTag, Verdict } from '../types';

// ===== Нормализация и сравнение текста =====

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?;:"“”()\-–—…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokens(s: string): string[] {
  return normalize(s).split(' ').filter(Boolean);
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const t = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = t;
    }
  }
  return dp[n];
}

export function similarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  const d = levenshtein(na, nb);
  return 1 - d / Math.max(na.length, nb.length, 1);
}

// ===== Синонимы / вариативность английского =====

const SYNONYMS: Record<string, string[]> = {
  'a lot of': ['lots of', 'plenty of', 'many', 'much'],
  many: ['a lot of', 'lots of'],
  much: ['a lot of'],
  usually: ['normally', 'generally', 'as a rule'],
  often: ['frequently'],
  sometimes: ['occasionally', 'from time to time'],
  rarely: ['seldom', 'hardly ever'],
  never: ["don't ever"],
  every: ['each'],
  'every day': ['daily', 'each day'],
  work: ['job'],
  job: ['work'],
  big: ['large'],
  small: ['little'],
  begin: ['start'],
  start: ['begin'],
  finish: ['end', 'complete'],
  'want to': ['wanna', 'would like to'],
  like: ['enjoy', 'love'],
  'don\'t': ['do not'],
  'doesn\'t': ['does not'],
  'didn\'t': ['did not'],
  'isn\'t': ['is not'],
  'aren\'t': ['are not'],
  'wasn\'t': ['was not'],
  'weren\'t': ['were not'],
  'can\'t': ['cannot', 'can not'],
  'won\'t': ['will not'],
  'i\'m': ['i am'],
  'he\'s': ['he is'],
  'she\'s': ['she is'],
  'it\'s': ['it is'],
  'we\'re': ['we are'],
  'they\'re': ['they are'],
  'i\'ve': ['i have'],
  'i\'ll': ['i will'],
  'i don\'t': ['i do not'],
};

// Расширяет фразу: для каждого синонимного фрагмента пробует замену
export function expandVariants(s: string): string[] {
  const variants = new Set<string>([normalize(s)]);
  const n = normalize(s);
  for (const [key, alts] of Object.entries(SYNONYMS)) {
    if (n.includes(key)) {
      for (const alt of alts) {
        variants.add(normalize(n.replace(key, alt)));
      }
    }
  }
  // порядок наречий частоты: "she usually goes" ~ "usually she goes" — не переставляем, это ок
  return [...variants];
}

export interface CheckResult {
  verdict: Verdict;
  matched?: string; // какой эталон ближе всего
  similarity: number;
  feedback: string;
  errorTags: ErrorTag[];
}

// Главная проверка свободного ответа (gap/fix/translate/speech)
export function checkText(userAnswer: string, accepted: string[], threshold = 0.92): CheckResult {
  const u = normalize(userAnswer);
  if (!u) {
    return { verdict: 'wrong', similarity: 0, feedback: 'Пустой ответ.', errorTags: ['other'] };
  }
  let best = 0;
  let bestRef = accepted[0] ?? '';
  for (const ref of accepted) {
    for (const v of expandVariants(ref)) {
      const s = similarity(u, v);
      if (s > best) {
        best = s;
        bestRef = ref;
      }
      if (best >= 1) break;
    }
    if (best >= 1) break;
  }

  const tags = detectErrorTags(userAnswer, bestRef);

  if (best >= threshold) {
    const minor = tags.filter((t) => t === 'spelling');
    if (best < 1 || minor.length) {
      return {
        verdict: 'almost',
        matched: bestRef,
        similarity: best,
        feedback: `Почти верно. Эталон: «${bestRef}». Проверьте мелочи.`,
        errorTags: tags,
      };
    }
    return { verdict: 'correct', matched: bestRef, similarity: 1, feedback: 'Верно!', errorTags: [] };
  }
  if (best >= 0.72) {
    return {
      verdict: 'almost',
      matched: bestRef,
      similarity: best,
      feedback: `Близко, но есть ошибка. Эталон: «${bestRef}».`,
      errorTags: tags,
    };
  }
  return {
    verdict: 'wrong',
    matched: bestRef,
    similarity: best,
    feedback: `Неверно. Правильный вариант: «${bestRef}».`,
    errorTags: tags.length ? tags : ['other'],
  };
}

// ===== Эвристики типичных ошибок русскоговорящих =====

export function detectErrorTags(user: string, expected: string): ErrorTag[] {
  const tags = new Set<ErrorTag>();
  const u = ` ${normalize(user)} `;
  const e = ` ${normalize(expected)} `;

  // do/does/did
  const aux = /\b(don't|do not|doesn't|does not|didn't|did not|do|does|did)\b/;
  if (aux.test(e)) {
    if (/\bdon't\b|\bdo not\b|\bdo\b/.test(u) && /\bdoes(n't| not)?\b/.test(e)) tags.add('aux-do');
    if (/\bdoes(n't| not)?\b/.test(u) && /\bdo(n't| not)?\b/.test(e)) tags.add('aux-do');
    if (!aux.test(u)) tags.add('aux-do');
  }
  // -s в 3 лице: в эталоне глагол с -s, у пользователя без
  const third = /\b\w+(s|es)\b/g;
  const expWords = e.match(third) ?? [];
  for (const w of expWords) {
    const base = w.replace(/e?s$/, '');
    if (base.length >= 2 && u.includes(` ${base} `) && !u.includes(` ${w} `)) tags.add('third-person-s');
  }
  // артикли
  const art = /\b(a|an|the)\b/g;
  const expArts = (e.match(art) ?? []).sort().join('');
  const usrArts = (u.match(art) ?? []).sort().join('');
  if (expArts !== usrArts) tags.add('article');
  // предлоги in/on/at/for/to
  const prep = /\b(in|on|at|for|to|with|from|about|of)\b/g;
  const ep = (e.match(prep) ?? []).sort().join('|');
  const up = (u.match(prep) ?? []).sort().join('|');
  if (ep !== up) tags.add('preposition');
  // время: ed/ing/will/have
  if ((/\w+ed\b/.test(e) || /\b(was|were|did)\b/.test(e)) !== (/\w+ed\b/.test(u) || /\b(was|were|did)\b/.test(u)))
    tags.add('tense');
  if (/\b(am|is|are)\s+\w+ing\b/.test(e) && !/\b(am|is|are)\s+\w+ing\b/.test(u)) tags.add('tense');
  // порядок слов: тот же набор слов, другой порядок
  const uw = tokens(user).sort().join(' ');
  const ew = tokens(expected).sort().join(' ');
  if (uw === ew && normalize(user) !== normalize(expected)) tags.add('word-order');
  // орфография: похожие слова с опечаткой
  for (const w of tokens(expected)) {
    if (w.length >= 4 && !tokens(user).includes(w)) {
      for (const uw2 of tokens(user)) {
        if (Math.abs(uw2.length - w.length) <= 2 && levenshtein(uw2, w) <= 2 && uw2 !== w) {
          tags.add('spelling');
          break;
        }
      }
    }
  }
  return [...tags];
}

// ===== Проверка русского перевода (en → ru) =====
// Локально: проверяем наличие ключевых слов/корней. При подключённом AI — делегируем ему.

export function checkRuTranslation(userAnswer: string, keywordsRu: string[], accepted: string[]): CheckResult {
  const u = normalize(userAnswer);
  if (!u) return { verdict: 'wrong', similarity: 0, feedback: 'Пустой ответ.', errorTags: ['other'] };

  // сначала точное/почти точное совпадение с принятыми вариантами
  let best = 0;
  let bestRef = accepted[0] ?? '';
  for (const ref of accepted) {
    const s = similarity(u, ref);
    if (s > best) {
      best = s;
      bestRef = ref;
    }
  }
  if (best >= 0.9) {
    return { verdict: best >= 0.99 ? 'correct' : 'almost', matched: bestRef, similarity: best, feedback: best >= 0.99 ? 'Верно!' : 'Почти верно.', errorTags: [] };
  }

  // иначе — по ключевым словам (стемминг: первые 4-5 букв)
  const stem = (w: string) => w.slice(0, Math.max(4, Math.ceil(w.length * 0.7)));
  const hits = keywordsRu.filter((k) => {
    const ks = stem(normalize(k));
    return tokens(u).some((t) => t.startsWith(ks) || stem(t) === ks || levenshtein(t, normalize(k)) <= 1);
  });
  const ratio = keywordsRu.length ? hits.length / keywordsRu.length : 0;
  if (ratio >= 0.75) {
    return {
      verdict: 'correct',
      matched: bestRef,
      similarity: ratio,
      feedback: ratio < 1 ? 'Смысл передан верно.' : 'Верно!',
      errorTags: [],
    };
  }
  if (ratio >= 0.5) {
    return {
      verdict: 'almost',
      matched: bestRef,
      similarity: ratio,
      feedback: `Частично верно. Возможный вариант: «${bestRef}».`,
      errorTags: ['vocabulary'],
    };
  }
  return {
    verdict: 'wrong',
    matched: bestRef,
    similarity: ratio,
    feedback: `Неверно. Вариант перевода: «${bestRef}».`,
    errorTags: ['vocabulary'],
  };
}

// ===== Проверка «составь своё предложение» / устной речи =====

export function checkCompose(userText: string, mustContain: string[]): CheckResult {
  const u = ` ${normalize(userText)} `;
  const missing = mustContain.filter((k) => !u.includes(` ${normalize(k)} `) && !u.includes(normalize(k)));
  if (!u.trim() || tokens(userText).length < 3) {
    return { verdict: 'wrong', similarity: 0, feedback: 'Предложение слишком короткое — нужно минимум 3 слова.', errorTags: ['other'] };
  }
  if (missing.length === 0) {
    return { verdict: 'correct', similarity: 1, feedback: 'Отлично! Конструкция использована верно.', errorTags: [] };
  }
  return {
    verdict: 'almost',
    similarity: 1 - missing.length / Math.max(mustContain.length, 1),
    feedback: `Неплохо, но не хватает: ${missing.join(', ')}. Проверьте конструкцию.`,
    errorTags: ['verb-form'],
  };
}

// Сравнение слов эталона и транскрипта речи — что пропущено/перепутано
export function diffWords(expected: string, got: string): { missed: string[]; extra: string[] } {
  const e = new Set(tokens(expected));
  const g = new Set(tokens(got));
  return {
    missed: [...e].filter((w) => ![...g].some((x) => levenshtein(x, w) <= (w.length > 5 ? 2 : 1))),
    extra: [...g].filter((w) => ![...e].some((x) => levenshtein(x, w) <= (w.length > 5 ? 2 : 1))),
  };
}
