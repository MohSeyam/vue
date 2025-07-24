import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { AppProvider } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CyberPlan from "./pages/CyberPlan";
import Journal from "./pages/Journal";
import PhaseView from "./pages/PhaseView";
import WeekView from "./pages/WeekView";
import DayView from "./pages/DayView";
import { useCyberPlan } from "./hooks/useCyberPlan";
import { useEffect, useState } from "react";
import { getPlanData } from "./services/dataService";
import PomodoroTimer from "./pages/DayView/PomodoroTimer";
import { useApp } from "./context/AppContext";
import Notebook from "./pages/Notebook";
import Achievements from "./pages/Achievements";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function GlobalProgressBar() {
  const { plan } = useCyberPlan();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    async function calc() {
      const planData = await getPlanData();
      const allTasks = planData.flatMap(w => (w.days || []).flatMap(d => d.tasks || []));
      const doneMap = {};
      plan.forEach(w => (w.tasks || []).forEach(t => { if (t.id && t.done) doneMap[t.id] = true; }));
      const doneCount = allTasks.filter(t => doneMap[t.id]).length;
      setProgress(allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0);
    }
    calc();
  }, [plan]);
  return (
    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800">
      <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 dark:from-blue-700 dark:to-emerald-600 transition-all" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toast("بحث سريع (غير مفعل بعد)");
      }
      if (e.key === "n" || e.key === "N") {
        navigate("/notebook");
        toast.success("انتقلت إلى دفتر الملاحظات (N)");
      }
      if (e.key === "j" || e.key === "J") {
        navigate("/journal");
        toast.success("انتقلت إلى المدونة (J)");
      }
      if (e.key === "a" || e.key === "A") {
        navigate("/achievements");
        toast.success("انتقلت إلى الإنجازات (A)");
      }
      if (e.key === "s" || e.key === "S") {
        navigate("/settings");
        toast.success("انتقلت إلى الإعدادات (S)");
      }
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        toast("اختصارات: N=دفتر الملاحظات، J=المدونة، A=الإنجازات، S=الإعدادات، Ctrl+K=بحث");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);
  console.log("App.jsx loaded");
  return (
    <div className="min-h-screen bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text font-tajawal">
      <ThemeProvider>
        <AppProvider>
          <Toaster position="top-center" toastOptions={{
            style: { fontFamily: 'Tajawal, sans-serif', fontSize: 16 },
            duration: 2500,
          }} />
          <GlobalPomodoroOverlay />
          <BrowserRouter>
            <GlobalProgressBar />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/plan" element={<CyberPlan />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/phase/:phaseId" element={<PhaseView />} />
                <Route path="/week/:weekId" element={<WeekView />} />
                <Route path="/day/:weekId/:dayKey" element={<DayView />} />
                <Route path="/notebook" element={<Notebook />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </div>
  );
}

function GlobalPomodoroOverlay() {
  const { globalPomodoro, setGlobalPomodoro } = useApp();
  if (!globalPomodoro || !globalPomodoro.running) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-zinc-900 border border-light-border dark:border-dark-border rounded-2xl shadow-xl p-6 flex flex-col items-center min-w-[260px]">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="font-bold text-base text-light-text dark:text-dark-text">{globalPomodoro.title}</span>
        <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => setGlobalPomodoro(null)} title="إغلاق المؤقت">✕</button>
      </div>
      <PomodoroTimer initialMinutes={globalPomodoro.minutes} />
    </div>
  );
}
