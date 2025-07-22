// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

export default function WeekCard({ week, onClick, className = "" }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  return (
    <div
      className={`rounded-2xl p-4 bg-white/80 dark:bg-zinc-900 shadow hover:-translate-y-1 hover:shadow-xl transition cursor-pointer border-t-4 border-emerald-400 flex flex-col gap-2 min-h-[100px] ${className}`}
      tabIndex={0}
      onClick={() => onClick?.(week)}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      <div className="font-bold text-slate-900 dark:text-white text-base mb-1">
        {week.title?.[lang] || week.title?.ar || week.title?.en}
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        {week.objective?.[lang] || week.objective?.ar || week.objective?.en}
      </div>
      <div className="flex gap-2 mt-auto text-xs">
        <span className="text-blue-600 dark:text-sky-400">{week.days?.length || 0} أيام</span>
      </div>
    </div>
  );
}