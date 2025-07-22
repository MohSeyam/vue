#!/bin/bash

# سكريبت لإنشاء هيكلية مشروع React كما أرسلها المستخدم بالضبط

set -e

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

# assets
cat > src/assets/main.css <<'EOF'
/* أنماط عامة */
/* هنا توضع ملفات CSS، الخطوط، والصور */
EOF

# components/ui
cat > src/components/ui/Button.jsx <<'EOF'
// Button.jsx
// مكون زر أساسي من shadcn/ui
EOF
cat > src/components/ui/Dialog.jsx <<'EOF'
// Dialog.jsx
// مكون نافذة حوار من shadcn/ui
EOF
cat > src/components/ui/Card.jsx <<'EOF'
// Card.jsx
// مكون بطاقة من shadcn/ui
EOF
cat > src/components/ui/Toast.jsx <<'EOF'
// Toast.jsx
// مكون Toast من shadcn/ui
EOF
# ...etc
cat > src/components/ui/README.txt <<'EOF'
ضع هنا بقية مكونات shadcn/ui (Checkbox, Input, ...etc)
EOF

# components/common
cat > src/components/common/SearchBar.jsx <<'EOF'
// SearchBar.jsx
// مكون بحث مخصص قابل لإعادة الاستخدام
EOF
cat > src/components/common/TagFilter.jsx <<'EOF'
// TagFilter.jsx
// مكون فلترة بالوسوم
EOF
cat > src/components/common/DateFilter.jsx <<'EOF'
// DateFilter.jsx
// مكون فلترة بالتاريخ
EOF
cat > src/components/common/PageLoader.jsx <<'EOF'
// PageLoader.jsx
// مكون تحميل صفحات
EOF

# components/dashboard
cat > src/components/dashboard/WeekProgress.jsx <<'EOF'
// WeekProgress.jsx
// مكون يوضح تقدم الأسبوع
EOF
cat > src/components/dashboard/PhaseCard.jsx <<'EOF'
// PhaseCard.jsx
// مكون بطاقة مرحلة
EOF
cat > src/components/dashboard/AchievementsSummary.jsx <<'EOF'
// AchievementsSummary.jsx
// ملخص الإنجازات
EOF

# components/notebook
cat > src/components/notebook/NoteList.jsx <<'EOF'
// NoteList.jsx
// قائمة الملاحظات
EOF
cat > src/components/notebook/NoteEditor.jsx <<'EOF'
// NoteEditor.jsx
// محرر الملاحظات
EOF

# components/journal
cat > src/components/journal/JournalEntry.jsx <<'EOF'
// JournalEntry.jsx
// عنصر يومية
EOF
cat > src/components/journal/JournalEditor.jsx <<'EOF'
// JournalEditor.jsx
// محرر اليوميات
EOF

# components/layout
cat > src/components/layout/Navbar.jsx <<'EOF'
// Navbar.jsx
// شريط التنقل العلوي
EOF
cat > src/components/layout/Sidebar.jsx <<'EOF'
// Sidebar.jsx
// الشريط الجانبي
EOF
cat > src/components/layout/BottomNavigation.jsx <<'EOF'
// BottomNavigation.jsx
// شريط التنقل السفلي
EOF

# components/charts
cat > src/components/charts/SkillsChart.jsx <<'EOF'
// SkillsChart.jsx
// رسم بياني للمهارات (Recharts)
EOF
cat > src/components/charts/ProgressChart.jsx <<'EOF'
// ProgressChart.jsx
// رسم بياني للتقدم (Recharts)
EOF

# context
cat > src/context/AppContext.jsx <<'EOF'
// AppContext.jsx
// يدير: الخطة، المستخدم، الإعدادات، الحالة العامة
EOF
cat > src/context/ThemeProvider.jsx <<'EOF'
// ThemeProvider.jsx
// يدير: الوضع الفاتح/الداكن
EOF

# hooks
cat > src/hooks/useCyberPlan.js <<'EOF'
// useCyberPlan.js
// الخطاف الرئيسي لجلب وإدارة بيانات الخطة
EOF
cat > src/hooks/useAutoSave.js <<'EOF'
// useAutoSave.js
// منطق الحفظ التلقائي للتقدم
EOF
cat > src/hooks/useDebounce.js <<'EOF'
// useDebounce.js
// لتأخير تنفيذ دالة، مفيد للبحث
EOF
cat > src/hooks/useLocalStorage.js <<'EOF'
// useLocalStorage.js
// خطاف مساعد للتعامل مع التخزين المحلي
EOF

# i18n
cat > src/i18n/locales/ar.json <<'EOF'
{
  "مرحبا": "مرحبا"
}
EOF
cat > src/i18n/locales/en.json <<'EOF'
{
  "hello": "Hello"
}
EOF
cat > src/i18n/i18n.js <<'EOF'
// ملف الإعداد الرئيسي للترجمة (react-i18next)
EOF

# layouts
cat > src/layouts/MainLayout.jsx <<'EOF'
// MainLayout.jsx
// يحتوي على Navbar, Sidebar والمحتوى
EOF

# pages
cat > src/pages/Dashboard.jsx <<'EOF'
// Dashboard.jsx
EOF
cat > src/pages/WeekView.jsx <<'EOF'
// WeekView.jsx
EOF
cat > src/pages/DayView.jsx <<'EOF'
// DayView.jsx
EOF
cat > src/pages/Notebook.jsx <<'EOF'
// Notebook.jsx
EOF
cat > src/pages/Journal.jsx <<'EOF'
// Journal.jsx
EOF
cat > src/pages/Achievements.jsx <<'EOF'
// Achievements.jsx
EOF
cat > src/pages/Settings.jsx <<'EOF'
// Settings.jsx
EOF
cat > src/pages/Onboarding.jsx <<'EOF'
// Onboarding.jsx
EOF
cat > src/pages/NotFound.jsx <<'EOF'
// NotFound.jsx
EOF

# services
cat > src/services/dataService.js <<'EOF'
// dataService.js
// لجلب البيانات الأولية للخطة من ملفات JSON
EOF
cat > src/services/dbService.js <<'EOF'
// dbService.js
// للتعامل مع Dexie.js لتخزين بيانات المستخدم
EOF
cat > src/services/exportService.js <<'EOF'
// exportService.js
// لتصدير البيانات إلى PDF, Markdown, HTML
EOF

# data
cat > src/data/planData.json <<'EOF'
// بيانات الخطة الثابتة
EOF
cat > src/data/phases.json <<'EOF'
// بيانات المراحل الثابتة
EOF

# utils
cat > src/utils/formatters.js <<'EOF'
// formatters.js
// لتنسيق التواريخ، الأرقام، إلخ
EOF
cat > src/utils/sanitizeHtml.js <<'EOF'
// sanitizeHtml.js
// لتنظيف محتوى HTML من المحرر
EOF

# الجذر
cat > src/App.jsx <<'EOF'
// App.jsx
// المكون الجذري للتطبيق
EOF
cat > src/main.jsx <<'EOF'
// main.jsx
// نقطة الدخول الرئيسية للتطبيق
EOF
cat > src/manifest.webmanifest <<'EOF'
// manifest.webmanifest
// إعدادات PWA
EOF

echo "\nتم إنشاء الهيكلية كما أرسلتها بالضبط!\n"