import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import BottomNavigation from "../components/layout/BottomNavigation";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
}
