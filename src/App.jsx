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
  console.log("App.jsx loaded");
  return (
    <>
      <ThemeProvider>
        <AppProvider>
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
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
