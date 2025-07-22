import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

export default function UpcomingTasks() {
  const { t } = useTranslation();
  const { lang } = useApp();
  // Placeholder: قائمة مهام اليوم (فارغة)
  return (
    <div className="flex-1 flex flex-col gap-2 justify-center items-center text-center min-h-[100px]">
      <span className="text-slate-400 dark:text-slate-500 text-sm">
        {t("noTasksToday", "لا توجد مهام غير منجزة لليوم الحالي.")}
      </span>
    </div>
  );
}