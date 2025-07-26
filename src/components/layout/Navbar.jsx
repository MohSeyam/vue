// Navbar.jsx
// شريط التنقل العلوي

import { useApp } from "../../context/AppContext";
import { Sun, Moon, Languages, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { theme, setTheme, lang, setLang } = useApp();
  const { t } = useTranslation();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <header className="w-full bg-white/80 dark:bg-dark-background backdrop-blur-sm border-b border-light-border dark:border-dark-border shadow-sm text-light-text dark:text-dark-text px-4 h-16 flex items-center justify-between">
      {/* Logo/Home */}
      <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 group focus:outline-none" tabIndex={0} aria-label="العودة للصفحة الرئيسية">
        <ShieldCheck className="w-7 h-7 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition" />
        <span className="font-bold text-lg hidden sm:inline">CyberPlan</span>
      </button>
      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition" aria-label={t("theme", "تغيير الثيم")}>{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
        <button onClick={toggleLang} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition" aria-label={t("lang", "تغيير اللغة")}>{lang === "ar" ? "EN" : "AR"}</button>
      </div>
    </header>
  );
}
