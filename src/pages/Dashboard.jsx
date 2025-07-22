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
  // color: cyan, violet, amber, emerald
  const colorMap = {
    "bg-cyan-500": "from-cyan-400 to-cyan-600 border-cyan-200 text-cyan-700",
    "bg-violet-500": "from-violet-400 to-violet-600 border-violet-200 text-violet-700",
    "bg-amber-500": "from-amber-400 to-amber-500 border-amber-200 text-amber-700",
    "bg-emerald-500": "from-emerald-400 to-emerald-600 border-emerald-200 text-emerald-700"
  };
  const gradient = colorMap[color] || "from-gray-200 to-gray-400 border-gray-200 text-gray-700";
  return (
    <div className={`rounded-2xl p-6 text-center shadow-lg bg-gradient-to-br ${gradient} border backdrop-blur-sm`}
      style={{ minWidth: 120 }}>
      <div className={`text-3xl font-extrabold mb-1 drop-shadow-sm`}>{value}</div>
      <div className="text-base font-semibold opacity-90">{label}</div>
    </div>
  );
}
