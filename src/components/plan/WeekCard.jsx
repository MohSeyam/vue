// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const bgMap = {
  blue: "bg-blue-600",
  emerald: "bg-emerald-600",
  violet: "bg-violet-600",
  amber: "bg-amber-600"
};

export default function WeekCard({ week, className = "", color = "blue", DaySummaryCard, dayColor }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded((v) => !v);

  return (
    <div className={`rounded-2xl p-6 ${bgMap[color] || bgMap.blue} shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-200 cursor-pointer flex flex-col gap-2 min-h-[100px] ${className}`}
      tabIndex={0}
      onClick={handleClick}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      {/* رقم الأسبوع في الأعلى */}
      <div className="flex justify-center mb-2">
        <span className="inline-block rounded-full bg-white text-slate-700 px-3 py-1 text-xs font-bold shadow-sm border border-white">
          {t("week", "أسبوع")} {week.week}
        </span>
      </div>
      {/* اسم الأسبوع */}
      <div className="flex items-center justify-center mb-1">
        <span className="font-extrabold text-xl md:text-2xl text-white">
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