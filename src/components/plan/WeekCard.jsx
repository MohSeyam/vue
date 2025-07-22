// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

function ProgressBar({ percent }) {
  return (
    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 dark:from-emerald-600 dark:to-sky-500 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function WeekCard({ week, onClick, className = "", progress = 0, showDays = false, DaySummaryCard }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (showDays && DaySummaryCard) {
      setExpanded((v) => !v);
    } else {
      onClick?.(week);
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 bg-white/80 dark:bg-zinc-900 shadow hover:-translate-y-1 hover:shadow-xl transition cursor-pointer border-t-4 border-emerald-400 flex flex-col gap-2 min-h-[100px] ${className}`}
      tabIndex={0}
      onClick={handleClick}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
          {week.title?.[lang] || week.title?.ar || week.title?.en}
          <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200 rounded-full px-2 py-0.5 font-bold shadow-sm">
            {t("week", "أسبوع")} {week.week}
          </span>
        </span>
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        {week.objective?.[lang] || week.objective?.ar || week.objective?.en}
      </div>
      <ProgressBar percent={progress} />
      {showDays && DaySummaryCard && expanded && (
        <div className="mt-3 grid grid-cols-1 gap-3">
          {(week.days || []).map((day) => (
            <DaySummaryCard key={day.key} day={day} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}