import { createContext, useContext, useState } from "react";
import i18n from "../i18n/i18n";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lang, setLangState] = useState("ar");
  const [settings, setSettings] = useState({});

  // عند تغيير اللغة، حدث i18n
  const setLang = (lng) => {
    setLangState(lng);
    i18n.changeLanguage(lng);
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
