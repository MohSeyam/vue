import { useApp } from "../context/AppContext";
import { Sun, Moon, User, Download, Trash2, Info } from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const { theme, setTheme, lang, setLang } = useApp();
  // اسم المستخدم وصورة رمزية افتراضية
  const userName = "مستخدم افتراضي";
  
  const handleExport = () => {
    // تصدير البيانات كـ JSON
    const data = { plan: [], notes: [], journal: [] };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cyberplan-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تصدير البيانات بنجاح!");
  };

  const handleClearData = () => {
    if (confirm("هل أنت متأكد من حذف جميع البيانات؟")) {
      // حذف البيانات
      toast.success("تم حذف البيانات بنجاح!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white dark:bg-dark-card rounded-lg shadow">
      <div className="flex flex-col items-center mb-6">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-2">
          <User className="w-10 h-10 text-blue-500 dark:text-blue-300" />
        </span>
        <div className="font-bold text-lg mb-1">{userName}</div>
        <div className="text-sm text-slate-500">عضو نشط</div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            معلومات الحساب
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded p-3 text-sm">
            <div className="flex justify-between mb-1">
              <span>البريد الإلكتروني:</span>
              <span className="text-slate-600">user@example.com</span>
            </div>
            <div className="flex justify-between">
              <span>تاريخ الانضمام:</span>
              <span className="text-slate-600">يناير 2024</span>
            </div>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">تغيير اللغة</div>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="w-full px-4 py-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>

        <div>
          <div className="font-semibold mb-2">تغيير الثيم</div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full px-4 py-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {theme === "dark" ? "وضع النهار" : "وضع الليل"}
          </button>
        </div>

        <div>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير البيانات
          </div>
          <button onClick={handleExport}
            className="w-full px-4 py-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition">
            تصدير نسخة احتياطية
          </button>
        </div>

        <div>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            حذف البيانات
          </div>
          <button onClick={handleClearData}
            className="w-full px-4 py-2 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition">
            حذف جميع البيانات
          </button>
        </div>
      </div>
    </div>
  );
}
