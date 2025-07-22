// Navbar.jsx
// شريط التنقل العلوي

import { useTheme } from "../../context/ThemeProvider";
import { useApp } from "../../context/AppContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useApp();

  // تبديل الوضع الليلي/النهاري
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  // تبديل اللغة
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-zinc-900">
      <div className="font-bold text-cyan-700 text-lg">خطة الأمن السيبراني المطور</div>
      <div className="flex items-center gap-2">
        {/* زر تبديل اللغة */}
        <button
          onClick={toggleLang}
          className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition"
        >
          {lang === "ar" ? "EN" : "عربي"}
        </button>
        {/* زر تبديل الوضع الليلي/النهاري */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition"
          title={theme === "dark" ? "وضع النهار" : "وضع الليل"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
