import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import BottomNavigation from "../components/layout/BottomNavigation";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-background">
      {/* زر إظهار/إخفاء السايدبار */}
      <button
        className="hidden md:block fixed top-4 right-4 z-50 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border shadow p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label={sidebarOpen ? "إخفاء القائمة الجانبية" : "إظهار القائمة الجانبية"}
      >
        <Menu className="w-6 h-6" />
      </button>
      {sidebarOpen && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 pb-20 md:pb-4">
          <Outlet />
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
}
