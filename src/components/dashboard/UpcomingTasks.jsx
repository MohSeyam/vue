import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCyberPlan } from "../../hooks/useCyberPlan";
import { getPlanData } from "../../services/dataService";

function getTodayKey() {
  // احصل على اليوم الحالي (السبت = 0)
  const days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];
  const jsDay = new Date().getDay();
  // في بعض البيئات السبت=6، الأحد=0
  return days[jsDay === 0 ? 1 : jsDay === 6 ? 0 : jsDay];
}

export default function UpcomingTasks() {
  const { t } = useTranslation();
  const { lang } = useApp();
  const navigate = useNavigate();
  const { plan, loading } = useCyberPlan();
  const [tasks, setTasks] = useState([]);
  const [weekId, setWeekId] = useState(null);
  const todayKey = getTodayKey();

  useEffect(() => {
    async function fetchTasks() {
      const planData = await getPlanData();
      // ابحث عن الأسبوع الحالي (أول أسبوع لم ينتهِ بعد)
      let found = null;
      for (const week of planData) {
        for (const day of week.days) {
          // إذا وجدنا يوم اليوم الحالي
          if (day.key === todayKey) {
            found = { week, day };
            break;
          }
        }
        if (found) break;
      }
      if (!found) return setTasks([]);
      setWeekId(found.week.week);
      // حالة الإنجاز من db.plan (id المهمة)
      const doneMap = {};
      plan.forEach(w => {
        (w.tasks || []).forEach(t => {
          if (t.id && t.done) doneMap[t.id] = true;
        });
      });
      // استخرج المهام غير المنجزة فقط
      const unDone = (found.day.tasks || []).filter(task => !doneMap[task.id]);
      setTasks(unDone);
    }
    fetchTasks();
  }, [plan]);

  if (loading) return <div className="text-center text-slate-400">{t("loading", "جاري التحميل...")}</div>;

  if (!tasks.length) {
    return (
      <div className="flex-1 flex flex-col gap-2 justify-center items-center text-center min-h-[100px]">
        <span className="text-slate-400 dark:text-slate-500 text-sm">
          {t("noTasksToday", "لا توجد مهام غير منجزة لليوم الحالي.")}
        </span>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map(task => (
        <li
          key={task.id}
          className="rounded-lg px-3 py-2 bg-blue-50 dark:bg-sky-900/30 text-slate-800 dark:text-slate-100 shadow hover:bg-blue-100 dark:hover:bg-sky-800 cursor-pointer transition"
          onClick={() => navigate(`/day/${weekId}/${todayKey}`)}
        >
          <span className="font-medium">{task.description?.[lang] || task.description?.ar || task.description?.en || ""}</span>
        </li>
      ))}
    </ul>
  );
}