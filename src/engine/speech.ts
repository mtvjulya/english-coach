// Обёртки над бесплатным Web Speech API (TTS + STT)

type RecogResult = { transcript: string; confidence: number; error?: string };

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

// Одноразовое прослушивание. Всегда резолвится: при неудаче transcript='' и error с причиной.
export function listenOnce(opts: { lang?: string; timeoutMs?: number } = {}): Promise<RecogResult> {
  return new Promise((resolve) => {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      resolve({ transcript: '', confidence: 0, error: 'unsupported' });
      return;
    }
    const rec = new Ctor();
    rec.lang = opts.lang ?? 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    let done = false;
    const finish = (r: RecogResult | null, error?: string) => {
      if (done) return;
      done = true;
      try {
        rec.abort();
      } catch {
        /* noop */
      }
      resolve(r ?? { transcript: '', confidence: 0, error: error ?? 'no-speech' });
    };
    const timer = setTimeout(() => finish(null, 'timeout'), opts.timeoutMs ?? 12000);
    rec.onresult = (e: any) => {
      clearTimeout(timer);
      const alt = e.results?.[0]?.[0];
      finish(alt ? { transcript: alt.transcript as string, confidence: alt.confidence ?? 0 } : null, 'no-speech');
    };
    rec.onerror = (e: any) => {
      clearTimeout(timer);
      finish(null, (e?.error as string) ?? 'error');
    };
    rec.onend = () => {
      clearTimeout(timer);
      finish(null, 'no-speech');
    };
    try {
      rec.start();
    } catch {
      clearTimeout(timer);
      finish(null, 'start-failed');
    }
  });
}

// Человекочитаемые причины сбоя STT
export const STT_ERROR_RU: Record<string, string> = {
  'not-allowed': 'Нет доступа к микрофону — разрешите его в браузере',
  'service-not-allowed': 'Распознавание заблокировано — попробуйте Chrome/Edge напрямую, не во встроенном окне',
  'audio-capture': 'Микрофон не найден — проверьте подключение',
  'no-speech': 'Не расслышал — говорите чётче и попробуйте ещё раз',
  network: 'Для распознавания речи нужен интернет',
  timeout: 'Время вышло — попробуйте ещё раз',
  aborted: 'Прослушивание прервано',
  unsupported: 'Распознавание речи не поддерживается в этом браузере',
  'start-failed': 'Не удалось запустить распознавание — попробуйте ещё раз',
};

export const sttErrorText = (code?: string): string =>
  STT_ERROR_RU[code ?? ''] ?? 'Не удалось распознать речь — попробуйте ещё раз или введите текст';

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
