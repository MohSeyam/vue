import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { getPlanData } from "../services/dataService";

function Breadcrumbs({ weekTitle }) {
  const { t } = useTranslation();
  return (
    <nav className="mb-4 text-sm" aria-label="breadcrumb">
      <ol className="flex gap-2 text-slate-500 dark:text-slate-400">
        <li><Link to="/" className="hover:underline">{t("dashboardTitle", "لوحة التحكم")}</Link></li>
        <li>/</li>
        <li className="font-semibold text-blue-700 dark:text-sky-400">{weekTitle}</li>
      </ol>
    </nav>
  );
}

function DaySummaryCard({ day, lang, weekId, color = "stone", onDayClick }) {
  const colorMap = {
    stone: {
      border: "border-stone-200 dark:border-stone-700",
      text: "text-stone-700 dark:text-stone-300"
    }
  };
  return (
    <div
      className={`rounded-xl p-4 bg-white/80 dark:bg-zinc-900 border ${colorMap[color]?.border} shadow flex flex-col justify-center items-center gap-1 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition text-center min-h-[80px]`}
      onClick={onDayClick}
      tabIndex={0}
      role="button"
      aria-label={day.day?.[lang] || day.day?.ar || day.day?.en}
    >
      <span className="font-bold text-base text-slate-800 dark:text-slate-100 drop-shadow-sm">
        {day.day?.[lang] || day.day?.ar || day.day?.en}
      </span>
      <span className={`text-sm font-semibold opacity-90 ${colorMap[color]?.text}` }>
        {day.topic?.[lang] || day.topic?.ar || day.topic?.en}
      </span>
    </div>
  );
}

export default function WeekView() {
  const { t } = useTranslation();
  const { lang } = useApp();
  const { weekId } = useParams();
  const navigate = useNavigate();
  const [week, setWeek] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeek() {
      setLoading(true);
      const planData = await getPlanData();
      const w = planData.find(w => String(w.week) === String(weekId));
      setWeek(w);
      setLoading(false);
    }
    fetchWeek();
  }, [weekId]);

  if (loading) return <div className="text-center text-slate-400 py-12">{t("loading", "جاري التحميل...")}</div>;
  if (!week) return <div className="text-center text-red-500 py-12">{t("weekNotFound", "الأسبوع غير موجود")}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <Breadcrumbs weekTitle={week.title?.[lang] || week.title?.ar || week.title?.en} />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-sky-400 mb-1">
          {week.title?.[lang] || week.title?.ar || week.title?.en}
        </h1>
        <p className="text-base text-slate-700 dark:text-slate-200 opacity-90 font-medium">
          {week.objective?.[lang] || week.objective?.ar || week.objective?.en}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(week.days || []).filter(day => day.key !== "fri").map((day) => (
          <DaySummaryCard
            key={day.key}
            day={day}
            lang={lang}
            weekId={week.week}
            color="stone"
            onDayClick={() => navigate(`/day/${week.week}/${day.key}`)}
          />
        ))}
      </div>
    </div>
  );
}
