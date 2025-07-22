import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { cn } from "@/lib/utils";

const typeColors = {
  "Blue Team": "border-blue-400 bg-blue-50 dark:bg-blue-900/40",
  "Red Team": "border-rose-400 bg-rose-50 dark:bg-rose-900/40",
  "Soft Skills": "border-amber-400 bg-amber-50 dark:bg-amber-900/40",
  "Practical": "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/40",
  "Default": "border-slate-300 bg-white dark:bg-zinc-900/60"
};
const typeIcons = {
  "Blue Team": <i className="i-lucide-shield-check text-blue-500" />,
  "Red Team": <i className="i-lucide-flame text-rose-500" />,
  "Soft Skills": <i className="i-lucide-user text-amber-500" />,
  "Practical": <i className="i-lucide-cpu text-emerald-500" />,
  "Default": <i className="i-lucide-list text-slate-400" />
};

export default function TaskItem({ task }) {
  const { lang } = useApp();
  const { t } = useTranslation();
  const color = typeColors[task.type] || typeColors["Default"];
  const icon = typeIcons[task.type] || typeIcons["Default"];
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border shadow hover:shadow-lg transition group",
        color
      )}
      tabIndex={0}
      role="listitem"
      aria-label={task.description?.[lang] || task.description?.ar || task.description?.en}
    >
      <span className="text-xl">{icon}</span>
      <input type="checkbox" className="accent-blue-500 w-5 h-5" aria-label={t("markComplete", "تم الإنجاز")} />
      <div className="flex-1">
        <div className="font-semibold text-slate-800 dark:text-slate-100 mb-0.5">{task.description?.[lang] || task.description?.ar || task.description?.en}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400 flex gap-2 items-center">
          <span className="rounded px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-200">{t(task.type, task.type)}</span>
          <span className="ml-2">⏱ {task.duration} {t("min", "دقيقة")}</span>
        </div>
      </div>
    </div>
  );
}