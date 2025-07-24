// WeekCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import Card from "../ui/Card";

export default function WeekCard({ week, className = "", DaySummaryCard, dayColor, expanded, onExpand, navigate }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  const handleClick = () => onExpand?.(week.week);
  return (
    <Card
      className={`cursor-pointer flex flex-col gap-2 min-h-[120px] relative overflow-hidden ${className}`}
      tabIndex={0}
      onClick={handleClick}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      {/* شارة رقم الأسبوع */}
      <div className="flex justify-start mb-2 mt-2">
        <span className="text-xs bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-full px-3 py-1 font-bold shadow-sm">
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