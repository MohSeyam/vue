// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

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

export default function WeekCard({ week, onClick, className = "", progress = 0 }) {
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
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-slate-900 dark:text-white text-base">
          {week.title?.[lang] || week.title?.ar || week.title?.en}
        </span>
        <ProgressCircle percent={progress} />
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        {week.objective?.[lang] || week.objective?.ar || week.objective?.en}
      </div>
    </div>
  );
}