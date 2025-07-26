import { useApp } from "../context/AppContext";

export default function PlanPhases() {
  const { plan } = useApp();
  if (!plan || !Array.isArray(plan) || plan.length === 0) {
    return <div className="text-center mt-10 text-slate-400">جاري تحميل الخطة...</div>;
  }
  // استخراج اسم الخطة (مثلاً من أول عنصر)
  const planName = plan[0]?.planName || "الخطة";
  // استخراج المراحل الفريدة
  const phases = Array.from(new Set(plan.map(w => w.phase)));
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{planName}</h2>
      <div className="grid gap-4">
        {phases.map((phase, idx) => (
          <div key={phase} className="bg-white dark:bg-dark-card rounded-lg shadow p-4 flex items-center justify-between border border-light-border dark:border-dark-border">
            <span className="font-semibold text-lg">المرحلة {phase}</span>
            <span className="text-slate-500">#{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}