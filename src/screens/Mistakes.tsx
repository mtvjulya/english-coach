import { Link } from 'react-router-dom';
import { useApp, mistakeStats } from '../engine/storage';
import { buildRecommendations } from '../engine/plan';
import { GRAMMAR_TOPICS, getTopicById } from '../data/grammar';
import { Card, Tag, Button, SectionTitle } from '../components/ui';
import { ERROR_TAG_RU } from '../types';

export default function Mistakes() {
  const s = useApp();
  const stats = mistakeStats(s.mistakes);
  const recs = buildRecommendations(s, GRAMMAR_TOPICS);

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle className="mb-2">🎯 Рекомендации</SectionTitle>
        <ul className="text-sm text-slate-600 space-y-1.5">
          {recs.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </Card>

      {stats.length > 0 && (
        <Card>
          <SectionTitle className="mb-2">📊 Частые ошибки</SectionTitle>
          <div className="space-y-1.5">
            {stats.map((m) => (
              <div key={m.tag} className="flex items-center justify-between">
                <span className="text-sm">{ERROR_TAG_RU[m.tag]}</span>
                <Tag color={m.count >= 5 ? 'red' : 'amber'}>{m.count}×</Tag>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-between mb-2">
          <SectionTitle>📝 История ошибок</SectionTitle>
          {s.mistakes.length > 0 && (
            <button onClick={s.clearMistakes} className="text-xs text-rose-500 underline">
              очистить
            </button>
          )}
        </div>
        {s.mistakes.length === 0 && (
          <p className="text-sm text-slate-500">Ошибок пока нет — отличный знак!</p>
        )}
        <div className="space-y-2.5">
          {s.mistakes.slice(0, 30).map((m) => {
            const topic = m.topicId ? getTopicById(m.topicId) : undefined;
            return (
              <div key={m.id} className="border-b border-slate-100 pb-2 last:border-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Tag color="red">{ERROR_TAG_RU[m.tag]}</Tag>
                  {topic && (
                    <Link to={`/grammar/${topic.id}`} className="text-[10px] text-brand-600 underline">
                      {topic.title}
                    </Link>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  {m.got && <span className="line-through decoration-rose-300 mr-1">{m.got}</span>}
                  {m.expected && <span className="text-emerald-700">→ {m.expected}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
