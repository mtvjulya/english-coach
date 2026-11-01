import { Link } from 'react-router-dom';
import { SENTENCE_PACKS, STEP_LEVELS } from '../../data/sentences';
import { ALL_WORDS } from '../../data/vocab';
import { useApp } from '../../engine/storage';
import { tokens } from '../../engine/checker';
import { Card, Tag, ProgressBar, SectionTitle } from '../../components/ui';
import type { SentencePack } from '../../types';

// Id слов из словарного модуля, задействованных в пакете
function vocabInPack(pack: SentencePack): string[] {
  const text = pack.steps.map((s) => s.en).join(' ') + ' ' + pack.compose.samples.join(' ');
  const textTokens = new Set(tokens(text));
  return ALL_WORDS.filter((w) => {
    const base = w.en.replace(/^to /, '').split('/')[0].trim();
    return tokens(base).every((t) => textTokens.has(t)) && tokens(base).length <= 2;
  }).map((w) => w.id);
}

export default function SentencesHub() {
  const s = useApp();

  return (
    <div className="space-y-4">
      <Card className="!p-3.5">
        <SectionTitle className="mb-1">🧩 Как это работает</SectionTitle>
        <p className="text-xs text-slate-500">
          Одна мысль наращивается по уровням: <b>основа → детали → соединение → зависимые части → сложная структура</b>.
          Собирайте предложение из блоков, сравнивайте версии, произносите вслух и стройте своё по той же модели.
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {STEP_LEVELS.map((l, i) => (
            <Tag key={l} color={i < 2 ? 'slate' : i < 4 ? 'indigo' : 'amber'}>
              {i + 1}. {l}
            </Tag>
          ))}
        </div>
      </Card>

      {SENTENCE_PACKS.map((pack, i) => {
        const p = s.sentences[pack.id];
        const prev = i > 0 ? SENTENCE_PACKS[i - 1] : null;
        const prevMastered = !prev || s.sentences[prev.id]?.mastered;
        const stepsTotal = pack.steps.length;
        const stepsDone = Math.min(p?.maxStep ?? 0, stepsTotal);
        const learned = vocabInPack(pack).filter((id) => s.srs[id] && s.srs[id].status !== 'new');

        return (
          <Link key={pack.id} to={`/sentences/${pack.id}`}>
            <Card className="!p-3.5 active:bg-slate-50 mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{pack.title}</span>
                <div className="flex gap-1.5">
                  <Tag color="indigo">{pack.level}</Tag>
                  {p?.mastered ? (
                    <Tag color="green">✓ освоено</Tag>
                  ) : (
                    p && p.attempts > 0 && <Tag color="amber">{stepsDone}/{stepsTotal} ур.</Tag>
                  )}
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-1.5">«{pack.steps[pack.steps.length - 1].en}»</div>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {pack.skills.slice(0, 3).map((sk) => (
                  <span key={sk} className="text-[10px] text-slate-400 bg-slate-50 rounded px-1.5 py-0.5">
                    {sk}
                  </span>
                ))}
                {learned.length > 0 && (
                  <span className="text-[10px] text-brand-600 bg-brand-50 rounded px-1.5 py-0.5 font-semibold">
                    📖 {learned.length} слов из вашего словаря
                  </span>
                )}
              </div>
              <ProgressBar value={p?.mastered ? 1 : stepsDone / stepsTotal} />
              {!prevMastered && (
                <div className="text-[10px] text-amber-600 mt-1.5">
                  💡 Рекомендуем сначала освоить «{prev!.title}» — но можно продолжить по вашему выбору
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
