import { useTranslation } from "react-i18next";

export default function AchievementsSummary() {
  const { t } = useTranslation();
  // Placeholder: أرقام ثابتة
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <div className="flex gap-6">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">42</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t("learningHours", "إجمالي ساعات التعلم")}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-violet-600 dark:text-violet-400">17</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t("notesCount", "عدد الملاحظات المكتوبة")}</div>
        </div>
      </div>
    </div>
  );
}
