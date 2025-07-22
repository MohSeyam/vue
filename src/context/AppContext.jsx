import { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n/i18n";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lang, setLangState] = useState("ar");
  const [settings, setSettings] = useState({});

  // زامن i18n.language مع lang عند التحميل
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  // عند تغيير اللغة، حدث i18n دومًا
  const setLang = (lng) => {
    setLangState(lng);
  };

  return (
    <AppContext.Provider value={{ user, setUser, lang, setLang, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
