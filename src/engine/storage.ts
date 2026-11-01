import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ErrorTag, Level, VocabWord } from '../types';
import type { SrsRecord } from './srs';
import { newRecord, grade, isDue } from './srs';

export interface TopicProgress {
  theoryDone: boolean;
  practiceDone: boolean;
  translationDone: boolean;
  practiceScore: number; // 0..1 лучший результат
  translationScore: number;
  mastered: boolean;
  attempts: number;
  lastScore: number;
}

export interface Mistake {
  id: string;
  tag: ErrorTag;
  context: string; // задание/фраза
  expected: string;
  got: string;
  topicId?: string;
  at: number;
}

export interface SpeakingProgress {
  attempts: number;
  lastScore: number;
  lastAt: number;
}

export interface SentenceProgress {
  attempts: number;
  bestScore: number; // 0..1
  lastScore: number;
  lastAt: number;
  mastered: boolean;
  maxStep: number; // сколько уровней сложности пройдено
}

export interface PlacementResult {
  grammar: Level;
  vocab: Level;
  listening: Level;
  at: number;
}

export interface AppState {
  placement: PlacementResult | null;
  topics: Record<string, TopicProgress>;
  srs: Record<string, SrsRecord>; // wordId → запись
  favorites: string[]; // wordId
  mistakes: Mistake[];
  speaking: Record<string, SpeakingProgress>;
  sentences: Record<string, SentenceProgress>;
  dialogues: Record<string, { opened: number; lastAt: number }>; // dialogueId → прогресс чтения
  customWords: VocabWord[]; // личный словарь (выражения из диалогов)
  activity: Record<string, number>; // 'YYYY-MM-DD' → count
  lastLesson: { path: string; label: string } | null;
  recommendations: string[];

  // actions
  setPlacement: (r: PlacementResult) => void;
  markTheory: (topicId: string) => void;
  saveStageScore: (topicId: string, stage: 'practice' | 'translation', score: number, passScore: number) => void;
  resetTopic: (topicId: string) => void;
  gradeWord: (wordId: string, quality: 0 | 1 | 2 | 3) => void;
  ensureWord: (wordId: string) => void;
  toggleFavorite: (wordId: string) => void;
  addMistake: (m: Omit<Mistake, 'id' | 'at'>) => void;
  clearMistakes: () => void;
  saveSpeaking: (scenarioId: string, score: number) => void;
  saveSentence: (packId: string, score: number, maxStep: number, passScore: number) => void;
  touchDialogue: (dialogueId: string) => void;
  saveCustomWord: (w: VocabWord) => void;
  removeCustomWord: (wordId: string) => void;
  touchActivity: () => void;
  setLastLesson: (l: { path: string; label: string } | null) => void;
  setRecommendations: (r: string[]) => void;
  setLevels: (l: { grammar: Level; vocab: Level; listening: Level }) => void;
  resetAll: () => void;
}

const emptyTopic: TopicProgress = {
  theoryDone: false,
  practiceDone: false,
  translationDone: false,
  practiceScore: 0,
  translationScore: 0,
  mastered: false,
  attempts: 0,
  lastScore: 0,
};

export const getTopic = (s: AppState, id: string): TopicProgress => s.topics[id] ?? emptyTopic;

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      placement: null,
      topics: {},
      srs: {},
      favorites: [],
      mistakes: [],
      speaking: {},
      sentences: {},
      dialogues: {},
      customWords: [],
      activity: {},
      lastLesson: null,
      recommendations: [],

      setPlacement: (r) => set({ placement: r }),

      markTheory: (topicId) =>
        set((s) => ({
          topics: { ...s.topics, [topicId]: { ...getTopic(s, topicId), theoryDone: true } },
        })),

      saveStageScore: (topicId, stage, score, passScore) =>
        set((s) => {
          const t = { ...getTopic(s, topicId) };
          t.attempts += 1;
          t.lastScore = score;
          if (stage === 'practice') {
            t.practiceDone = true;
            t.practiceScore = Math.max(t.practiceScore, score);
          } else {
            t.translationDone = true;
            t.translationScore = Math.max(t.translationScore, score);
          }
          if (t.practiceScore >= passScore && t.translationScore >= passScore) t.mastered = true;
          return { topics: { ...s.topics, [topicId]: t } };
        }),

      resetTopic: (topicId) =>
        set((s) => ({ topics: { ...s.topics, [topicId]: emptyTopic } })),

      ensureWord: (wordId) =>
        set((s) => (s.srs[wordId] ? s : { srs: { ...s.srs, [wordId]: newRecord() } })),

      gradeWord: (wordId, quality) =>
        set((s) => ({
          srs: { ...s.srs, [wordId]: grade(s.srs[wordId] ?? newRecord(), quality) },
        })),

      toggleFavorite: (wordId) =>
        set((s) => ({
          favorites: s.favorites.includes(wordId)
            ? s.favorites.filter((f) => f !== wordId)
            : [...s.favorites, wordId],
        })),

      addMistake: (m) =>
        set((s) => ({
          mistakes: [{ ...m, id: Math.random().toString(36).slice(2), at: Date.now() }, ...s.mistakes].slice(0, 200),
        })),

      clearMistakes: () => set({ mistakes: [] }),

      saveSpeaking: (scenarioId, score) =>
        set((s) => {
          const p = s.speaking[scenarioId] ?? { attempts: 0, lastScore: 0, lastAt: 0 };
          return {
            speaking: {
              ...s.speaking,
              [scenarioId]: { attempts: p.attempts + 1, lastScore: score, lastAt: Date.now() },
            },
          };
        }),

      saveSentence: (packId, score, maxStep, passScore) =>
        set((s) => {
          const p: SentenceProgress = s.sentences[packId] ?? {
            attempts: 0,
            bestScore: 0,
            lastScore: 0,
            lastAt: 0,
            mastered: false,
            maxStep: 0,
          };
          return {
            sentences: {
              ...s.sentences,
              [packId]: {
                attempts: p.attempts + 1,
                bestScore: Math.max(p.bestScore, score),
                lastScore: score,
                lastAt: Date.now(),
                mastered: p.mastered || score >= passScore,
                maxStep: Math.max(p.maxStep, maxStep),
              },
            },
          };
        }),

      touchDialogue: (dialogueId) =>
        set((s) => {
          const p = s.dialogues[dialogueId] ?? { opened: 0, lastAt: 0 };
          return {
            dialogues: { ...s.dialogues, [dialogueId]: { opened: p.opened + 1, lastAt: Date.now() } },
          };
        }),

      saveCustomWord: (w) =>
        set((s) =>
          s.customWords.some((x) => x.id === w.id) || s.customWords.some((x) => x.en.toLowerCase() === w.en.toLowerCase())
            ? s
            : { customWords: [...s.customWords, w] }
        ),

      removeCustomWord: (wordId) =>
        set((s) => {
          const srs = { ...s.srs };
          delete srs[wordId];
          return { customWords: s.customWords.filter((w) => w.id !== wordId), srs };
        }),

      touchActivity: () =>
        set((s) => {
          const key = new Date().toISOString().slice(0, 10);
          return { activity: { ...s.activity, [key]: (s.activity[key] ?? 0) + 1 } };
        }),

      setLastLesson: (l) => set({ lastLesson: l }),
      setRecommendations: (r) => set({ recommendations: r }),

      setLevels: (l) =>
        set((s) => ({
          placement: { ...(s.placement ?? { at: Date.now() }), ...l, at: s.placement?.at ?? Date.now() },
        })),

      resetAll: () =>
        set({
          placement: null,
          topics: {},
          srs: {},
          favorites: [],
          mistakes: [],
          speaking: {},
          sentences: {},
          dialogues: {},
          customWords: [],
          activity: {},
          lastLesson: null,
          recommendations: [],
        }),
    }),
    { name: 'english-coach-v1' }
  )
);

// ===== Селекторы =====

export function dueWords(s: { srs: Record<string, SrsRecord> }): string[] {
  return Object.entries(s.srs)
    .filter(([, r]) => isDue(r) && r.status !== 'new')
    .map(([id]) => id);
}

export function streakDays(activity: Record<string, number>): number {
  let streak = 0;
  const d = new Date();
  // сегодня ещё может быть не закрыто — считаем от вчера, если сегодня нет записи
  const todayKey = d.toISOString().slice(0, 10);
  let cursor = new Date(d);
  if (!activity[todayKey]) cursor = new Date(d.getTime() - 86400000);
  for (;;) {
    const key = cursor.toISOString().slice(0, 10);
    if (activity[key]) {
      streak += 1;
      cursor = new Date(cursor.getTime() - 86400000);
    } else break;
  }
  return streak;
}

export function mistakeStats(mistakes: Mistake[]): { tag: ErrorTag; count: number }[] {
  const m = new Map<ErrorTag, number>();
  for (const x of mistakes) m.set(x.tag, (m.get(x.tag) ?? 0) + 1);
  return [...m.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}
