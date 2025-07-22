// WeekCard.jsx
export default function WeekCard({ week, onDetails }) {
  return (
    <div className="rounded-lg border p-4 bg-white dark:bg-zinc-900 shadow hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold text-violet-600">{week.title?.ar || week.title?.en}</span>
        <span className="text-xs bg-violet-100 text-violet-700 rounded px-2 py-0.5">أسبوع {week.week}</span>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">{week.objective?.ar || week.objective?.en}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">عدد الأيام: {week.days?.length || 0}</span>
        {/* زر التفاصيل أو أي إجراء آخر */}
        <button onClick={() => onDetails?.(week)} className="text-xs text-violet-700 hover:underline">تفاصيل</button>
      </div>
      {/* TODO: يمكن إضافة خصائص أو مكونات أخرى هنا */}
    </div>
  );
}