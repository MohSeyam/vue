import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function PlanPhases() {
  const { plan } = useApp();
  if (!plan || !Array.isArray(plan) || plan.length === 0) {
    return <div className="text-center mt-10 text-slate-400">جاري تحميل الخطة...</div>;
  }
  // استخراج اسم الخطة (مثلاً من أول عنصر)
  const planName = plan[0]?.planName || "الخطة";
  // استخراج المراحل الفريدة مع الوصف
  const phaseMap = {};
  plan.forEach(item => {
    if (!phaseMap[item.phase]) phaseMap[item.phase] = { desc: item.phaseDesc || '', done: 0, total: 0 };
    phaseMap[item.phase].total++;
    if (item.done) phaseMap[item.phase].done++;
    if (item.phaseName) phaseMap[item.phase].name = item.phaseName;
  });
  const phases = Object.keys(phaseMap);
  // حساب نسبة التقدم الكلية
  const total = plan.length;
  const done = plan.filter(w => w.done).length;
  const percent = Math.round((done / total) * 100);
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-center">{planName}</h2>
      <div className="mb-6 text-center">
        <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-dark-border">
          <div className="bg-blue-500 h-3 rounded-full transition-all" style={{width: percent + '%'}}></div>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-300">{percent}% من الخطة مكتمل</span>
      </div>
      <div className="grid gap-4">
        {phases.map((phase, idx) => (
          <Link to={`/phase/${phase}`} key={phase} className="block">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow p-4 border border-light-border dark:border-dark-border hover:bg-blue-50 dark:hover:bg-slate-800 transition">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-lg">{phaseMap[phase].name || `المرحلة ${phase}`}</span>
                <span className="text-slate-500">#{idx + 1}</span>
              </div>
              {phaseMap[phase].desc && <div className="text-slate-500 text-sm mb-2">{phaseMap[phase].desc}</div>}
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: ((phaseMap[phase].done/phaseMap[phase].total)*100) + '%'}}></div>
              </div>
              <div className="text-xs text-slate-400 mt-1">{phaseMap[phase].done} من {phaseMap[phase].total} مكتمل</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}