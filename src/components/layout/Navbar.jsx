// Navbar.jsx
// شريط التنقل العلوي

import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";
import { useApp } from "../../context/AppContext";
import { ShieldCheck, Languages, Sun, Moon, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

const navLinks = [
  { to: "/", label: "لوحة التحكم", key: "dashboard" },
  { to: "/plan", label: "دفتر الملاحظات", key: "notebook" },
  { to: "/journal", label: "سجل التدوينات", key: "journal" },
  { to: "/achievements", label: "الإنجازات", key: "achievements" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useApp();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = lang === "ar";

  // تبديل الوضع الليلي/النهاري
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  // تبديل اللغة
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <nav className={`flex items-center justify-between h-16 max-w-7xl mx-auto px-4`}
      >
        {/* شعار وأيقونة */}
        <Link to="/" className="flex items-center gap-2 group" tabIndex={0}>
          <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-sky-400 group-hover:scale-110 transition" />
          <span className="font-bold text-lg text-slate-900 dark:text-white drop-shadow-sm">خطة الأمن السيبراني</span>
        </Link>
        {/* روابط التنقل */}
        <ul className="hidden md:flex gap-4 items-center">
          {navLinks.map(link => (
            <li key={link.key}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-full font-medium transition text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white ${
                    isActive ? "text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-sky-900/30" : ""
                  }`
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* أزرار الإجراءات */}
        <div className="flex items-center gap-1">
          {/* زر اللغة */}
          <button
            onClick={toggleLang}
            className="font-extrabold text-2xl px-2 transition hover:text-blue-700 dark:hover:text-blue-300"
            aria-label={t("changeLanguage", "تغيير اللغة")}
          >
            {lang === "ar" ? "ع" : "E"}
            <Tooltip>{lang === "ar" ? "Change Language" : "تغيير اللغة"}</Tooltip>
          </button>
          {/* زر الثيم */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition group relative"
            aria-label={theme === "dark" ? t("lightMode", "الوضع الفاتح") : t("darkMode", "الوضع الليلي")}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-slate-500 dark:text-sky-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500 dark:text-sky-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            )}
            <Tooltip>{theme === "dark" ? t("lightMode", "الوضع الفاتح") : t("darkMode", "الوضع الليلي")}</Tooltip>
          </button>
          {/* زر الإعدادات */}
          <Link
            to="/settings"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition group relative"
            aria-label={t("settings", "الإعدادات")}
          >
            <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            <Tooltip>{t("settings", "الإعدادات")}</Tooltip>
          </Link>
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
