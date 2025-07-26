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
import Notebook from "./pages/Notebook";
import Achievements from "./pages/Achievements";
import { Toaster } from "react-hot-toast";
import PlanPhases from "./pages/PlanPhases";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <div className="min-h-screen bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text font-tajawal">
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
            <Toaster
              position="top-center"
              toastOptions={{
                style: { fontFamily: 'Tajawal, sans-serif', fontSize: 16 },
                duration: 2500,
              }}
            />
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
                <Route path="/phases" element={<PlanPhases />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </div>
  );
}
