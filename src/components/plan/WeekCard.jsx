// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const shadowMap = {
  blue: "shadow-[0_4px_32px_0_rgba(59,130,246,0.25)]", // blue-500
  emerald: "shadow-[0_4px_32px_0_rgba(16,185,129,0.25)]", // emerald-500
  violet: "shadow-[0_4px_32px_0_rgba(139,92,246,0.25)]", // violet-500
  amber: "shadow-[0_4px_32px_0_rgba(245,158,11,0.25)]", // amber-500
};

export default function WeekCard({ week, className = "", color = "blue", DaySummaryCard, dayColor }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded((v) => !v);

  return (
    <div className={`group rounded-2xl p-6 bg-black/90 ${shadowMap[color] || shadowMap.blue} hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-200 cursor-pointer backdrop-blur-md flex flex-col gap-2 min-h-[120px] border border-white/10 ${className}`}
      tabIndex={0}
      onClick={handleClick}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      {/* شارة رقم الأسبوع */}
      <div className="flex justify-start mb-2">
        <span className="text-xs bg-white text-slate-700 rounded-full px-3 py-1 font-bold shadow-sm">
          {t("week", "أسبوع")} {week.week}
        </span>
      </div>
      {/* اسم الأسبوع */}
      <div className="mb-3">
        <span className="block text-xl md:text-2xl font-extrabold text-white drop-shadow-sm">
          {week.title?.[lang] || week.title?.ar || week.title?.en}
        </span>
      </div>
      {expanded && DaySummaryCard && (
        <div className="mt-3 grid grid-cols-1 gap-3">
          {(week.days || []).filter(day => day.key !== "fri").map((day) => (
            <DaySummaryCard
              key={day.key}
              day={day}
              lang={lang}
              weekId={week.week}
              color={dayColor}
              onDayClick={() => setExpanded(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}