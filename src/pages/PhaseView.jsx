import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { getPlanData } from "../services/dataService";

function Breadcrumbs({ phaseTitle }) {
  const { t } = useTranslation();
  return (
    <nav className="mb-4 text-sm" aria-label="breadcrumb">
      <ol className="flex gap-2 text-slate-500 dark:text-slate-400">
        <li><Link to="/dashboard" className="hover:underline">{t("dashboardTitle", "لوحة التحكم")}</Link></li>
        <li>/</li>
        <li className="font-semibold text-blue-700 dark:text-sky-400">{phaseTitle}</li>
      </ol>
    </nav>
  );
}

function WeekCard({ week, lang, onClick }) {
  return (
    <div
      className="rounded-2xl p-4 bg-white/80 dark:bg-zinc-900 shadow hover:-translate-y-1 hover:shadow-xl transition cursor-pointer border-t-4 border-emerald-400 flex flex-col gap-2 min-h-[100px]"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={week.title?.[lang] || week.title?.ar || week.title?.en}
    >
      <div className="font-bold text-slate-900 dark:text-white text-base mb-1">
        {week.title?.[lang] || week.title?.ar || week.title?.en}
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        {week.objective?.[lang] || week.objective?.ar || week.objective?.en}
      </div>
      <div className="flex gap-2 mt-auto text-xs">
        <span className="text-blue-600 dark:text-sky-400">{week.days?.length || 0} أيام</span>
      </div>
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
    <div className="max-w-5xl mx-auto py-8 px-2">
      <Breadcrumbs phaseTitle={phase.name?.[lang] || phase.name?.ar || phase.name?.en || phase.name} />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-1">
          {phase.name?.[lang] || phase.name?.ar || phase.name?.en || phase.name}
        </h1>
        {phase.description && (
          <p className="text-base text-slate-700 dark:text-slate-200 opacity-90 font-medium">
            {phase.description?.[lang] || phase.description?.ar || phase.description?.en || phase.description}
          </p>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeks.map(week => (
          <WeekCard
            key={week.week}
            week={week}
            lang={lang}
            onClick={() => navigate(`/week/${week.week}`)}
          />
        ))}
      </div>
    </div>
  );
}