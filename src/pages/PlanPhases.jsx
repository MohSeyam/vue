import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Edit, TrendingUp, Calendar, Layers, CheckCircle, ListChecks } from "lucide-react";

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

  // إحصائيات عامة
  const totalWeeks = plan.length;
  const totalTasks = plan.flatMap(w => (w.days || []).flatMap(d => d.tasks || [])).length;
  const totalDone = plan.flatMap(w => (w.days || []).flatMap(d => d.tasks || [])).filter(task => progress.find(p => p.taskId === task.id && p.done)).length;
  const totalPercent = totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* عنوان الخطة */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-light-accent dark:text-dark-accent mb-2 drop-shadow-sm">{planName}</h1>
        <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary opacity-90 font-medium">استعرض تقدمك في جميع مراحل الخطة التعليمية</p>
      </div>
      {/* شريط التقدم العام */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <span className="font-medium">التقدم العام</span>
          <span className="text-xs text-slate-500">{totalPercent}% مكتمل</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-dark-border">
          <div className="bg-blue-500 h-3 rounded-full transition-all" style={{width: `${totalPercent}%`}}></div>
        </div>
      </div>
      {/* إحصائيات */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 font-bold">
          <Layers className="w-5 h-5" /> {phases.length} مراحل
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200 font-bold">
          <Calendar className="w-5 h-5" /> {totalWeeks} أسابيع
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-200 font-bold">
          <ListChecks className="w-5 h-5" /> {totalTasks} مهام
        </div>
      </div>
      {/* شبكة كروت المراحل */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phaseStats.map(({ phase, weeksCount, tasksCount, doneCount, percent }, idx) => (
          <Link to={`/phase/${phase}`} key={phase} className="block">
            <div className={`bg-white dark:bg-dark-card rounded-2xl shadow p-6 border border-${PHASE_COLORS[phase]}-200 dark:border-${PHASE_COLORS[phase]}-800 hover:bg-${PHASE_COLORS[phase]}-50 dark:hover:bg-${PHASE_COLORS[phase]}-900/30 transition flex flex-col gap-2 h-full`}> 
              <div className="flex items-center gap-3 mb-2">
                {PHASE_ICONS[phase]}
                <span className="font-bold text-xl text-gray-900 dark:text-white">{PHASE_NAMES[phase] || `المرحلة ${phase}`}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-${PHASE_COLORS[phase]}-100 text-${PHASE_COLORS[phase]}-700 dark:bg-${PHASE_COLORS[phase]}-900 dark:text-${PHASE_COLORS[phase]}-200`}>
                  رقم {phase}
                </span>
              </div>
              {/* توضيح توزيع الأسابيع لكل مرحلة */}
              {phase === 1 && (
                <div className="text-xs font-bold text-gray-900 dark:text-white mb-1">من الأسبوع 1 إلى 17</div>
              )}
              {phase === 2 && (
                <div className="text-xs font-bold text-gray-900 dark:text-white mb-1">من الأسبوع 18 إلى 37</div>
              )}
              {phase === 3 && (
                <div className="text-xs font-bold text-gray-900 dark:text-white mb-1">من الأسبوع 38 إلى 50</div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-900 dark:text-white mb-2">
                <Calendar className="w-4 h-4" /> {weeksCount} أسبوع
                <ListChecks className="w-4 h-4 ml-2" /> {tasksCount} مهمة
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-900 dark:text-white mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>المهام المكتملة: {doneCount} / {tasksCount}</span>
                <span className="ml-2">نسبة الإنجاز: {percent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                <div className={`h-2 rounded-full bg-${PHASE_COLORS[phase]}-500 transition-all`} style={{width: percent + '%'}}></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}