import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Edit, TrendingUp, Calendar } from "lucide-react";

const PHASE_NAMES = {
  1: "المرحلة التأسيسية",
  2: "المرحلة المتوسطة",
  3: "المرحلة النهائية"
};

export default function PlanPhases() {
  const { plan, loading, progress } = useApp();
  // طباعة أول 10 عناصر من الخطة للتشخيص
  console.log('plan in PlanPhases:', Array.isArray(plan) ? plan.slice(0, 10) : plan);

  if (loading) {
    return <div className="text-center mt-10 text-slate-400">جاري تحميل الخطة...</div>;
  }
  if (!Array.isArray(plan) || plan.length === 0) {
    return <div className="text-center mt-10 text-slate-400">لا توجد خطة متاحة</div>;
  }

  // استخرج أرقام المراحل الفعلية فقط من plan
  const phases = Array.from(new Set(plan.map(week => week.phase).filter(Boolean)));
  if (phases.length === 0) {
    return <div className="text-center mt-10 text-slate-400">لا توجد مراحل متاحة</div>;
  }

  // استخراج اسم الخطة (إذا وجد)
  const planName = plan.find(w => w.planName)?.planName || "الخطة";

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
        {phases.map((phase, idx) => (
          <Link to={`/phase/${phase}`} key={phase} className="block">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow p-4 border border-light-border dark:border-dark-border hover:bg-blue-50 dark:hover:bg-slate-800 transition">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-lg">{PHASE_NAMES[phase] || `المرحلة ${phase}`}</span>
                <span className="text-slate-500">#{idx + 1}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}