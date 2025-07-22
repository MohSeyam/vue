import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { getPlanData } from "../services/dataService";
import DayViewPage from "./DayView/DayViewPage";

function Breadcrumbs({ weekId, dayTitle }) {
  const { t } = useTranslation();
  return (
    <nav className="mb-4 text-sm" aria-label="breadcrumb">
      <ol className="flex gap-2 text-slate-500 dark:text-slate-400">
        <li><Link to="/" className="hover:underline">{t("dashboardTitle", "لوحة التحكم")}</Link></li>
        <li>/</li>
        <li><Link to={`/week/${weekId}`} className="hover:underline">{t("week", "الأسبوع")} {weekId}</Link></li>
        <li>/</li>
        <li className="font-semibold text-blue-700 dark:text-sky-400">{dayTitle}</li>
      </ol>
    </nav>
  );
}

export default function DayView() {
  const { t } = useTranslation();
  const { lang } = useApp();
  const { weekId, dayKey } = useParams();
  const [day, setDay] = useState(null);
  const [phaseId, setPhaseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDay() {
      setLoading(true);
      const planData = await getPlanData();
      const week = planData.find(w => String(w.week) === String(weekId));
      setPhaseId(week?.phase || null);
      const d = week?.days?.find(d => d.key === dayKey);
      setDay(d);
      setLoading(false);
    }
    fetchDay();
  }, [weekId, dayKey]);

  if (loading) return <div className="text-center text-slate-400 py-12">{t("loading", "جاري التحميل...")}</div>;
  if (!day) return <div className="text-center text-red-500 py-12">{t("dayNotFound", "اليوم غير موجود")}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <Breadcrumbs weekId={weekId} dayTitle={day.day?.[lang] || day.day?.ar || day.day?.en} />
      <DayViewPage day={day} weekId={weekId} phaseId={phaseId} />
    </div>
  );
}
