// PhaseCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import Card from "../ui/Card";

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

export default function PhaseCard({ phase, onClick, className = "", progress = 0 }) {
  const { t } = useTranslation();
  const { lang } = useApp();
  return (
    <Card
      className={`cursor-pointer backdrop-blur-md relative overflow-hidden ${className}`}
      tabIndex={0}
      role="button"
      aria-label={phase.name?.[lang] || phase.name || phase.title?.[lang] || phase.title?.ar || phase.title?.en}
      onClick={() => onClick?.(phase)}
    >
      <div className="flex justify-start mb-2 mt-2">
        <span className="text-xs bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-full px-3 py-1 font-bold shadow-sm">
          {t("phase", "مرحلة")} {phase.id}
        </span>
      </div>
      <div className="mb-3">
        <span className="block text-xl md:text-2xl font-extrabold text-light-text dark:text-white drop-shadow-sm">
          {phase.name?.[lang] || phase.name || phase.title?.[lang] || phase.title?.ar || phase.title?.en}
        </span>
      </div>
      <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-2 opacity-90 min-h-[40px]">
        {phase.description?.[lang] || phase.description || ""}
      </div>
      <ProgressBar percent={progress} />
    </Card>
  );
}