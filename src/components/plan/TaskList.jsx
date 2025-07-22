// TaskList.jsx
import { useTranslation } from "react-i18next";
export default function TaskList({ tasks, lang, onToggle, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <div className="mb-2">
      <div className="font-semibold text-xs text-gray-500 mb-1">{t("tasks", "المهام:")}</div>
      <ul className="space-y-1">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center gap-2">
            {/* TODO: دعم التفاعل (تحديد منجز، تحرير، حذف) */}
            <input type="checkbox" className="accent-emerald-500" disabled />
            <span className="text-sm">{task.description?.[lang] || task.description?.ar || task.description?.en}</span>
            {/* أزرار مستقبلية */}
            {/* <button onClick={() => onEdit?.(task)}>✏️</button> */}
            {/* <button onClick={() => onDelete?.(task)}>🗑️</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}