// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import Card from "../ui/Card";

const shadowMap = {
  blue: "shadow-[0_4px_32px_0_rgba(59,130,246,0.25)]", // blue-500
  emerald: "shadow-[0_4px_32px_0_rgba(16,185,129,0.25)]", // emerald-500
  violet: "shadow-[0_4px_32px_0_rgba(139,92,246,0.25)]", // violet-500
  amber: "shadow-[0_4px_32px_0_rgba(245,158,11,0.25)]", // amber-500
};

const accentMap = {
  blue: "#40C4FF",
  emerald: "#69F0AE",
  violet: "#AE81FF",
  amber: "#FFD700",
};

export default function WeekCard({ week, className = "", color = "blue", DaySummaryCard, dayColor, expanded, onExpand, navigate }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  const accent = accentMap[color] || accentMap.blue;
  const handleClick = () => onExpand?.(week.week);
  return (
    <Card
      className={`cursor-pointer flex flex-col gap-2 min-h-[120px] relative overflow-hidden ${className}`}
      tabIndex={0}
      onClick={handleClick}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      {/* شريط علوي بلون الأسبوع */}
      <div style={{background: accent, height: 6, width: '100%', position: 'absolute', top: 0, left: 0, borderTopLeftRadius: 8, borderTopRightRadius: 8}} />
      {/* شارة رقم الأسبوع */}
      <div className="flex justify-start mb-2 mt-2">
        <span className="text-xs bg-light-background dark:bg-blue-900 text-light-text dark:text-blue-200 rounded-full px-3 py-1 font-bold shadow-sm">
          {t("week", "أسبوع")} {week.week}
        </span>
      </div>
      {/* اسم الأسبوع */}
      <div className="mb-3">
        <span className="block text-xl md:text-2xl font-extrabold text-light-text dark:text-white drop-shadow-sm">
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
              navigate={navigate}
              onDayClick={() => {
                onExpand?.(null);
                navigate(`/day/${week.week}/${day.key}`);
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
}