import { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n/i18n";
import { getPlanData } from "../services/dataService";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lang, setLangState] = useState("ar");
  const [settings, setSettings] = useState({});
  const [planData, setPlanData] = useState(null);

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

  // عند تغيير اللغة، حدث i18n دومًا
  const setLang = (lng) => {
    setLangState(lng);
  };

  return (
    <AppContext.Provider value={{ user, setUser, lang, setLang, settings, setSettings, planData, setPlanData }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };

export function useApp() {
  return useContext(AppContext);
}
