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
  const { plan, progress } = useApp();

  useEffect(() => {
    getPhases().then(setPhases);
  }, []);

  return (
    <div className={`max-w-6xl mx-auto py-8 px-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text font-tajawal ${isRTL ? "rtl" : "ltr"}`}>
      {/* العنوان والرسالة */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-light-accent dark:text-dark-accent mb-2 drop-shadow-sm">
          {t("dashboardTitle", "لوحة التحكم")}
        </h1>
        <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary opacity-90 font-medium">
          {t("welcomeMsg", "مرحبًا بعودتك! استكشف تقدمك وابدأ يومك بخطوة جديدة.")}
        </p>
      </div>
      {/* بطاقات المراحل */}
      {phases.length === 0 ? (
        <div className="text-center text-light-textSecondary dark:text-dark-textSecondary py-12">لا توجد بيانات متاحة</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {phases.slice(0, 3).map((phase, idx) => {
          // حساب نسبة الإنجاز للمرحلة بناءً على progress
          const phaseWeeks = plan.filter(w => String(w.phase) === String(phase.id));
          const allTasks = phaseWeeks.flatMap(w => (w.days || []).flatMap(d => d.tasks || []));
          const doneCount = allTasks.filter(task => progress.find(p => p.taskId === task.id && p.done)).length;
          const percent = allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0;
          return (
            <PhaseCard
              key={phase.id}
              phase={phase}
              color={idx === 0 ? "blue" : idx === 1 ? "emerald" : "violet"}
              progress={percent}
              onClick={() => navigate(`/phase/${phase.id}`)}
              className="cursor-pointer"
            />
          );
        })}
      </div>
      )}
      {/* شبكة بينتو */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* ماذا بعد؟ */}
        <div className="rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-lg p-6 flex flex-col min-h-[220px]">
          <h2 className="font-bold text-lg text-light-text dark:text-dark-text mb-3 flex items-center gap-2">
            {t("upcomingTasks", "ماذا بعد؟")}
          </h2>
          <UpcomingTasks />
        </div>
        {/* التقدم الأسبوعي */}
        <div className="rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-lg p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h2 className="font-bold text-lg text-light-text dark:text-dark-text mb-3">
            {t("weekProgress", "التقدم الأسبوعي")}
          </h2>
          <WeekProgress />
        </div>
        {/* ملخص الإنجازات */}
        <div className="rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-lg p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h2 className="font-bold text-lg text-light-text dark:text-dark-text mb-3">
            {t("achievementsSummary", "ملخص الإنجازات")}
          </h2>
          <AchievementsSummary />
        </div>
      </div>
    </div>
  );
}
