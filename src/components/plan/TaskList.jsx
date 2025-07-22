// TaskList.jsx
export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  return (
    <div className="mb-2">
      <div className="font-semibold text-xs text-gray-500 mb-1">المهام:</div>
      <ul className="space-y-1">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center gap-2">
            {/* TODO: دعم التفاعل (تحديد منجز، تحرير، حذف) */}
            <input type="checkbox" className="accent-emerald-500" disabled />
            <span className="text-sm">{task.description?.ar || task.description?.en}</span>
            {/* أزرار مستقبلية */}
            {/* <button onClick={() => onEdit?.(task)}>✏️</button> */}
            {/* <button onClick={() => onDelete?.(task)}>🗑️</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}