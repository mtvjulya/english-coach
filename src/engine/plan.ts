import type { GrammarTopic, Scenario, SentencePack, VocabTheme } from '../types';
import type { AppState, TopicProgress } from './storage';
import { getTopic, dueWords } from './storage';
import { ERROR_TAG_RU } from '../types';
import { mistakeStats } from './storage';

export interface PlanItem {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  done: boolean;
}

// Формирует «план на сегодня» из текущего состояния
export function todayPlan(
  s: AppState,
  topics: GrammarTopic[],
  themes: VocabTheme[],
  scenarios: Scenario[],
  packs: SentencePack[] = []
): PlanItem[] {
  const items: PlanItem[] = [];

  // 1. повторение слов по SRS
  const due = dueWords(s).length;
  if (due > 0) {
    items.push({
      id: 'srs',
      title: `Повторить слова (${due})`,
      subtitle: 'Интервальное повторение',
      path: '/vocab/review',
      done: false,
    });
  }

  // 2. незавершённая тема грамматики
  const inProgress = topics.find((t) => {
    const p = getTopic(s, t.id);
    return (p.theoryDone || p.practiceDone) && !p.mastered;
  });
  if (inProgress) {
    const p = getTopic(s, inProgress.id);
    items.push({
      id: `topic-${inProgress.id}`,
      title: `Грамматика: ${inProgress.title}`,
      subtitle: !p.theoryDone ? 'Этап: теория' : !p.practiceDone ? 'Этап: практика' : 'Этап: перевод и речь',
      path: `/grammar/${inProgress.id}`,
      done: false,
    });
  } else {
    const next = topics.find((t) => !getTopic(s, t.id).mastered);
    if (next) {
      items.push({
        id: `topic-${next.id}`,
        title: `Новая тема: ${next.title}`,
        subtitle: `Уровень ${next.level}`,
        path: `/grammar/${next.id}`,
        done: false,
      });
    }
  }

  // 3. новые слова: первая незаконченная тема
  const theme = themes.find((th) => th.words.some((w) => !s.srs[w.id] || s.srs[w.id].status === 'new'));
  if (theme) {
    items.push({
      id: `vocab-${theme.id}`,
      title: `Слова: ${theme.title}`,
      subtitle: 'Новые карточки',
      path: `/vocab/${theme.id}`,
      done: false,
    });
  }

  // 4. разговорная практика
  const scen = scenarios.find((sc) => !(s.speaking[sc.id]?.attempts ?? 0));
  if (scen) {
    items.push({
      id: `speak-${scen.id}`,
      title: `Разговор: ${scen.title}`,
      subtitle: 'Диалог + аудирование',
      path: `/speaking/${scen.id}`,
      done: false,
    });
  }

  // 5. конструктор предложений
  const pack = packs.find((p) => !s.sentences[p.id]?.mastered);
  if (pack) {
    items.push({
      id: `sent-${pack.id}`,
      title: `Конструктор: ${pack.title}`,
      subtitle: 'Построение предложений по уровням',
      path: `/sentences/${pack.id}`,
      done: false,
    });
  }

  return items.slice(0, 4);
}

// Куда вести кнопка «Продолжить обучение»
export function resumeLesson(
  s: AppState,
  topics: GrammarTopic[]
): { path: string; label: string } | null {
  if (s.lastLesson) return s.lastLesson;
  const t = topics.find((x) => !getTopic(s, x.id).mastered);
  if (t) return { path: `/grammar/${t.id}`, label: `Грамматика: ${t.title}` };
  return { path: '/vocab', label: 'Словарный запас' };
}

// Рекомендации по ошибкам: топ-теги → что повторить
export function buildRecommendations(s: AppState, topics: GrammarTopic[]): string[] {
  const recs: string[] = [];
  const stats = mistakeStats(s.mistakes);
  for (const { tag, count } of stats.slice(0, 3)) {
    if (count < 2) continue;
    const topic = topics.find((t) =>
      t.exercises.some((e) => (e as { errorTag?: string }).errorTag === tag)
    );
    recs.push(
      `Частая ошибка: ${ERROR_TAG_RU[tag]} (${count}×)` +
        (topic ? ` — повторите тему «${topic.title}»` : '')
    );
  }
  const weak = topics.filter((t) => {
    const p: TopicProgress = getTopic(s, t.id);
    return p.practiceDone && p.lastScore < t.passScore;
  });
  for (const t of weak.slice(0, 2)) {
    recs.push(`Тема «${t.title}» пройдена ниже порога — стоит повторить теорию и ошибки.`);
  }
  if (!recs.length) recs.push('Ошибок пока мало — продолжайте в том же духе!');
  return recs;
}
