// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

function ProgressBar({ percent, color }) {
  const colorClass = color === "blue"
    ? "from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-400"
    : color === "emerald"
    ? "from-emerald-400 to-emerald-600 dark:from-emerald-600 dark:to-emerald-400"
    : color === "violet"
    ? "from-violet-400 to-violet-600 dark:from-violet-600 dark:to-violet-400"
    : "from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-400";
  return (
    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
      <div
        className={`h-full bg-gradient-to-r ${colorClass} transition-all`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

const colorMap = {
  blue: "border-blue-400",
  emerald: "border-emerald-400",
  violet: "border-violet-400",
  amber: "border-amber-400"
};

export default function WeekCard({ week, onClick, className = "", progress = 0, color = "blue", DaySummaryCard, dayColor }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded((v) => !v);

  return (
    <div className={`rounded-2xl p-4 bg-white/80 dark:bg-zinc-900 border-2 ${colorMap[color] || colorMap.blue} shadow hover:-translate-y-1 hover:shadow-xl transition cursor-pointer flex flex-col gap-2 min-h-[100px] ${className}`}
      tabIndex={0}
      onClick={handleClick}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      {/* رقم الأسبوع في الأعلى */}
      <div className="flex justify-center mb-2">
        <span className="inline-block rounded-full bg-white dark:bg-zinc-900 px-3 py-1 text-xs font-bold shadow-sm border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-200">
          {t("week", "أسبوع")} {week.week}
        </span>
      </div>
      {/* اسم الأسبوع */}
      <div className="flex items-center justify-between mb-1">
        <span className={`font-extrabold text-xl md:text-2xl ${color === "blue" ? "text-blue-700 dark:text-blue-400" : color === "emerald" ? "text-emerald-700 dark:text-emerald-400" : color === "violet" ? "text-violet-700 dark:text-violet-400" : "text-slate-800 dark:text-slate-100"}`}>
          {week.title?.[lang] || week.title?.ar || week.title?.en}
        </span>
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        {week.objective?.[lang] || week.objective?.ar || week.objective?.en}
      </div>
      <ProgressBar percent={progress} color={color} />
      {expanded && DaySummaryCard && (
        <div className="mt-3 grid grid-cols-1 gap-3">
          {(week.days || []).filter(day => day.key !== "fri").map((day) => (
            <DaySummaryCard key={day.key} day={day} lang={lang} weekId={week.week} color={dayColor} navigate={onClick} />
          ))}
        </div>
      )}
    </div>
  );
}