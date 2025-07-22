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

function ProgressCircle({ percent }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="none" stroke="#e0e7ef" strokeWidth="4" />
      <circle
        cx="16" cy="16" r="14"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="4"
        strokeDasharray={2 * Math.PI * 14}
        strokeDashoffset={2 * Math.PI * 14 * (1 - percent / 100)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s' }}
      />
      <text x="16" y="21" textAnchor="middle" fontSize="0.8rem" fill="#2563eb" fontWeight="bold">{percent}%</text>
    </svg>
  );
}

function DaySummaryCard({ day, notesCount, resourcesCount, progress, onClick, lang }) {
  return (
    <div
      className="rounded-2xl p-4 bg-white/80 dark:bg-zinc-900 shadow hover:-translate-y-1 hover:shadow-xl transition cursor-pointer border-t-4 border-violet-400 flex flex-col gap-2 min-h-[120px]"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={day.day?.[lang] || day.day?.ar || day.day?.en}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-bold text-slate-900 dark:text-white text-base">
          {day.day?.[lang] || day.day?.ar || day.day?.en}
        </span>
        <ProgressCircle percent={progress} />
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        {day.topic?.[lang] || day.topic?.ar || day.topic?.en}
      </div>
      <div className="flex gap-3 mt-auto">
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs"><i className="i-lucide-file-text w-4 h-4" />{notesCount}</span>
        <span className="flex items-center gap-1 text-blue-600 dark:text-sky-400 text-xs"><i className="i-lucide-link w-4 h-4" />{resourcesCount}</span>
      </div>
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
        <h1 className="text-2xl md:text-3xl font-extrabold text-violet-700 dark:text-violet-400 mb-1">
          {week.title?.[lang] || week.title?.ar || week.title?.en}
        </h1>
        <p className="text-base text-slate-700 dark:text-slate-200 opacity-90 font-medium">
          {week.objective?.[lang] || week.objective?.ar || week.objective?.en}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(week.days || []).map((day, idx) => (
          <DaySummaryCard
            key={day.key}
            day={day}
            notesCount={0} // TODO: اربط بعدد الملاحظات الفعلي
            resourcesCount={(day.resources || []).length}
            progress={0} // TODO: اربط بنسبة إنجاز مهام اليوم
            lang={lang}
            onClick={() => navigate(`/day/${week.week}/${day.key}`)}
          />
        ))}
      </div>
    </div>
  );
}
