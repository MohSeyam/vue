// PhaseCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

const colorMap = {
  blue: "border-t-4 border-blue-500",
  emerald: "border-t-4 border-emerald-500",
  violet: "border-t-4 border-violet-500",
};

function ProgressBar({ percent }) {
  return (
    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 dark:from-blue-700 dark:to-violet-600 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function PhaseCard({ phase, color = "blue", onClick, className = "", progress = 0 }) {
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
      {/* شارة رقم المرحلة */}
      <div className="flex justify-start mb-2">
        <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full px-3 py-1 font-bold shadow-sm">
          {t("phase", "مرحلة")} {phase.id}
        </span>
      </div>
      {/* اسم المرحلة */}
      <div className="mb-3">
        <span className="block text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white drop-shadow-sm">
          {phase.name?.[lang] || phase.name || phase.title?.[lang] || phase.title?.ar || phase.title?.en}
        </span>
      </div>
      {/* الوصف */}
      <div className="text-sm text-gray-700 dark:text-gray-200 mb-2 opacity-90 min-h-[40px]">
        {phase.description?.[lang] || phase.description || ""}
      </div>
      <ProgressBar percent={progress} />
    </div>
  );
}