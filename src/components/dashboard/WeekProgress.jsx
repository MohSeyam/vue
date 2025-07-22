import { useTranslation } from "react-i18next";

export default function WeekProgress() {
  const { t } = useTranslation();
  // Placeholder: دائرة تقدم بنسبة 60%
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="32" fill="none" stroke="#e0e7ef" strokeWidth="8" />
        <circle
          cx="36" cy="36" r="32"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="8"
          strokeDasharray={2 * Math.PI * 32}
          strokeDashoffset={2 * Math.PI * 32 * (1 - 0.6)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
        <text x="36" y="42" textAnchor="middle" fontSize="1.5rem" fill="#2563eb" fontWeight="bold">60%</text>
      </svg>
      <span className="mt-2 text-slate-600 dark:text-slate-300 text-sm font-medium">{t("progress", "نسبة الإنجاز")}</span>
    </div>
  );
}
