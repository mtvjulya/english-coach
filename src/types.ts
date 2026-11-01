// ===== Доменные типы приложения =====

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

// вердикт проверки ответа
export type Verdict = 'correct' | 'almost' | 'wrong';

// Теги типичных ошибок — используются в аналитике и персональных заданиях
export type ErrorTag =
  | 'aux-do' // do/does/did
  | 'third-person-s' // -s в 3 лице
  | 'word-order'
  | 'article'
  | 'tense'
  | 'verb-form'
  | 'preposition'
  | 'spelling'
  | 'vocabulary'
  | 'other';

export const ERROR_TAG_RU: Record<ErrorTag, string> = {
  'aux-do': 'Вспомогательные глаголы do/does/did',
  'third-person-s': 'Окончание -s в 3-м лице',
  'word-order': 'Порядок слов',
  article: 'Артикли a/an/the',
  tense: 'Выбор времени',
  'verb-form': 'Форма глагола',
  preposition: 'Предлоги',
  spelling: 'Правописание',
  vocabulary: 'Лексика',
  other: 'Прочее',
};

export interface Example {
  en: string;
  ru: string;
}

export interface QuizItem {
  question: string; // RU или EN
  options: string[];
  correct: number;
  explanation: string;
}

export interface Theory {
  explanation: string[]; // абзацы на русском
  formulas: { positive: string[]; negative: string[]; question: string[] };
  examples: Example[];
  comparison: { title: string; points: { aspect: string; this: string; other: string }[] }[];
  mistakes: { wrong: string; right: string; note: string }[];
  quiz: QuizItem[]; // короткая проверка понимания
}

// ===== Упражнения этапа «Практика» =====

export type Exercise =
  | {
      type: 'choice';
      prompt: string;
      sentence: string; // с ___ пропуском
      options: string[];
      answer: number;
      explanation: string;
      errorTag?: ErrorTag;
    }
  | {
      type: 'gap';
      prompt?: string;
      sentence: string; // с ___ пропуском
      answers: string[]; // допустимые варианты
      hint?: string;
      explanation: string;
      errorTag?: ErrorTag;
    }
  | {
      type: 'fix';
      prompt?: string;
      wrong: string;
      answers: string[]; // правильные варианты целиком
      explanation: string;
      errorTag?: ErrorTag;
    }
  | {
      type: 'translate';
      ru: string;
      answers: string[];
      explanation: string;
      errorTag?: ErrorTag;
    }
  | {
      type: 'compose';
      prompt: string; // задание на русском: придумай предложение о...
      mustContain: string[]; // ключевые слова/конструкции для локальной проверки
      samples: string[];
      explanation?: string;
    };

// ===== Задания этапа «Перевод и устная практика» =====

export interface TranslationTask {
  kind: 'ru2en' | 'en2ru' | 'listen' | 'speak';
  prompt: string; // RU для ru2en, EN для en2ru/listen, тема для speak
  answers: string[]; // принимаемые варианты
  keywords?: string[]; // для speak: что должно прозвучать
  keywordsRu?: string[]; // для en2ru: ключевые слова русского перевода
  hint?: string;
  explanation?: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  level: Level;
  theory: Theory;
  exercises: Exercise[];
  translation: TranslationTask[];
  passScore: number; // доля 0..1 для освоения (обычно 0.8)
}

// ===== Словарь =====

export type Pos = 'noun' | 'verb' | 'adj' | 'adv' | 'phrase' | 'phrasal';

export const POS_RU: Record<Pos, string> = {
  noun: 'сущ.',
  verb: 'гл.',
  adj: 'прил.',
  adv: 'нареч.',
  phrase: 'выражение',
  phrasal: 'фраз. глагол',
};

export interface VocabWord {
  id: string;
  en: string;
  ru: string;
  pos: Pos;
  transcription?: string;
  example: string;
  exampleRu: string;
  collocations?: { en: string; ru: string }[];
  plural?: string;
  forms?: [string, string, string]; // go–went–gone
  alt?: { ru: string; example: string; exampleRu: string }[];
}

export interface VocabTheme {
  id: string;
  title: string;
  description: string;
  level: Level;
  words: VocabWord[];
}

// ===== Разговорный модуль =====

export interface DialogueNode {
  ai: string; // реплика AI
  aiRu?: string;
  hints?: string[]; // подсказки на русском по запросу
  expect?: string[]; // ключевые слова ожидаемого ответа (для ветвления и фидбека)
  branches?: { match: string[]; goto: number }[]; // если ответ содержит match — прыжок на узел
  next?: number; // следующий узел по умолчанию; undefined → конец
  better?: string[]; // «можно сказать естественнее»
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  level: Level;
  roles: { ai: string; user: string };
  listening: { en: string; ru: string }[]; // вводный диалог для аудирования
  comprehension: QuizItem[];
  script: DialogueNode[];
  monologue: string[]; // темы свободной речи 30–90 сек
}

// ===== Модуль «Построение предложений» (Sentence Builder) =====

// Роль смыслового блока в предложении — используется для визуальной схемы
export type ChunkRole =
  | 'subject'
  | 'predicate'
  | 'object'
  | 'complement'
  | 'adverbial'
  | 'connector'
  | 'clause'
  | 'modifier';

export const CHUNK_ROLE_RU: Record<ChunkRole, string> = {
  subject: 'Подлежащее',
  predicate: 'Сказуемое',
  object: 'Дополнение',
  complement: 'Именная часть',
  adverbial: 'Обстоятельство',
  connector: 'Союз / связка',
  clause: 'Придаточная часть',
  modifier: 'Определение / наречие',
};

export interface SentenceChunk {
  text: string; // блок предложения (слово/фраза/клауза), может включать запятую
  role: ChunkRole;
  ru?: string; // перевод/пояснение блока
}

// Один уровень нарастания сложности (1 = основа … 5 = продвинутая речь)
export interface SentenceStep {
  en: string; // эталонное предложение
  ru: string; // русский образец (задание для ru→en)
  chunks: SentenceChunk[]; // блоки для пошаговой сборки и схемы
  accepts?: string[]; // дополнительные корректные варианты
  grammarNote: string; // грамматическое пояснение уровня (RU)
  diffNote?: string; // что изменилось относительно предыдущего уровня
}

// Промежуточные упражнения на конкретный тип ошибки
export interface RemedialDrill {
  tag: ErrorTag;
  title: string; // RU
  items: { ru: string; answers: string[] }[];
}

export interface SentencePack {
  id: string;
  title: string;
  level: Level;
  skills: string[]; // навыки, которые тренирует пакет (RU-лейблы)
  grammarTopicIds?: string[]; // связанные темы грамматики (для ссылок на ошибки)
  steps: SentenceStep[]; // 2..5 шагов по нарастанию
  compose: { prompt: string; mustContain: string[]; samples: string[] };
  remedial: RemedialDrill[];
}

// ===== Входной тест =====

export interface PlacementItem {
  kind: 'grammar' | 'vocab' | 'listening';
  question: string; // для listening — текст, который озвучивается
  options: string[];
  correct: number;
  weight: number; // 1 = A1/A2, 2 = B1, 3 = B2+
}
