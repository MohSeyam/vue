// Dashboard.jsx

import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import { getPhases, getWeeks, getAllDays, getAllTasks } from "../services/dataService";
import PhaseCard from "../components/plan/PhaseCard";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { lang } = useApp();
  const [phases, setPhases] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [days, setDays] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getPhases(),
      getWeeks(),
      getAllDays(),
      getAllTasks()
    ]).then(([ph, wk, dy, tk]) => {
      setPhases(ph);
      setWeeks(wk);
      setDays(dy);
      setTasks(tk);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6 text-center">{t("dashboardTitle", "لوحة القيادة")}</h1>
      {loading && <div className="text-center text-gray-400">{t("loading", "جاري التحميل...")}</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatBox label={t("phases", "المراحل")} value={phases.length} color="bg-cyan-500" />
        <StatBox label={t("weeks", "الأسابيع")} value={weeks.length} color="bg-violet-500" />
        <StatBox label={t("days", "الأيام")} value={days.length} color="bg-amber-500" />
        <StatBox label={t("tasks", "المهام")} value={tasks.length} color="bg-emerald-500" />
      </div>
      <h2 className="text-xl font-semibold mb-4">{t("planPhases", "مراحل خطة الأمن السيبراني")}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {phases.map(phase => (
          <PhaseCard key={phase.id} phase={{...phase, name: phase.name}} />
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
