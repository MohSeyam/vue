// PhaseCard.jsx
export default function PhaseCard({ phase }) {
  return (
    <div className="rounded-lg border p-4 bg-white dark:bg-zinc-900 shadow hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold text-cyan-600">{phase.name}</span>
        <span className="text-xs bg-cyan-100 text-cyan-700 rounded px-2 py-0.5">مرحلة {phase.id}</span>
      </div>
      {/* يمكن إضافة وصف أو زر تفاصيل لاحقًا */}
    </div>
  );
}