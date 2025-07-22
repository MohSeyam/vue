import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { getPlanData } from "../services/dataService";

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

function TaskList({ tasks, lang }) {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task, idx) => (
        <div key={task.id || idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 shadow hover:shadow-lg transition">
          <input type="checkbox" className="accent-blue-500 w-5 h-5" />
          <span className="flex-1 text-slate-800 dark:text-slate-100 font-medium">{task.description?.[lang] || task.description?.ar || task.description?.en}</span>
        </div>
      ))}
    </div>
  );
}

function ResourceList({ resources }) {
  return (
    <div className="mt-6">
      <details className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-zinc-900 shadow">
        <summary className="cursor-pointer px-4 py-2 font-bold text-blue-700 dark:text-sky-400 select-none">المراجع والموارد المقترحة</summary>
        <ul className="p-4 flex flex-col gap-2">
          {resources.map((res, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <i className={`i-lucide-${res.type === "video" ? "youtube" : res.type === "article" ? "file-text" : "link"} w-4 h-4 text-blue-500`} />
              <a href={res.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-sky-400">{res.title}</a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function PomodoroTimer() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-slate-800 shadow p-4 mb-6 flex flex-col items-center">
      <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400 mb-2">مؤقت بومودورو</span>
      <span className="text-3xl font-extrabold text-blue-700 dark:text-sky-400">25:00</span>
      <button className="mt-3 px-4 py-1 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">ابدأ</button>
    </div>
  );
}

function JournalEditor() {
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 shadow p-4 flex flex-col">
      <span className="font-bold text-lg text-violet-700 dark:text-violet-400 mb-2">التدوين المسائي</span>
      <textarea className="rounded-lg border border-slate-200 dark:border-slate-700 p-2 min-h-[80px] bg-transparent text-slate-800 dark:text-slate-100" placeholder="اكتب إجابتك هنا..." />
      <button className="mt-3 px-4 py-1 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700 transition self-end">حفظ</button>
    </div>
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

export default function DayView() {
  const { t } = useTranslation();
  const { lang } = useApp();
  const { weekId, dayKey } = useParams();
  const [day, setDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDay() {
      setLoading(true);
      const planData = await getPlanData();
      const week = planData.find(w => String(w.week) === String(weekId));
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
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-sky-400 mb-1">
          {day.day?.[lang] || day.day?.ar || day.day?.en}
        </h1>
        <p className="text-base text-slate-700 dark:text-slate-200 opacity-90 font-medium">
          {day.topic?.[lang] || day.topic?.ar || day.topic?.en}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* العمود الرئيسي */}
        <div className="md:col-span-2">
          <TaskList tasks={day.tasks || []} lang={lang} />
          <ResourceList resources={day.resources || []} />
        </div>
        {/* العمود الجانبي */}
        <div className="flex flex-col gap-6">
          <PomodoroTimer />
          <JournalEditor />
        </div>
      </div>
    </div>
  );
}
