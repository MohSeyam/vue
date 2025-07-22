// PhaseCard.jsx
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

export default function PhaseCard({ phase, selected, onDetails }) {
  const { t, i18n } = useTranslation();
  const { lang } = useApp();
  return (
    <div className={`rounded-lg border p-4 bg-white dark:bg-zinc-900 shadow hover:shadow-lg transition cursor-pointer ${selected ? 'ring-2 ring-cyan-400' : ''}`}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 mb-2">
        {/* TODO: دعم الأيقونة مستقبلاً */}
        <span className="text-lg font-bold text-cyan-600">{phase.name?.[lang] || phase.name || phase.title?.[lang] || phase.title?.ar || phase.title?.en}</span>
        <span className="text-xs bg-cyan-100 text-cyan-700 rounded px-2 py-0.5">{t("phase", "مرحلة")} {phase.id}</span>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">{phase.description?.[lang] || phase.description || ""}</div>
      <button className="text-xs text-cyan-700 hover:underline" onClick={e => {e.stopPropagation(); onDetails?.(phase);}}>{t("details", "تفاصيل")}</button>
      {/* TODO: يمكن إضافة خصائص أو مكونات أخرى هنا */}
    </div>
  );
}