import { useApp } from "../context/AppContext";
import { Sun, Moon, User } from "lucide-react";

export default function Settings() {
  const { theme, setTheme, lang, setLang } = useApp();
  // اسم المستخدم وصورة رمزية افتراضية
  const userName = "مستخدم افتراضي";
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white dark:bg-dark-card rounded-lg shadow">
      <div className="flex flex-col items-center mb-6">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-2">
          <User className="w-10 h-10 text-blue-500 dark:text-blue-300" />
        </span>
        <div className="font-bold text-lg mb-1">{userName}</div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">تغيير اللغة</div>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="px-4 py-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>
      <div>
        <div className="font-semibold mb-2">تغيير الثيم</div>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-4 py-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {theme === "dark" ? "وضع النهار" : "وضع الليل"}
        </button>
      </div>
    </div>
  );
}
