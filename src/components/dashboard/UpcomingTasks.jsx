import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCyberPlan } from "../../hooks/useCyberPlan";
import { getPlanData } from "../../services/dataService";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

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
      let found = null;
      for (const week of planData) {
        for (const day of week.days) {
          if (day.key === todayKey) {
            found = { week, day };
            break;
          }
        }
        if (found) break;
      }
      if (!found) return setTasks([]);
      setWeekId(found.week.week);
      const doneMap = {};
      plan.forEach(w => {
        (w.tasks || []).forEach(t => {
          if (t.id && t.done) doneMap[t.id] = true;
        });
      });
      let unDone = (found.day.tasks || []).filter(task => !doneMap[task.id]);
      // ترتيب حسب localStorage إذا وجد
      const order = JSON.parse(localStorage.getItem("upcomingTasksOrder") || "[]");
      if (order.length) {
        unDone = unDone.slice().sort((a, b) => (order.indexOf(a.id) === -1 ? 9999 : order.indexOf(a.id)) - (order.indexOf(b.id) === -1 ? 9999 : order.indexOf(b.id)));
      }
      setTasks(unDone);
    }
    fetchTasks();
  }, [plan]);

  // عند تغيير ترتيب السحب
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    setTasks(items);
    // احفظ الترتيب في localStorage
    localStorage.setItem("upcomingTasksOrder", JSON.stringify(items.map(t => t.id)));
    toast.success("تم حفظ ترتيب المهام لليوم!");
  };

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="upcoming-tasks-droppable" direction="vertical">
        {(provided) => (
          <ul className="flex flex-col gap-2" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, i) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={i}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`rounded-lg px-3 py-2 bg-blue-50 dark:bg-sky-900/30 text-slate-800 dark:text-slate-100 shadow hover:bg-blue-100 dark:hover:bg-sky-800 cursor-grab transition ${snapshot.isDragging ? "ring-2 ring-light-accent dark:ring-dark-accent scale-105" : ""}`}
                    onClick={() => navigate(`/day/${weekId}/${todayKey}`)}
                  >
                    <span className="font-medium">{task.description?.[lang] || task.description?.ar || task.description?.en || ""}</span>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}