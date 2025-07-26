// BottomNavigation.jsx
// شريط التنقل السفلي

import { NavLink } from "react-router-dom";
import { FaBook, FaBookOpen, FaMedal, FaRegStickyNote } from "react-icons/fa";
import { HiOutlineViewBoards } from "react-icons/hi";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-dark-background border-t border-light-border dark:border-dark-border shadow-lg flex justify-around items-center h-16 z-50 md:hidden">
      <NavLink to="/phases" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600"} aria-label="المراحل">
        <HiOutlineViewBoards className="w-6 h-6 mx-auto" />
        <span className="text-xs">المراحل</span>
      </NavLink>
      <NavLink to="/notebook" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600"} aria-label="الملاحظات">
        <FaRegStickyNote className="w-6 h-6 mx-auto" />
        <span className="text-xs">الملاحظات</span>
      </NavLink>
      <NavLink to="/journal" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600"} aria-label="المدونة">
        <FaBookOpen className="w-6 h-6 mx-auto" />
        <span className="text-xs">المدونة</span>
      </NavLink>
      <NavLink to="/achievements" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600"} aria-label="الإنجازات">
        <FaMedal className="w-6 h-6 mx-auto" />
        <span className="text-xs">الإنجازات</span>
      </NavLink>
    </nav>
  );
}
