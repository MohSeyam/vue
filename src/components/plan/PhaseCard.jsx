// PhaseCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

const colorMap = {
  blue: "border-t-4 border-blue-500",
  emerald: "border-t-4 border-emerald-500",
  violet: "border-t-4 border-violet-500",
};

export default function PhaseCard({ phase, color = "blue", onClick, className = "" }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  return (
    <div
      className={`group rounded-2xl p-6 bg-white/80 dark:bg-zinc-900 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-200 cursor-pointer backdrop-blur-md ${colorMap[color] || colorMap.blue} ${className}`}
      tabIndex={0}
      onClick={() => onClick?.(phase)}
      role="button"
      aria-label={phase.name?.[lang] || phase.name || phase.title?.[lang] || phase.title?.ar || phase.title?.en}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
          {phase.name?.[lang] || phase.name || phase.title?.[lang] || phase.title?.ar || phase.title?.en}
        </span>
        <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded px-2 py-0.5">
          {t("phase", "مرحلة")} {phase.id}
        </span>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-200 mb-2 opacity-90 min-h-[40px]">
        {phase.description?.[lang] || phase.description || ""}
      </div>
    </div>
  );
}