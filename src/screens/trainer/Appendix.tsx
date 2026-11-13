import { useNavigate, useParams, Link } from 'react-router-dom';
import { getAppendixById } from '../../data/trainer/appendix';
import { Card, Button } from '../../components/ui';
import { SpeakButton } from '../../components/Audio';

export default function Appendix() {
  const { appendixId = '' } = useParams();
  const apx = getAppendixById(appendixId);
  const navigate = useNavigate();

  if (!apx) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Приложение не найдено.</p>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/trainer')}>
          К тренажёру
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <Card className="!p-3.5">
        <h2 className="font-bold">{apx.title}</h2>
        <p className="text-xs text-slate-500 mt-1">{apx.intro}</p>
      </Card>

      {apx.blocks.map((b, i) => (
        <Card key={i} className="!p-3">
          <div className="font-bold text-sm mb-2">{b.heading}</div>
          <div className="divide-y divide-slate-100">
            {b.rows.map((r, j) => (
              <div key={j} className="flex items-start gap-2 py-1.5">
                <div className="text-sm font-medium flex-1 min-w-0">{r.left}</div>
                <div className="text-xs text-slate-500 flex-1 min-w-0">{r.right}</div>
                <SpeakButton text={r.left} small />
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Link to="/trainer">
        <Button variant="secondary" className="w-full">
          ← Все разделы
        </Button>
      </Link>
    </div>
  );
}
