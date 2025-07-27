import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Edit, TrendingUp, Calendar, Layers, CheckCircle } from "lucide-react";

const PHASE_NAMES = {
  1: "المرحلة التأسيسية",
  2: "المرحلة المتوسطة",
  3: "المرحلة النهائية"
};
const PHASE_COLORS = {
  1: "blue",
  2: "emerald",
  3: "violet"
};
const PHASE_ICONS = {
  1: <Layers className="w-7 h-7 text-blue-500" />,
  2: <Layers className="w-7 h-7 text-emerald-500" />,
  3: <Layers className="w-7 h-7 text-violet-500" />
};

export default function PlanPhases() {
  const { plan, loading, progress } = useApp();
  if (loading) {
    return <div className="text-center mt-10 text-slate-400">جاري تحميل الخطة...</div>;
  }
  if (!Array.isArray(plan) || plan.length === 0) {
    return <div className="text-center mt-10 text-slate-400">لا توجد خطة متاحة</div>;
  }

  // استخرج أرقام المراحل الفريدة فقط
  const phases = Array.from(new Set(plan.map(week => week.phase).filter(Boolean)));
  if (phases.length === 0) {
    return <div className="text-center mt-10 text-slate-400">لا توجد مراحل متاحة</div>;
  }

  // استخراج اسم الخطة (إذا وجد)
  const planName = plan.find(w => w.planName)?.planName || "الخطة";

  // حساب بيانات كل مرحلة
  const phaseStats = phases.map(phase => {
    const phaseWeeks = plan.filter(w => w.phase === phase);
    const weeksCount = phaseWeeks.length;
    const allTasks = phaseWeeks.flatMap(w => (w.days || []).flatMap(d => d.tasks || []));
    const tasksCount = allTasks.length;
    const doneCount = allTasks.filter(task => progress.find(p => p.taskId === task.id && p.done)).length;
    const percent = tasksCount ? Math.round((doneCount / tasksCount) * 100) : 0;
    return { phase, weeksCount, tasksCount, doneCount, percent };
  });

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{planName}</h2>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">التقدم العام</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-dark-border">
            <div className="bg-blue-500 h-3 rounded-full transition-all" style={{width: `${Math.round((progress?.filter(p => p.done).length / (progress?.length || 1)) * 100)}%`}}></div>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-300">{Math.round((progress?.filter(p => p.done).length / (progress?.length || 1)) * 100)}% من الخطة مكتمل</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>{phases.length} مراحل</span>
        </div>
      </div>
      <div className="grid gap-4">
        {phaseStats.map(({ phase, weeksCount, tasksCount, doneCount, percent }, idx) => (
          <Link to={`/phase/${phase}`} key={phase} className="block">
            <div className={`bg-white dark:bg-dark-card rounded-lg shadow p-4 border border-${PHASE_COLORS[phase]}-200 dark:border-${PHASE_COLORS[phase]}-800 hover:bg-${PHASE_COLORS[phase]}-50 dark:hover:bg-${PHASE_COLORS[phase]}-900/30 transition flex items-center gap-4 justify-between`}> 
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {PHASE_ICONS[phase]}
                  <span className="font-semibold text-lg">{PHASE_NAMES[phase] || `المرحلة ${phase}`}</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-${PHASE_COLORS[phase]}-100 text-${PHASE_COLORS[phase]}-700 dark:bg-${PHASE_COLORS[phase]}-900 dark:text-${PHASE_COLORS[phase]}-200`}>
                    {weeksCount} أسبوع
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>المهام المكتملة: {doneCount} / {tasksCount}</span>
                  <span className="ml-2">نسبة الإنجاز: {percent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                  <div className={`h-2 rounded-full bg-${PHASE_COLORS[phase]}-500 transition-all`} style={{width: percent + '%'}}></div>
                </div>
              </div>
              <button className={`px-4 py-2 rounded bg-${PHASE_COLORS[phase]}-100 dark:bg-${PHASE_COLORS[phase]}-900 text-${PHASE_COLORS[phase]}-700 dark:text-${PHASE_COLORS[phase]}-200 hover:bg-${PHASE_COLORS[phase]}-200 dark:hover:bg-${PHASE_COLORS[phase]}-800 transition font-bold`}>عرض الأسابيع</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}