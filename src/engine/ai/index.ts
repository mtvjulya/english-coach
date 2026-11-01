import type { AIProvider } from './types';
import { LocalAI } from './local';
import { OpenAIProvider, getRemoteConfig } from './openai';
import type { DialogueNode } from '../../types';

// Единая точка доступа к AI. Весь код приложения берёт провайдера отсюда.
// Порядок: если настроен remote (ключ в настройках или .env) — используем его,
// иначе бесплатный локальный движок.

const local = new LocalAI();
let remote: OpenAIProvider | null = null;

function ensureRemote(): OpenAIProvider | null {
  const cfg = getRemoteConfig();
  if (!cfg) {
    remote = null;
    return null;
  }
  if (!remote || remote['cfg']?.apiKey !== cfg.apiKey || remote['cfg']?.baseUrl !== cfg.baseUrl) {
    remote = new OpenAIProvider(cfg);
  }
  return remote;
}

export function getAI(): AIProvider {
  const r = ensureRemote();
  return r && r.isConfigured() ? r : local;
}

export function getLocalAI(): LocalAI {
  return local;
}

export function aiMode(): 'local' | 'remote' {
  return getAI().kind;
}

export function registerScenario(scenarioId: string, nodes: DialogueNode[]): void {
  local.registerScript(scenarioId, nodes);
}

// Настройки remote AI сохраняются в localStorage:
// ec_ai_base_url, ec_ai_api_key, ec_ai_model — см. экран Settings.
export function saveRemoteConfig(baseUrl: string, apiKey: string, model: string): void {
  if (apiKey) {
    localStorage.setItem('ec_ai_base_url', baseUrl || 'https://api.openai.com/v1');
    localStorage.setItem('ec_ai_api_key', apiKey);
    localStorage.setItem('ec_ai_model', model || 'gpt-4o-mini');
  } else {
    ['ec_ai_base_url', 'ec_ai_api_key', 'ec_ai_model'].forEach((k) => localStorage.removeItem(k));
  }
}
