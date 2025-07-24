import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBook, FaBookOpen, FaMedal } from "react-icons/fa";
import { Settings, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const location = useLocation();
  const { plan } = useApp();
  console.log('plan:', plan);
  if (!plan || !Array.isArray(plan) || plan.length === 0) {
    return (
      <aside className="fixed top-0 right-0 h-full w-64 bg-light-card dark:bg-dark-card border-l border-light-border dark:border-dark-border shadow-lg flex flex-col py-6 px-4 z-40 items-center justify-center">
        <span className="text-slate-400 text-sm mt-20">جاري تحميل الخطة...</span>
      </aside>
    );
  }
  // استخرج جميع المراحل الفريدة
  const phases = Array.from(new Set(plan.map(w => w.phase)));
  // حدد المرحلة الحالية من المسار
  const match = location.pathname.match(/phase\/(\d+)/);
  const currentPhase = match ? Number(match[1]) : null;
  return <div style={{color:'red'}}>sidebar loaded</div>;
}
