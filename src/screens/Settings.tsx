import { useState } from 'react';
import { useApp } from '../engine/storage';
import { saveRemoteConfig, aiMode } from '../engine/ai';
import { getRemoteConfig } from '../engine/ai/openai';
import { Card, Button, SectionTitle, Tag } from '../components/ui';
import { LEVELS } from '../types';
import type { Level } from '../types';
import { isSttSupported, isTtsSupported } from '../engine/speech';

export default function Settings() {
  const s = useApp();
  const cfg = getRemoteConfig();
  const [baseUrl, setBaseUrl] = useState(cfg?.baseUrl ?? 'https://api.openai.com/v1');
  const [apiKey, setApiKey] = useState(cfg?.apiKey ?? '');
  const [model, setModel] = useState(cfg?.model ?? 'gpt-4o-mini');
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const remote = aiMode() === 'remote';

  return (
    <div className="space-y-4">
      {/* уровни */}
      <Card>
        <SectionTitle className="mb-2">📈 Ваши уровни</SectionTitle>
        {(['grammar', 'vocab', 'listening'] as const).map((k) => (
          <div key={k} className="flex items-center justify-between py-1.5">
            <span className="text-sm">{k === 'grammar' ? 'Грамматика' : k === 'vocab' ? 'Словарь' : 'Аудирование'}</span>
            <select
              value={s.placement?.[k] ?? 'A2'}
              onChange={(e) =>
                s.setLevels({
                  grammar: s.placement?.grammar ?? 'A2',
                  vocab: s.placement?.vocab ?? 'A2',
                  listening: s.placement?.listening ?? 'A2',
                  [k]: e.target.value as Level,
                })
              }
              className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
            >
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        ))}
      </Card>

      {/* AI-адаптер */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <SectionTitle>🤖 AI-собеседник</SectionTitle>
          <Tag color={remote ? 'green' : 'slate'}>{remote ? 'API подключён' : 'офлайн-движок'}</Tag>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          По умолчанию работает бесплатный локальный движок (сценарии + проверка ответов). Чтобы диалоги стал
          умнее, подключите OpenAI-совместимый API — интерфейс приложения менять не нужно. Подходит OpenAI,
          OpenRouter, Ollama, LM Studio.
        </p>
        <div className="space-y-2">
          <input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Base URL"
            className="w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm"
          />
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API ключ (sk-…)"
            type="password"
            className="w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm"
          />
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Модель"
            className="w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm"
          />
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => {
                saveRemoteConfig(baseUrl, apiKey, model);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
            >
              {saved ? '✓ Сохранено' : 'Сохранить'}
            </Button>
            {remote && (
              <Button
                variant="secondary"
                onClick={() => {
                  saveRemoteConfig('', '', '');
                  setApiKey('');
                }}
              >
                Отключить
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* возможности браузера */}
      <Card>
        <SectionTitle className="mb-2">🔧 Возможности устройства</SectionTitle>
        <div className="text-xs text-slate-600 space-y-1">
          <div>Озвучка (TTS): {isTtsSupported ? '✅ работает' : '❌ не поддерживается'}</div>
          <div>
            Распознавание речи (STT): {isSttSupported ? '✅ работает' : '❌ недоступно — используйте Chrome/Edge'}
          </div>
        </div>
      </Card>

      {/* сброс */}
      <Card>
        <SectionTitle className="mb-2">⚠️ Сброс прогресса</SectionTitle>
        {!confirmReset ? (
          <Button variant="secondary" className="w-full !border-rose-300 !text-rose-600" onClick={() => setConfirmReset(true)}>
            Сбросить весь прогресс…
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => {
                s.resetAll();
                setConfirmReset(false);
              }}
            >
              Да, удалить всё
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmReset(false)}>
              Отмена
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
