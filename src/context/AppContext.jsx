import { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n/i18n";
import { getPlanData } from "../services/dataService";
import { FaCheck, FaEdit, FaClock } from "react-icons/fa";
import { useCyberPlan } from "../hooks/useCyberPlan";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lang, setLangState] = useState("ar");
  const [settings, setSettings] = useState({});
  const [planData, setPlanData] = useState(null);
  const [appState, setAppState] = useState({
    progress: {},
    notes: {},
    resources: {},
  });
  const [modal, setModal] = useState({ isOpen: false, content: null });
  const [theme, setTheme] = useState("light");
  const [globalPomodoro, setGlobalPomodoro] = useState(null); // { title, minutes, running }
  const cyberPlan = useCyberPlan();

  const Icons = {
    check: FaCheck,
    edit: FaEdit,
    clock: FaClock,
    task: (type) => <FaCheck />,
    resource: (type) => <FaEdit />,
  };

  const translations = {
    ar: {
      activeTasks: "المهام النشطة",
      suggestedResources: "المراجع المقترحة",
      addResource: "إضافة مرجع",
      eveningJournaling: "مهمة التدوين المسائية",
      minutes: "دقيقة",
      editNote: "تعديل الملاحظة",
      noteOnTask: "ملاحظة على المهمة",
      noteTitle: "عنوان الملاحظة",
      keywords: "الكلمات المفتاحية",
      noteContent: "محتوى الملاحظة",
      deleteNote: "حذف الملاحظة",
      cancel: "إلغاء",
      saveNote: "حفظ الملاحظة",
      editResource: "تعديل المرجع",
      resourceTitle: "عنوان المرجع",
      resourceUrl: "رابط المرجع",
      resourceType: "نوع المرجع",
      video: "فيديو",
      article: "مقالة",
      link: "رابط",
      deleteResource: "حذف المرجع",
      saveResource: "حفظ المرجع",
    },
    en: {
      activeTasks: "Active Tasks",
      suggestedResources: "Suggested Resources",
      addResource: "Add Resource",
      eveningJournaling: "Evening Journaling",
      minutes: "min",
      editNote: "Edit Note",
      noteOnTask: "Note on task",
      noteTitle: "Note Title",
      keywords: "Keywords",
      noteContent: "Note Content",
      deleteNote: "Delete Note",
      cancel: "Cancel",
      saveNote: "Save Note",
      editResource: "Edit Resource",
      resourceTitle: "Resource Title",
      resourceUrl: "Resource URL",
      resourceType: "Resource Type",
      video: "Video",
      article: "Article",
      link: "Link",
      deleteResource: "Delete Resource",
      saveResource: "Save Resource",
    }
  };

  // زامن i18n.language مع lang عند التحميل
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  // تحميل بيانات الخطة عند بدء التطبيق
  useEffect(() => {
    async function fetchPlan() {
      const data = await getPlanData();
      setPlanData(data);
    }
    fetchPlan();
  }, []);

  // استعادة اللغة والثيم من localStorage عند بدء التطبيق
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) setLangState(storedLang);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // حفظ اللغة والثيم في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // عند تغيير اللغة، حدث i18n دومًا
  const setLang = (lng) => {
    setLangState(lng);
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    console.log('theme:', theme);
    console.log('document.documentElement.className:', document.documentElement.className);
  }, [theme]);

  return (
    <AppContext.Provider value={{ user, setUser, lang, setLang, settings, setSettings, planData, setPlanData, appState, setAppState, Icons, translations, modal, setModal, theme, setTheme,
      globalPomodoro, setGlobalPomodoro, plan: cyberPlan.plan, savePlan: cyberPlan.savePlan, progress: cyberPlan.progress, setTaskProgress: cyberPlan.setTaskProgress }}>
      {children}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 max-w-lg w-full relative">
            <button className="absolute top-3 right-3 text-slate-400 hover:text-red-500 text-xl" onClick={() => setModal({ isOpen: false, content: null })}>&times;</button>
            {modal.content}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export { AppContext };

export function useApp() {
  return useContext(AppContext);
}
