import { Link } from 'react-router-dom';
import { VOCAB_THEMES } from '../../data/vocab';
import { useApp, dueWords } from '../../engine/storage';
import { Card, Tag, ProgressBar } from '../../components/ui';
import { SpeakButton } from '../../components/Audio';
import { isDue } from '../../engine/srs';

export default function VocabThemes() {
  const s = useApp();
  const due = dueWords(s).length;

  return (
    <div className="space-y-4">
      {due > 0 && (
        <Link to="/vocab/review">
          <Card className="!bg-amber-50 !border-amber-200 active:bg-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">🔁 Повторение</div>
                <div className="text-xs text-slate-500">пора повторить по интервалам</div>
              </div>
              <span className="bg-amber-500 text-white text-sm font-bold rounded-full px-3 py-1">{due}</span>
            </div>
          </Card>
        </Link>
      )}

      {s.customWords.length > 0 && (
        <Card>
          <div className="font-bold text-sm mb-2">⭐ Мои выражения</div>
          <div className="space-y-2">
            {s.customWords.map((w) => (
              <div key={w.id} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2">
                <SpeakButton text={w.en} small />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold break-words">{w.en}</div>
                  <div className="text-xs text-slate-500">{w.ru}</div>
                </div>
                <button
                  onClick={() => s.removeCustomWord(w.id)}
                  className="text-slate-300 active:text-rose-500 text-lg leading-none px-1"
                  title="Удалить"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Сохранённые в диалогах выражения попадают в интервальное повторение.
          </p>
        </Card>
      )}

      <div className="space-y-2">
        {VOCAB_THEMES.map((t) => {
          const learned = t.words.filter((w) => s.srs[w.id] && s.srs[w.id].status !== 'new').length;
          const dueInTheme = t.words.filter((w) => s.srs[w.id] && isDue(s.srs[w.id]) && s.srs[w.id].status !== 'new').length;
          return (
            <Link key={t.id} to={`/vocab/${t.id}`}>
              <Card className="!p-3.5 active:bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{t.title}</span>
                  <div className="flex gap-1.5">
                    <Tag color="indigo">{t.level}</Tag>
                    {dueInTheme > 0 && <Tag color="amber">{dueInTheme} на повторение</Tag>}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mb-1.5">{t.description}</div>
                <div className="flex items-center gap-2">
                  <ProgressBar value={learned / t.words.length} className="flex-1" />
                  <span className="text-xs text-slate-400">
                    {learned}/{t.words.length}
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
