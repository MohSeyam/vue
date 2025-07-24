// Navbar.jsx
// شريط التنقل العلوي

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ShieldCheck, Languages, Sun, Moon, Settings, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FaBook, FaBookOpen } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";

const navLinks = [
  { to: "/", label: "لوحة التحكم", key: "dashboard" },
  { to: "/plan", label: "دفتر الملاحظات", key: "notebook" },
  { to: "/journal", label: "سجل التدوينات", key: "journal" },
  { to: "/achievements", label: "الإنجازات", key: "achievements" },
];

export default function Navbar() {
  const { theme, setTheme, lang, setLang } = useApp();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-dark-background backdrop-blur-sm border-b border-light-border dark:border-dark-border shadow-sm text-light-text dark:text-dark-text">
      <nav className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        {/* شعار يمين */}
        <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 group focus:outline-none" tabIndex={0} aria-label="العودة للوحة التحكم">
          <ShieldCheck className="w-6 h-6 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition" />
        </button>
        {/* إعدادات يسار */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <button
              onClick={() => navigate("/notebook")}
              className={`p-2 rounded-full transition group ${location.pathname.startsWith("/notebook") ? "bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400" : "hover:bg-yellow-100 dark:hover:bg-yellow-900"}`}
              aria-label="دفتر الملاحظات"
            >
              <FaBook className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </button>
            <Tooltip>دفتر الملاحظات</Tooltip>
          </div>
          <div className="relative group">
            <button
              onClick={() => navigate("/journal")}
              className={`p-2 rounded-full transition group ${location.pathname.startsWith("/journal") ? "bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400" : "hover:bg-yellow-100 dark:hover:bg-yellow-900"}`}
              aria-label="سجل التدوينات"
            >
              <FaBookOpen className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </button>
            <Tooltip>سجل التدوينات</Tooltip>
          </div>
          <div className="relative group">
            <button
              onClick={() => navigate("/achievements")}
              className={`p-2 rounded-full transition group ${location.pathname.startsWith("/achievements") ? "bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400" : "hover:bg-yellow-100 dark:hover:bg-yellow-900"}`}
              aria-label="الإنجازات"
            >
              <FaMedal className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </button>
            <Tooltip>الإنجازات</Tooltip>
          </div>
          <div className="relative group">
            <button
              onClick={() => navigate("/settings")}
              className={`p-2 rounded-full transition group ${location.pathname.startsWith("/settings") ? "bg-slate-200 dark:bg-slate-800 border-2 border-yellow-400" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              aria-label="الإعدادات"
            >
              <Settings className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>
            <Tooltip>الإعدادات</Tooltip>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(v => !v)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
              aria-label={t("themeAndLang", "الثيم واللغة")}
            >
              <Globe className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>
            {open && (
              <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-2 z-50 animate-fade-in">
                <button onClick={toggleTheme} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-200">
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {theme === "dark" ? t("lightMode", "الوضع الفاتح") : t("darkMode", "الوضع الليلي")}
                </button>
                <button onClick={toggleLang} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-200">
                  <Languages className="w-5 h-5" />
                  {lang === "ar" ? "English" : "العربية"}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

function Tooltip({ children }) {
  return (
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-50 shadow-lg">
      {children}
    </span>
  );
}
