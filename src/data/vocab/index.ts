import type { VocabTheme, VocabWord } from '../../types';
import { everyday, work, family, shopping } from './themes1';
import { travel, health, phrasal, expressions } from './themes2';
import { academic, idioms, nuance } from './themes3';

export const VOCAB_THEMES: VocabTheme[] = [
  everyday,
  family,
  shopping,
  work,
  travel,
  health,
  phrasal,
  expressions,
  academic,
  idioms,
  nuance,
];

export const ALL_WORDS: VocabWord[] = VOCAB_THEMES.flatMap((t) => t.words);

export const getThemeById = (id: string): VocabTheme | undefined =>
  VOCAB_THEMES.find((t) => t.id === id);

export const getWordById = (id: string): VocabWord | undefined =>
  ALL_WORDS.find((w) => w.id === id);

export const themeOfWord = (wordId: string): VocabTheme | undefined =>
  VOCAB_THEMES.find((t) => t.words.some((w) => w.id === wordId));
