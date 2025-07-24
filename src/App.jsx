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
import Sidebar from "./components/layout/Sidebar";

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
  return <div style={{color:'blue'}}>app loaded</div>;
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
