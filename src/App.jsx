import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { AppProvider } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CyberPlan from "./pages/CyberPlan";
import Journal from "./pages/Journal";

export default function App() {
  console.log("App.jsx loaded");
  return (
    <>
      <div className="bg-red-500 text-white p-8 text-2xl text-center">اختبار Tailwind</div>
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/plan" element={<CyberPlan />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
