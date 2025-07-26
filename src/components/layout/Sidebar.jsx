import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBook, FaBookOpen, FaMedal } from "react-icons/fa";
import { Settings, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const location = useLocation();
  const { plan } = useApp();
  // إذا كانت الخطة undefined أو null أو ليست مصفوفة أو كل عنصر فيها ليس له phase، اعتبرها فارغة
  const isPlanEmpty = !plan || !Array.isArray(plan) || plan.length === 0 || plan.every(w => !w.phase);
  if (isPlanEmpty) {
    return (
      <aside className="fixed top-0 right-0 h-full w-64 bg-light-card dark:bg-dark-card border-l border-light-border dark:border-dark-border shadow-lg flex flex-col py-6 px-4 z-40 items-center justify-center">
        <span className="text-slate-400 text-sm mt-20">جاري تحميل الخطة...</span>
      </aside>
    );
  }
  // استخرج جميع المراحل الفريدة
  const phases = Array.from(new Set(plan.map(w => w.phase)));
  return (
    <aside className="fixed top-0 right-0 h-full w-64 bg-light-card dark:bg-dark-card border-l border-light-border dark:border-dark-border shadow-lg flex flex-col py-6 px-4 z-40">
      <div className="flex flex-col items-center mb-8 relative">
        <ShieldCheck className="w-10 h-10 text-yellow-500 mb-2" />
        <span className="font-bold text-lg">CyberPlan</span>
        {/* زر الإغلاق (يتم وضعه من الخارج في MainLayout، لكن لو أردت زر هنا أضف margin-top مناسب) */}
      </div>
      <nav className="flex-1 w-full flex flex-col gap-2">
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700 dark:text-slate-200'}` } end>
          <FaBook className="w-5 h-5" />
          <span>لوحة التحكم</span>
        </NavLink>
        <NavLink to="/phases" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700 dark:text-slate-200'}` }>
          <FaBookOpen className="w-5 h-5" />
          <span>المراحل</span>
        </NavLink>
        <NavLink to="/notebook" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700 dark:text-slate-200'}` }>
          <FaBook className="w-5 h-5" />
          <span>الملاحظات</span>
        </NavLink>
        <NavLink to="/journal" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700 dark:text-slate-200'}` }>
          <FaBookOpen className="w-5 h-5" />
          <span>المدونة</span>
        </NavLink>
        <NavLink to="/achievements" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700 dark:text-slate-200'}` }>
          <FaMedal className="w-5 h-5" />
          <span>الإنجازات</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700 dark:text-slate-200'}` }>
          <Settings className="w-5 h-5" />
          <span>الإعدادات</span>
        </NavLink>
      </nav>
      <div className="mt-auto text-xs text-slate-400 text-center pt-8">© {new Date().getFullYear()} CyberPlan</div>
    </aside>
  );
}
