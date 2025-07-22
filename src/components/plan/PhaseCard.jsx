// PhaseCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

export default function PhaseCard({ phase, selected, onDetails }) {
  const { t, i18n } = useTranslation();
  const { lang } = useApp();
  return (
    <div className={`rounded-2xl border p-6 bg-white/80 dark:bg-zinc-900 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 cursor-pointer ${selected ? 'ring-4 ring-cyan-300' : ''} backdrop-blur-md`}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl font-bold text-cyan-700 drop-shadow-sm">{phase.name?.[lang] || phase.name || phase.title?.[lang] || phase.title?.ar || phase.title?.en}</span>
        <span className="text-xs bg-cyan-200 text-cyan-900 rounded px-2 py-0.5">{t("phase", "مرحلة")} {phase.id}</span>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-200 mb-2 opacity-90">{phase.description?.[lang] || phase.description || ""}</div>
      <button className="text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 rounded-full px-4 py-1 shadow transition" onClick={e => {e.stopPropagation(); onDetails?.(phase);}}>{t("details", "تفاصيل")}</button>
    </div>
  );
}