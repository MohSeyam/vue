import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
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

export default function App() {
  return (
    <div className="min-h-screen bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text font-tajawal">
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
            <Sidebar />
            <Toaster
              position="top-center"
              toastOptions={{
                style: { fontFamily: 'Tajawal, sans-serif', fontSize: 16 },
                duration: 2500,
              }}
            />
            <div className="pr-0 md:pr-64 transition-all">
              <Routes>
                {/* Routes with the MainLayout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/plan" element={<CyberPlan />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/phase/:phaseId" element={<PhaseView />} />
                  <Route path="/week/:weekId" element={<WeekView />} />
                  <Route path="/day/:weekId/:dayKey" element={<DayView />} />
                  <Route path="/notebook" element={<Notebook />} />
                </Route>

                {/* Routes without the MainLayout */}
                <Route path="/achievements" element={<Achievements />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </div>
  );
}
