import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBook, FaBookOpen, FaMedal } from "react-icons/fa";
import { Settings, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const location = useLocation();
  const { plan } = useApp();
  // استخرج جميع المراحل الفريدة
  const phases = Array.from(new Set(plan.map(w => w.phase)));
  // حدد المرحلة الحالية من المسار
  const match = location.pathname.match(/phase\/(\d+)/);
  const currentPhase = match ? Number(match[1]) : null;
  return (
    <aside className="fixed top-0 right-0 h-full w-64 bg-light-card dark:bg-dark-card border-l border-light-border dark:border-dark-border shadow-lg flex flex-col py-6 px-4 z-40">
      <div className="flex items-center gap-2 mb-8">
        <ShieldCheck className="w-7 h-7 text-yellow-500 dark:text-yellow-400" />
        <span className="font-bold text-lg">سايبر بلان</span>
      </div>
      <nav className="flex flex-col gap-2 mb-8">
        <NavLink to="/notebook" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${isActive ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" : "hover:bg-yellow-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200"}`}><FaBook className="w-5 h-5" /> دفتر الملاحظات</NavLink>
        <NavLink to="/journal" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${isActive ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" : "hover:bg-yellow-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200"}`}><FaBookOpen className="w-5 h-5" /> المدونة</NavLink>
        <NavLink to="/achievements" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${isActive ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" : "hover:bg-yellow-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200"}`}><FaMedal className="w-5 h-5" /> الإنجازات</NavLink>
        <NavLink to="/settings" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${isActive ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" : "hover:bg-yellow-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200"}`}><Settings className="w-5 h-5" /> الإعدادات</NavLink>
      </nav>
      <div className="mb-2 text-xs text-slate-500 font-bold">مراحل الخطة</div>
      <ol className="flex flex-col gap-1">
        {phases.map(phase => (
          <NavLink key={phase} to={`/phase/${phase}`} className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded transition text-sm font-semibold ${Number(currentPhase) === Number(phase) || isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-r-4 border-blue-500" : "hover:bg-blue-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200"}`}>
            <span className="w-6 h-6 flex items-center justify-center font-bold">{phase}</span>
            <span>مرحلة {phase}</span>
          </NavLink>
        ))}
      </ol>
    </aside>
  );
}
