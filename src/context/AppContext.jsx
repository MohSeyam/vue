import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("ar");
  const [settings, setSettings] = useState({});

  return (
    <AppContext.Provider value={{ user, setUser, lang, setLang, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
