import type { Level, Verdict } from '../../types';

// ===== Единый интерфейс AI-провайдера =====
// Приложение работает ТОЛЬКО через этот интерфейс.
// Чтобы подключить реальный AI (OpenAI, локальная LLM и т.п.),
// нужно реализовать AIProvider и зарегистрировать его в engine/ai/index.ts —
// остальной код менять не придётся.

export interface ChatTurn {
  role: 'ai' | 'user';
  text: string;
}

export interface ChatContext {
  scenarioId: string;
  scenarioTitle: string;
  aiRole: string; // «продавец», «коллега»…
  userRole: string;
  level: Level;
  history: ChatTurn[];
  nodeIndex: number; // позиция в сценарном дереве (для local-провайдера)
}

export interface ChatReply {
  text: string; // реплика AI на английском
  textRu?: string;
  hintRu?: string; // подсказка для пользователя
  nextNode: number | null; // куда перешёл сценарий; null — диалог окончен
}

export interface TranslationTaskInput {
  source: string;
  sourceLang: 'ru' | 'en';
  answers: string[];
  keywords?: string[];
}

export interface TranslationVerdict {
  verdict: Verdict;
  feedback: string;
  matched?: string;
  errorTags?: string[];
}

export interface UtteranceInput {
  text: string; // что сказал/написал пользователь
  expected?: string[]; // ожидаемые ключевые слова (если сценарий задаёт рамку)
  context: ChatTurn[];
  sttConfidence?: number; // если ввод был голосом
  target?: string; // эталонная фраза для оценки произношения
}

export interface UtteranceFeedback {
  grammarOk: boolean;
  notes: string[]; // замечания по грамматике/лексике (RU)
  better?: string; // более естественный вариант
  pronunciation?: {
    score: number; // 0..100 — распознавание слов, НЕ оценка акцента
    missed: string[];
    notes: string[];
  };
}

export interface MonologueInput {
  transcript: string;
  prompt: string;
  durationSec: number;
  level: Level;
}

export interface MonologueReport {
  summary: string;
  scores: { grammar: number; vocabulary: number; fluency: number }; // 0..100
  issues: string[];
  recommendations: string[];
}

export interface AIProvider {
  id: string;
  name: string;
  kind: 'local' | 'remote';
  isConfigured(): boolean;
  chat(ctx: ChatContext, userText: string): Promise<ChatReply>;
  checkTranslation(task: TranslationTaskInput, userText: string): Promise<TranslationVerdict>;
  reviewUtterance(u: UtteranceInput): Promise<UtteranceFeedback>;
  analyzeMonologue(m: MonologueInput): Promise<MonologueReport>;
}
