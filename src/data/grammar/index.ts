import type { GrammarTopic } from '../../types';
import { presentSimple, presentContinuous } from './present';
import { pastSimple, presentPerfect } from './past';
import { futureForms, conditionals } from './future';
import { articles, prepositions } from './articles-prepositions';
import { modals, comparatives } from './modals-comparatives';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  presentSimple,
  presentContinuous,
  articles,
  prepositions,
  pastSimple,
  futureForms,
  presentPerfect,
  modals,
  comparatives,
  conditionals,
];

export const getTopicById = (id: string): GrammarTopic | undefined =>
  GRAMMAR_TOPICS.find((t) => t.id === id);
