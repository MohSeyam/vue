// DayCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import TaskList from "./TaskList";
import ResourceList from "./ResourceList";
import Card from "../ui/Card";

const accentMap = {
  blue: "#40C4FF",
  emerald: "#69F0AE",
  violet: "#AE81FF",
  amber: "#FFD700",
};
export default function DayCard({ day, selected, onJournal, color = "blue" }) {
  const { t, i18n } = useTranslation();
  const { lang } = useApp();
  const accent = accentMap[color] || accentMap.blue;
  return (
    <Card className={`${selected ? 'ring-2 ring-light-accent dark:ring-dark-accent' : ''} mb-4 relative overflow-hidden`} tabIndex={0}>
      {/* شريط علوي بلون اليوم */}
      <div style={{background: accent, height: 6, width: '100%', position: 'absolute', top: 0, left: 0, borderTopLeftRadius: 8, borderTopRightRadius: 8}} />
      <div className="flex items-center gap-2 mb-2 mt-2">
        <span className="text-lg font-bold text-light-accent dark:text-dark-accent">{day.day?.[lang] || day.day?.ar || day.day?.en}</span>
        <span className="text-xs bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded px-2 py-0.5">{day.topic?.[lang] || day.topic?.ar || day.topic?.en}</span>
      </div>
      {/* قائمة المهام */}
      <TaskList tasks={day.tasks || []} lang={lang} />
      {/* قائمة الموارد */}
      <ResourceList resources={day.resources || []} lang={lang} />
      {/* زر التدوين */}
      <button onClick={e => {e.stopPropagation(); onJournal?.(day);}} className="mt-2 text-xs text-light-accent dark:text-dark-accent hover:underline">{t("journalToday", "تدوين اليوم")}</button>
      {/* TODO: يمكن إضافة خصائص أو مكونات أخرى هنا */}
    </Card>
  );
}