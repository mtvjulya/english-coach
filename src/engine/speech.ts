// Обёртки над бесплатным Web Speech API (TTS + STT)

type RecogResult = { transcript: string; confidence: number };

interface SR extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SR;
    webkitSpeechRecognition?: new () => SR;
  }
}

export const isTtsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

export const isSttSupported =
  typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  cachedVoice =
    voices.find((v) => /en[-_]US/i.test(v.lang) && /google|samantha|natural/i.test(v.name)) ??
    voices.find((v) => /en[-_]US/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    null;
  return cachedVoice;
}

if (isTtsSupported) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickVoice();
  };
}

export function speak(text: string, opts: { rate?: number; onend?: () => void } = {}): void {
  if (!isTtsSupported) {
    opts.onend?.();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = opts.rate ?? 1;
  const v = pickVoice();
  if (v) u.voice = v;
  u.onend = () => opts.onend?.();
  u.onerror = () => opts.onend?.();
  window.speechSynthesis.speak(u);
}

export function stopSpeak(): void {
  if (isTtsSupported) window.speechSynthesis.cancel();
}

// Одноразовое прослушивание. resolve(null) если недоступно/отменено.
export function listenOnce(opts: { lang?: string; timeoutMs?: number } = {}): Promise<RecogResult | null> {
  return new Promise((resolve) => {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      resolve(null);
      return;
    }
    const rec = new Ctor();
    rec.lang = opts.lang ?? 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    let done = false;
    const finish = (r: RecogResult | null) => {
      if (done) return;
      done = true;
      try {
        rec.abort();
      } catch {
        /* noop */
      }
      resolve(r);
    };
    const timer = setTimeout(() => finish(null), opts.timeoutMs ?? 12000);
    rec.onresult = (e: any) => {
      clearTimeout(timer);
      const alt = e.results?.[0]?.[0];
      finish(alt ? { transcript: alt.transcript as string, confidence: alt.confidence ?? 0 } : null);
    };
    rec.onerror = () => {
      clearTimeout(timer);
      finish(null);
    };
    rec.onend = () => {
      clearTimeout(timer);
      finish(null);
    };
    try {
      rec.start();
    } catch {
      clearTimeout(timer);
      finish(null);
    }
  });
}

// Оценка произношения: совпадение распознанного текста с эталоном.
// Честно: Web Speech API не оценивает акцент — показываем только распознавание слов.
export function pronunciationScore(expected: string, transcript: string, confidence: number): number {
  const { tokens } = { tokens: (s: string) => s.toLowerCase().replace(/[^a-z' ]/g, ' ').split(' ').filter(Boolean) };
  const e = tokens(expected);
  const g = tokens(transcript);
  if (!e.length || !g.length) return 0;
  const hits = e.filter((w) => g.includes(w)).length;
  const coverage = hits / e.length;
  const conf = confidence > 0 ? confidence : 0.7;
  return Math.round(Math.min(1, coverage * 0.7 + conf * 0.3) * 100);
}
