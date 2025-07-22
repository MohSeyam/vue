import { useTranslation } from "react-i18next";
import { useCyberPlan } from "../../hooks/useCyberPlan";
import { useEffect, useState } from "react";
import { getPlanData } from "../../services/dataService";

function getCurrentWeekNumber() {
  // احسب رقم الأسبوع الحالي بناءً على التاريخ (بسيط: الأسبوع الأول هو الحالي)
  // يمكن تطويره لاحقًا ليحسب فعليًا الأسبوع حسب التقدم
  return 1;
}

export default function WeekProgress() {
  const { t } = useTranslation();
  const { plan, loading } = useCyberPlan();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function calcProgress() {
      const weekNum = getCurrentWeekNumber();
      const planData = await getPlanData();
      const week = planData.find(w => w.week === weekNum);
      if (!week) return setProgress(0);
      const allTasks = (week.days || []).flatMap(day => day.tasks || []);
      if (!allTasks.length) return setProgress(0);
      // حالة الإنجاز من db.plan
      const doneMap = {};
      plan.forEach(w => {
        (w.tasks || []).forEach(t => {
          if (t.id && t.done) doneMap[t.id] = true;
        });
      });
      const doneCount = allTasks.filter(task => doneMap[task.id]).length;
      setProgress(Math.round((doneCount / allTasks.length) * 100));
    }
    calcProgress();
  }, [plan]);

  if (loading) return <div className="text-center text-slate-400">{t("loading", "جاري التحميل...")}</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="32" fill="none" stroke="#e0e7ef" strokeWidth="8" />
        <circle
          cx="36" cy="36" r="32"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="8"
          strokeDasharray={2 * Math.PI * 32}
          strokeDashoffset={2 * Math.PI * 32 * (1 - progress / 100)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
        <text x="36" y="42" textAnchor="middle" fontSize="1.5rem" fill="#2563eb" fontWeight="bold">{progress}%</text>
      </svg>
      <span className="mt-2 text-slate-600 dark:text-slate-300 text-sm font-medium">{t("progress", "نسبة الإنجاز")}</span>
    </div>
  );
}
