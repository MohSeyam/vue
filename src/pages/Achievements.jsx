import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Dialog } from "../components/ui/Dialog";
import { Goal, Clock, Flame } from "lucide-react";
import { FaBookOpen } from "react-icons/fa";

// Placeholder components for charts and custom widgets
const ProgressCircle = () => <div className="flex flex-col items-center justify-center"><div className="w-24 h-24 rounded-full border-8 border-blue-400 flex items-center justify-center text-3xl font-bold">85%</div><div className="mt-2 text-blue-600 font-semibold">إجمالي التقدم</div></div>;
const Sparkline = () => <div className="h-8 w-full bg-gradient-to-r from-blue-200 to-blue-400 rounded" />;
const StatsSummary = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
    <Card className="flex flex-col items-center justify-center gap-2">
      <Goal className="w-8 h-8 text-blue-500 mb-2" />
      <ProgressCircle />
      <div className="text-sm text-slate-500 mt-2">نسبة إنجاز الخطة</div>
    </Card>
    <Card className="flex flex-col items-center justify-center gap-2">
      <Clock className="w-8 h-8 text-sky-500 mb-2" />
      <div className="text-4xl font-extrabold text-sky-600">120</div>
      <div className="w-full"><Sparkline /></div>
      <div className="text-sm text-slate-500 mt-2">إجمالي ساعات التعلم</div>
    </Card>
    <Card className="flex flex-col items-center justify-center gap-2">
      <Flame className="w-8 h-8 text-orange-500 mb-2" />
      <div className="text-4xl font-extrabold text-orange-500">14</div>
      <div className="text-sm text-slate-500 mt-2">سلسلة الإنجاز (أيام متتالية)</div>
    </Card>
  </div>
);

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
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-sky-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-8">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400 mb-4">لوحة إنجازاتك</div>
        <div className="text-xl text-slate-600 dark:text-slate-300 font-medium">رحلتك في عالم الأمن السيبراني بالأرقام</div>
      </div>
      {/* Key Metrics (Bento Grid) */}
      <StatsSummary />
      {/* Deep Dive Analytics */}
      <DeepDiveAnalytics />
      {/* Consistency Section */}
      <Consistency />
      {/* Reporting Section */}
      <ReportGenerator />
    </div>
  );
}
