import { useEffect, useRef, useState } from 'react';
import { speak, stopSpeak, listenOnce, isTtsSupported, isSttSupported, sttErrorText } from '../engine/speech';

// Последовательное воспроизведение списка реплик с подсветкой текущей и возможностью стопа
export function useSequencePlayer() {
  const [idx, setIdx] = useState<number | null>(null);
  const active = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = () => {
    active.current = false;
    if (timer.current) clearTimeout(timer.current);
    stopSpeak();
    setIdx(null);
  };

  const play = (texts: string[], rate?: number) => {
    if (!texts.length) return;
    active.current = true;
    const step = (i: number) => {
      if (!active.current || i >= texts.length) {
        active.current = false;
        setIdx(null);
        return;
      }
      setIdx(i);
      speak(texts[i], {
        rate,
        onend: () => {
          timer.current = setTimeout(() => step(i + 1), 350);
        },
      });
    };
    step(0);
  };

  useEffect(
    () => () => {
      active.current = false;
      if (timer.current) clearTimeout(timer.current);
      stopSpeak();
    },
    []
  );

  return { idx, playing: idx !== null, play, stop };
}

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
  const [error, setError] = useState<string | null>(null);
  if (!isSttSupported) {
    return <span className="text-xs text-slate-400">Распознавание речи работает в Chrome/Edge — введите текст</span>;
  }
  return (
    <span className="inline-flex flex-col gap-1">
      <button
        onClick={async () => {
          if (listening) return;
          setListening(true);
          setError(null);
          const r = await listenOnce({ lang, timeoutMs: 15000 });
          setListening(false);
          if (r.transcript) {
            onResult(r.transcript, r.confidence ?? 0);
          } else {
            setError(sttErrorText(r.error));
            onResult(null, 0);
          }
        }}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-sm transition-colors ${
          listening ? 'bg-rose-600 text-white recording' : 'bg-rose-100 text-rose-700 active:bg-rose-200'
        }`}
      >
        🎤 {listening ? 'Слушаю…' : 'Говорить'}
      </button>
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </span>
  );
}
