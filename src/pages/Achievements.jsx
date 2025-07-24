import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Dialog } from "../components/ui/Dialog";
import { Goal, Clock, Flame } from "lucide-react";
import { FaBookOpen } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { useCyberPlan } from "../hooks/useCyberPlan";
import { useEffect } from "react";

// Placeholder components for charts and custom widgets
const ProgressCircle = ({ percent = 85 }) => (
  <div className="flex flex-col items-center justify-center relative">
    <div className="w-24 h-24 rounded-full border-8 border-blue-400 flex items-center justify-center text-3xl font-bold bg-white/80 dark:bg-zinc-900/80 relative">
      {percent === 100 && <FaCrown className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-400 w-8 h-8 animate-bounce" />}
      {percent}%
    </div>
    <div className="mt-2 text-blue-600 font-semibold">إجمالي التقدم</div>
  </div>
);
const Sparkline = () => <div className="h-8 w-full bg-gradient-to-r from-blue-200 to-blue-400 rounded" />;
const StatsSummary = () => {
  const { plan, journal, loading } = useCyberPlan();
  // حساب نسبة التقدم
  const allTasks = plan.flatMap(week => (week.days || []).flatMap(day => day.tasks || []));
  const doneTasks = allTasks.filter(t => t.done);
  const progress = allTasks.length ? Math.round((doneTasks.length / allTasks.length) * 100) : 0;
  // حساب ساعات التعلم
  const totalMinutes = doneTasks.reduce((sum, t) => sum + (t.duration || 0), 0);
  const learningHours = Math.round(totalMinutes / 60);
  // حساب سلسلة الإنجاز (streak)
  // نستخدم journal: كل يوم فيه تدوينة يعتبر يوم دراسة
  const daysSet = new Set(journal.map(j => new Date(j.date).toDateString()));
  let streak = 0, maxStreak = 0;
  let prev = null;
  Array.from(daysSet).sort().forEach(dateStr => {
    const date = new Date(dateStr);
    if (prev) {
      const diff = (date - prev) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }
    maxStreak = Math.max(maxStreak, streak);
    prev = date;
  });
  if (loading) return <div className="text-center text-slate-400">جاري التحميل...</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <Card className="flex flex-col items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
        <Goal className="w-8 h-8 text-blue-500 mb-2" />
        <ProgressCircle percent={progress} />
        <div className="text-sm text-slate-500 mt-2">نسبة إنجاز الخطة</div>
      </Card>
      <Card className="flex flex-col items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
        <Clock className="w-8 h-8 text-sky-500 mb-2" />
        <div className="text-4xl font-extrabold text-sky-600">{learningHours}</div>
        <div className="w-full"><Sparkline /></div>
        <div className="text-sm text-slate-500 mt-2">إجمالي ساعات التعلم</div>
      </Card>
      <Card className="flex flex-col items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
        <Flame className="w-8 h-8 text-orange-500 mb-2" />
        <div className="text-4xl font-extrabold text-orange-500">{maxStreak}</div>
        <div className="text-sm text-slate-500 mt-2">سلسلة الإنجاز (أيام متتالية)</div>
      </Card>
    </div>
  );
};

const Tabs = ({ tabs, active, onTab }) => (
  <div className="mb-4">
    <div className="flex gap-2 border-b mb-2">
      {tabs.map((tab, i) => (
        <button key={tab} className={`px-4 py-2 font-bold text-lg transition border-b-2 ${active === i ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500"}`} onClick={() => onTab(i)}>{tab}</button>
      ))}
    </div>
  </div>
);

const DeepDiveAnalytics = () => {
  const [tab, setTab] = useState(0);
  return (
    <Card className="my-8">
      <Tabs tabs={["تحليل المهارات", "تقدم المراحل", "خريطة المهارات"]} active={tab} onTab={setTab} />
      <div className="min-h-[220px] flex items-center justify-center">
        {tab === 0 && <div className="w-full text-center">[مخطط الأعمدة: توزيع المهارات]</div>}
        {tab === 1 && <div className="w-full text-center">[مخطط دائري: تقدم المراحل]</div>}
        {tab === 2 && <div className="w-full text-center">[مخطط راداري: خريطة المهارات]</div>}
      </div>
    </Card>
  );
};

const LearningHeatmap = () => <div className="w-full h-32 bg-gradient-to-r from-emerald-200 to-emerald-400 rounded mb-2 flex items-center justify-center text-2xl text-emerald-900">[خريطة التعلم الحرارية]</div>;
const Badges = () => <div className="flex gap-2 flex-wrap"><span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-bold">🏅 أول مرحلة</span><span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-bold">🏆 10 أيام متتالية</span></div>;

const Consistency = () => (
  <Card className="my-8">
    <div className="mb-4 text-xl font-bold text-emerald-700">الالتزام اليومي</div>
    <LearningHeatmap />
    <div className="mt-2"><Badges /></div>
  </Card>
);

const ReportGenerator = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="my-8 flex flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold text-sky-700">وثّق رحلتك</div>
      <Button onClick={() => setOpen(true)} className="text-xl px-8 py-4">إنشاء تقرير الإنجازات</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="p-4">
          <div className="font-bold text-lg mb-2">إعدادات التقرير</div>
          <div className="mb-2">اختر مستوى التفاصيل وصيغة الملف:</div>
          <select className="w-full mb-2 p-2 rounded border">
            <option>موجز (مختصر)</option>
            <option>تفصيلي</option>
          </select>
          <select className="w-full mb-4 p-2 rounded border">
            <option>PDF</option>
            <option>Word</option>
          </select>
          <Button className="w-full">تحميل التقرير</Button>
        </div>
      </Dialog>
    </Card>
  );
};

export default function Achievements() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-sky-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-8 relative overflow-x-hidden">
      {/* Confetti background (simple animated dots) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="animate-pulse absolute top-10 left-1/4 w-6 h-6 bg-yellow-200 rounded-full opacity-40" />
        <div className="animate-bounce absolute top-24 right-1/3 w-4 h-4 bg-blue-200 rounded-full opacity-30" />
        <div className="animate-pulse absolute bottom-16 left-1/3 w-5 h-5 bg-emerald-200 rounded-full opacity-30" />
        <div className="animate-bounce absolute bottom-10 right-1/4 w-7 h-7 bg-pink-200 rounded-full opacity-30" />
      </div>
      {/* Hero Section */}
      <div className="text-center mb-10 relative z-10">
        <div className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400 mb-4">لوحة إنجازاتك</div>
        <div className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-2">رحلتك في عالم الأمن السيبراني بالأرقام</div>
        <div className="text-lg text-sky-600 dark:text-sky-400 font-semibold italic mb-2">"كل إنجاز صغير اليوم هو خطوة نحو نجاح كبير غدًا!"</div>
      </div>
      {/* Key Metrics (Bento Grid) */}
      <StatsSummary />
      {/* Deep Dive Analytics */}
      <DeepDiveAnalytics />
      {/* Consistency Section */}
      <Consistency />
      {/* Reporting Section */}
      <div className="relative z-10">
        <ReportGenerator />
        <div className="flex justify-center mt-[-32px]">
          <span className="animate-bounce text-3xl text-sky-400">↓</span>
        </div>
      </div>
    </div>
  );
}
