import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { getPlanData } from "../services/dataService";
import WeekCard from "../components/plan/WeekCard";
import { useCyberPlan } from "../hooks/useCyberPlan";

function Breadcrumbs({ phaseTitle }) {
  const { t } = useTranslation();
  return (
    <nav className="mb-4 text-sm" aria-label="breadcrumb">
      <ol className="flex gap-2 text-slate-500 dark:text-slate-400">
        <li><Link to="/" className="hover:underline">{t("dashboardTitle", "لوحة التحكم")}</Link></li>
        <li>/</li>
        <li className="font-semibold text-blue-700 dark:text-sky-400">{phaseTitle}</li>
      </ol>
    </nav>
  );
}

function DaySummaryCard({ day, lang, weekId, onDayClick, color = "amber" }) {
  const colorMap = {
    amber: {
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-300"
    },
    blue: {
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-300"
    },
    emerald: {
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-300"
    },
    violet: {
      border: "border-violet-200 dark:border-violet-800",
      text: "text-violet-700 dark:text-violet-300"
    },
    pink: {
      border: "border-pink-200 dark:border-pink-800",
      text: "text-pink-700 dark:text-pink-300"
    },
    stone: {
      border: "border-stone-200 dark:border-stone-700",
      text: "text-stone-700 dark:text-stone-300"
    }
  };
  return (
    <div
      className={`rounded-xl p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow flex flex-col justify-center items-center gap-1 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition text-center min-h-[80px]`}
      onClick={onDayClick}
      tabIndex={0}
      role="button"
      aria-label={day.day?.[lang] || day.day?.ar || day.day?.en}
    >
      <span className="font-bold text-base text-slate-800 dark:text-slate-100 drop-shadow-sm">
        {day.day?.[lang] || day.day?.ar || day.day?.en}
      </span>
      <span className={`text-sm font-semibold opacity-90 ${colorMap[color]?.text || colorMap.amber.text}` }>
        {day.topic?.[lang] || day.topic?.ar || day.topic?.en}
      </span>
    </div>
  );
}

export default function PhaseView() {
  const { t } = useTranslation();
  const { lang } = useApp();
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { plan } = useCyberPlan();
  const [expandedWeek, setExpandedWeek] = useState(null);

  useEffect(() => {
    async function fetchPhase() {
      setLoading(true);
      const planData = await getPlanData();
      // استخرج جميع الأسابيع التابعة للمرحلة
      const phaseWeeks = planData.filter(w => String(w.phase) === String(phaseId));
      setWeeks(phaseWeeks);
      // بيانات المرحلة (من أول أسبوع)
      if (phaseWeeks.length > 0) {
        setPhase({
          id: phaseWeeks[0].phase,
          name: phaseWeeks[0].phaseTitle || phaseWeeks[0].title,
          description: phaseWeeks[0].phaseDescription || ""
        });
      }
      setLoading(false);
    }
    fetchPhase();
  }, [phaseId]);

  if (loading) return <div className="text-center text-slate-400 py-12">{t("loading", "جاري التحميل...")}</div>;
  if (!phase) return <div className="text-center text-red-500 py-12">{t("phaseNotFound", "المرحلة غير موجودة")}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 bg-light-background dark:bg-dark-background">
      <Breadcrumbs phaseTitle={phase.name?.[lang] || phase.name?.ar || phase.name?.en || phase.name} />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
          {phase.name?.[lang] || phase.name?.ar || phase.name?.en || phase.name}
        </h1>
        {phase.description && (
          <p className="text-base text-slate-700 dark:text-slate-200 opacity-90 font-medium">
            {phase.description?.[lang] || phase.description?.ar || phase.description?.en || phase.description}
          </p>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeks.map((week, idx) => {
          // حساب نسبة الإنجاز
          const allTasks = (week.days || []).flatMap(day => day.tasks || []);
          const doneMap = {};
          plan.forEach(w => {
            (w.tasks || []).forEach(t => { if (t.id && t.done) doneMap[t.id] = true; });
          });
          const doneCount = allTasks.filter(task => doneMap[task.id]).length;
          const progress = allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0;
          // لون المرحلة والأسابيع
          let phaseColor = "blue";
          if (phase.id === 2) phaseColor = "emerald";
          if (phase.id === 3) phaseColor = "violet";
          return (
            <WeekCard
              key={week.week}
              week={week}
              lang={lang}
              progress={progress}
              color={phaseColor}
              DaySummaryCard={DaySummaryCard}
              dayColor="stone"
              expanded={expandedWeek === week.week}
              onExpand={w => setExpandedWeek(w === expandedWeek ? null : w)}
              navigate={navigate}
            />
          );
        })}
      </div>
    </div>
  );
}