import { useState } from 'react';
import { speak, stopSpeak, listenOnce, isTtsSupported, isSttSupported } from '../engine/speech';

// Кнопка озвучки (TTS)
export function SpeakButton({ text, slow = false, small = false }: { text: string; slow?: boolean; small?: boolean }) {
  const [playing, setPlaying] = useState(false);
  if (!isTtsSupported) return null;
  return (
    <button
      onClick={() => {
        if (playing) {
          stopSpeak();
          setPlaying(false);
          return;
        }
        setPlaying(true);
        speak(text, { rate: slow ? 0.6 : 1, onend: () => setPlaying(false) });
      }}
      title={slow ? 'Прослушать медленно' : 'Прослушать'}
      className={`inline-flex items-center justify-center rounded-full transition-colors ${
        playing ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700 active:bg-brand-200'
      } ${small ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'}`}
    >
      {slow ? '🐢' : '🔊'}
    </button>
  );
}

// Кнопка записи речи (STT) с fallback
export function MicButton({
  onResult,
  lang = 'en-US',
}: {
  onResult: (transcript: string | null, confidence: number) => void;
  lang?: string;
}) {
  const [listening, setListening] = useState(false);
  if (!isSttSupported) {
    return <span className="text-xs text-slate-400">Распознавание речи не поддерживается в этом браузере — введите текст</span>;
  }
  return (
    <button
      onClick={async () => {
        if (listening) return;
        setListening(true);
        const r = await listenOnce({ lang, timeoutMs: 15000 });
        setListening(false);
        onResult(r?.transcript ?? null, r?.confidence ?? 0);
      }}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-sm transition-colors ${
        listening ? 'bg-rose-600 text-white recording' : 'bg-rose-100 text-rose-700 active:bg-rose-200'
      }`}
    >
      🎤 {listening ? 'Слушаю…' : 'Говорить'}
    </button>
  );
}
