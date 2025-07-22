// Dashboard.jsx

import { getPhases, getWeeks, getAllDays, getAllTasks } from "../services/dataService";
import PhaseCard from "../components/plan/PhaseCard";

export default function Dashboard() {
  const phases = getPhases();
  const weeks = getWeeks();
  const days = getAllDays();
  const tasks = getAllTasks();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">لوحة القيادة</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatBox label="المراحل" value={phases.length} color="bg-cyan-500" />
        <StatBox label="الأسابيع" value={weeks.length} color="bg-violet-500" />
        <StatBox label="الأيام" value={days.length} color="bg-amber-500" />
        <StatBox label="المهام" value={tasks.length} color="bg-emerald-500" />
      </div>
      <h2 className="text-xl font-semibold mb-4">مراحل خطة الأمن السيبراني</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {phases.map(phase => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className={`rounded-xl p-4 text-center text-white shadow ${color}`}>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}
