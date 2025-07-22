#!/bin/bash

# Script: create-cyber-structure.sh
# Creates the recommended folder structure and starter files for a modern React project

set -e

# Create folders
mkdir -p src/assets
mkdir -p src/components/ui
mkdir -p src/components/common
mkdir -p src/components/dashboard
mkdir -p src/components/notebook
mkdir -p src/components/journal
mkdir -p src/components/layout
mkdir -p src/components/charts
mkdir -p src/context
mkdir -p src/hooks
mkdir -p src/i18n/locales
mkdir -p src/layouts
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/data
mkdir -p src/utils

# Create empty data and assets
> src/data/planData.json
> src/data/phases.json
> src/assets/main.css

# App & main
cat > src/main.jsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

cat > src/App.jsx <<'EOF'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
EOF

# ThemeProvider
cat > src/context/ThemeProvider.jsx <<'EOF'
import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  useEffect(() => { document.documentElement.className = theme; localStorage.setItem("theme", theme); }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() { return useContext(ThemeContext); }
EOF

# AppContext
cat > src/context/AppContext.jsx <<'EOF'
import { createContext, useContext, useState } from "react";
const AppContext = createContext();
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [settings, setSettings] = useState({});
  return (
    <AppContext.Provider value={{ user, setUser, plan, setPlan, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
}
export function useApp() { return useContext(AppContext); }
EOF

# MainLayout
cat > src/layouts/MainLayout.jsx <<'EOF'
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 bg-background">{children}</main>
      </div>
    </div>
  );
}
EOF

# Example pages
cat > src/pages/Dashboard.jsx <<'EOF'
import { Button } from "../components/ui/Button";
import { Sparkles } from "aceternity-ui";
export default function Dashboard() {
  return (
    <div className="flex flex-col items-center gap-8 mt-16">
      <Sparkles>
        <h1 className="text-3xl font-bold">مرحبًا بك في لوحة التحكم!</h1>
      </Sparkles>
      <Button>زر من shadcn/ui</Button>
    </div>
  );
}
EOF

cat > src/pages/NotFound.jsx <<'EOF'
export default function NotFound() {
  return <div className="text-center mt-32 text-2xl">404 | الصفحة غير موجودة</div>;
}
EOF

# Example UI component
cat > src/components/ui/Button.jsx <<'EOF'
// زر shadcn/ui (يمكنك استبداله لاحقًا بمكون shadcn-ui الأصلي)
export function Button({ children, ...props }) {
  return (
    <button className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80 transition" {...props}>
      {children}
    </button>
  );
}
EOF

# Example Navbar/Sidebar
cat > src/components/layout/Navbar.jsx <<'EOF'
export default function Navbar() {
  return (
    <nav className="h-16 flex items-center px-6 bg-white border-b shadow-sm">
      <span className="font-bold text-lg">Cyber Command</span>
    </nav>
  );
}
EOF

cat > src/components/layout/Sidebar.jsx <<'EOF'
export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-50 border-r min-h-screen p-4 hidden md:block">
      <div className="font-bold mb-4">القائمة</div>
      {/* أضف روابط هنا */}
    </aside>
  );
}
EOF

# README
cat > README.md <<'EOF'
# Cyber React App

هيكلية مشروع React حديث مع shadcn/ui وAceternity UI وTailwind CSS.

## خطوات التشغيل

1. أنشئ مشروع Vite React TypeScript
2. ثبت الحزم:
   - tailwindcss, postcss, autoprefixer
   - shadcn/ui
   - aceternity-ui
   - react-router-dom, zustand, dexie, recharts, react-i18next
3. شغل السكريبت:
   ```bash
   bash create-cyber-structure.sh
   ```
4. أضف مكونات shadcn/ui الأصلية لاحقًا عبر npx shadcn-ui@latest add ...

## ملاحظات
- كل الملفات الأساسية جاهزة ويمكنك البناء عليها مباشرة.
EOF

# Done

echo "\nتم إنشاء هيكلية المشروع والملفات الأساسية بنجاح!\n"