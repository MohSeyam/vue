import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { AppProvider } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CyberPlan from "./pages/CyberPlan";

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/plan" element={<CyberPlan />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
