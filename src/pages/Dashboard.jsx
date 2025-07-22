// Dashboard.jsx

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import PhaseCard from "../components/plan/PhaseCard";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import WeekProgress from "../components/dashboard/WeekProgress";
import AchievementsSummary from "../components/dashboard/AchievementsSummary";
import { getPhases } from "../services/dataService";
import { useCyberPlan } from "../hooks/useCyberPlan";

export default function Dashboard() {
  const { t } = useTranslation();
  const { lang } = useApp();
  const [phases, setPhases] = useState([]);
  const navigate = useNavigate();
  const isRTL = lang === "ar";
  const { plan } = useCyberPlan();

  useEffect(() => {
    getPhases().then(setPhases);
  }, []);

  return (
    <div className={`max-w-6xl mx-auto py-8 px-2 ${isRTL ? "rtl" : "ltr"}`}>
      {/* العنوان والرسالة */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-sky-400 mb-2 drop-shadow-sm">
          {t("dashboardTitle", "لوحة التحكم")}
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-200 opacity-90 font-medium">
          {t("welcomeMsg", "مرحبًا بعودتك! استكشف تقدمك وابدأ يومك بخطوة جديدة.")}
        </p>
      </div>
      {/* بطاقات المراحل */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {phases.slice(0, 3).map((phase, idx) => {
          // حساب نسبة الإنجاز للمرحلة
          const allTasks = plan
            .filter(w => String(w.phase) === String(phase.id))
            .flatMap(w => (w.tasks || []));
          const doneCount = allTasks.filter(t => t.done).length;
          const progress = allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0;
          return (
            <PhaseCard
              key={phase.id}
              phase={phase}
              color={idx === 0 ? "blue" : idx === 1 ? "emerald" : "violet"}
              progress={progress}
              onClick={() => navigate(`/phase/${phase.id}`)}
              className="cursor-pointer"
            />
          );
        })}
      </div>
      {/* شبكة بينتو */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* ماذا بعد؟ */}
        <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-lg p-6 flex flex-col min-h-[220px]">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
            {t("upcomingTasks", "ماذا بعد؟")}
          </h2>
          <UpcomingTasks />
        </div>
        {/* التقدم الأسبوعي */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-100 via-sky-100 to-emerald-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-3">
            {t("weekProgress", "التقدم الأسبوعي")}
          </h2>
          <WeekProgress />
        </div>
        {/* ملخص الإنجازات */}
        <div className="rounded-2xl bg-gradient-to-br from-violet-100 via-amber-100 to-emerald-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-3">
            {t("achievementsSummary", "ملخص الإنجازات")}
          </h2>
          <AchievementsSummary />
        </div>
      </div>
    </div>
  );
}
