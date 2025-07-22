// DayCard.jsx
import TaskList from "./TaskList";
import ResourceList from "./ResourceList";

export default function DayCard({ day, selected, onJournal }) {
  return (
    <div className={`rounded-lg border p-4 bg-white dark:bg-zinc-900 shadow mb-4 ${selected ? 'ring-2 ring-amber-400' : ''}`}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold text-amber-600">{day.day?.ar || day.day?.en}</span>
        <span className="text-xs bg-amber-100 text-amber-700 rounded px-2 py-0.5">{day.topic?.ar || day.topic?.en}</span>
      </div>
      {/* قائمة المهام */}
      <TaskList tasks={day.tasks || []} />
      {/* قائمة الموارد */}
      <ResourceList resources={day.resources || []} />
      {/* زر التدوين */}
      <button onClick={e => {e.stopPropagation(); onJournal?.(day);}} className="mt-2 text-xs text-amber-700 hover:underline">تدوين اليوم</button>
      {/* TODO: يمكن إضافة خصائص أو مكونات أخرى هنا */}
    </div>
  );
}