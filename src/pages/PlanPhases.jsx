import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Edit, TrendingUp, Calendar } from "lucide-react";

export default function PlanPhases() {
  const { plan } = useApp();
  if (plan === undefined || plan === null) {
    return <div className="text-center mt-10 text-slate-400">جاري تحميل الخطة...</div>;
  }
  if (!Array.isArray(plan) || plan.length === 0) {
    return <div className="text-center mt-10 text-slate-400">لا توجد خطة متاحة</div>;
  }
  // استخراج اسم الخطة (إذا وجد)
  const planName = plan.find(w => w.planName)?.planName || "الخطة";
  // استخراج المراحل الفريدة من plan (كل أسبوع له phase)
  const phaseMap = {};
  plan.forEach(week => {
    const phase = week.phase || "غير محدد";
    if (!phaseMap[phase]) phaseMap[phase] = { desc: week.phaseDesc || '', done: 0, total: 0, name: week.phaseName };
    phaseMap[phase].total++;
    // عدّ المهام المنجزة في كل أسبوع
    if (week.days && Array.isArray(week.days)) {
      week.days.forEach(day => {
        if (day.tasks && Array.isArray(day.tasks)) {
          phaseMap[phase].done += day.tasks.filter(t => t.done).length;
        }
      });
    }
  });
  const phases = Object.keys(phaseMap);
  // حساب نسبة التقدم الكلية
  let totalTasks = 0, doneTasks = 0;
  plan.forEach(week => {
    if (week.days && Array.isArray(week.days)) {
      week.days.forEach(day => {
        if (day.tasks && Array.isArray(day.tasks)) {
          totalTasks += day.tasks.length;
          doneTasks += day.tasks.filter(t => t.done).length;
        }
      });
    }
  });
  const percent = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
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
            <div className="bg-blue-500 h-3 rounded-full transition-all" style={{width: percent + '%'}}></div>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-300">{percent}% من الخطة مكتمل</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>{phases.length} مراحل</span>
        </div>
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
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: phaseMap[phase].total ? ((phaseMap[phase].done/(phaseMap[phase].total*7))*100) + '%' : '0%'}}></div>
              </div>
              <div className="text-xs text-slate-400 mt-1">{phaseMap[phase].done} مهمة من {phaseMap[phase].total * 7} مكتملة تقريباً</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}