import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Dialog } from "../components/ui/Dialog";
import { Goal, Clock, Flame } from "lucide-react";
import { FaBookOpen } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { useCyberPlan } from "../hooks/useCyberPlan";
import { useEffect } from "react";
import { Bar, Pie, Radar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale, PointElement, LineElement, Filler } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale, PointElement, LineElement, Filler);
import { useMemo } from "react";
import jsPDF from "jspdf";

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
  const { plan } = useCyberPlan();
  // تحليل المهارات
  const allTasks = plan.flatMap(week => (week.days || []).flatMap(day => day.tasks || []));
  const doneTasks = allTasks.filter(t => t.done);
  const skillTypes = ["Blue Team", "Red Team", "Soft Skills", "Practical"];
  const skillColors = ["#3b82f6", "#ef4444", "#f59e42", "#10b981"];
  const skillsData = skillTypes.map(type => doneTasks.filter(t => t.type === type).length);
  const barData = {
    labels: skillTypes,
    datasets: [
      {
        label: "عدد المهام المنجزة",
        data: skillsData,
        backgroundColor: skillColors,
        borderRadius: 8,
      },
    ],
  };
  // تقدم المراحل
  const phases = Array.from(new Set(plan.map(w => w.phase)));
  const phaseLabels = phases.map(p => `المرحلة ${p}`);
  const phaseColors = Array(phases.length).fill("#FFD700"); // ذهبي موحد لكل المراحل
  const phaseTotals = phases.map(phase => plan.filter(w => w.phase === phase).flatMap(w => (w.days || []).flatMap(d => d.tasks || [])).length);
  const phaseDone = phases.map(phase => plan.filter(w => w.phase === phase).flatMap(w => (w.days || []).flatMap(d => d.tasks?.filter(t => t.done) || [])).length);
  const pieData = {
    labels: phaseLabels,
    datasets: [
      {
        data: phaseTotals.map((total, i) => phaseDone[i] / (total || 1) * 100),
        backgroundColor: phaseColors,
      },
    ],
  };
  // خريطة المهارات (راداري)
  const radarData = {
    labels: skillTypes,
    datasets: [
      {
        label: "توازن المهارات",
        data: skillsData,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#3b82f6",
        pointBackgroundColor: skillColors,
      },
    ],
  };
  return (
    <Card className="my-8">
      <Tabs tabs={["تحليل المهارات", "تقدم المراحل", "خريطة المهارات"]} active={tab} onTab={setTab} />
      <div className="min-h-[220px] flex items-center justify-center">
        {tab === 0 && (
          <div className="w-full max-w-xl mx-auto">
            <Bar data={barData} options={{
              responsive: true,
              plugins: { legend: { display: false }, title: { display: true, text: "توزيع المهارات المنجزة" } },
              scales: { y: { beginAtZero: true } },
            }} />
          </div>
        )}
        {tab === 1 && (
          <div className="w-full max-w-xs mx-auto">
            <Pie data={pieData} options={{
              plugins: { legend: { position: "bottom" }, title: { display: true, text: "نسبة الإنجاز في كل مرحلة" } },
            }} />
          </div>
        )}
        {tab === 2 && (
          <div className="w-full max-w-xl mx-auto">
            <Radar data={radarData} options={{
              scale: { ticks: { beginAtZero: true, stepSize: 1 } },
              plugins: { legend: { display: false }, title: { display: true, text: "خريطة توازن المهارات" } },
            }} />
          </div>
        )}
      </div>
    </Card>
  );
};

const daysInYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const arr = [];
  for (let d = new Date(start); d.getFullYear() === now.getFullYear(); d.setDate(d.getDate() + 1)) {
    arr.push(new Date(d));
  }
  return arr;
};
const LearningHeatmap = ({ journal }) => {
  // daysSet: كل يوم فيه تدوينة
  const daysSet = useMemo(() => new Set(journal.map(j => new Date(j.date).toDateString())), [journal]);
  const yearDays = useMemo(() => daysInYear(), []);
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-1 flex-wrap" style={{ maxWidth: 700 }}>
        {yearDays.map((d, i) => {
          const key = d.toDateString();
          const active = daysSet.has(key);
          return <div key={key} title={d.toLocaleDateString("ar-EG")} className={`w-3 h-3 rounded ${active ? "bg-emerald-500" : "bg-emerald-100 dark:bg-zinc-800"} border border-emerald-200 dark:border-zinc-700 transition`} />;
        })}
      </div>
      <div className="text-xs text-slate-500 mt-2">كل مربع = يوم دراسة في السنة الحالية</div>
    </div>
  );
};

const Badges = ({ plan, journal, streak }) => {
  // شارة أول مرحلة مكتملة
  const phases = Array.from(new Set(plan.map(w => w.phase)));
  const phaseDone = phases.map(phase => plan.filter(w => w.phase === phase).flatMap(w => (w.days || []).flatMap(d => d.tasks?.filter(t => t.done) || [])).length);
  const phaseTotals = phases.map(phase => plan.filter(w => w.phase === phase).flatMap(w => (w.days || []).flatMap(d => d.tasks || [])).length);
  const firstPhaseComplete = phaseDone[0] === phaseTotals[0] && phaseTotals[0] > 0;
  // شارة سلسلة 7 أيام
  const hasStreak7 = streak >= 7;
  // شارة إنجاز كل المراحل
  const allPhasesComplete = phaseDone.every((d, i) => d === phaseTotals[i] && phaseTotals[i] > 0);
  return (
    <div className="flex gap-2 flex-wrap">
      {firstPhaseComplete && <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-bold">🏅 أول مرحلة مكتملة</span>}
      {hasStreak7 && <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-bold">🏆 سلسلة 7 أيام</span>}
      {allPhasesComplete && <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-bold">👑 جميع المراحل مكتملة</span>}
    </div>
  );
};

const Consistency = () => {
  const { plan, journal } = useCyberPlan();
  // streak logic (نفس StatsSummary)
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
  return (
    <Card className="my-8">
      <div className="mb-4 text-xl font-bold text-emerald-700">الالتزام اليومي</div>
      <LearningHeatmap journal={journal} />
      <div className="mt-2"><Badges plan={plan} journal={journal} streak={maxStreak} /></div>
    </Card>
  );
};

const ReportGenerator = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { plan, journal } = useCyberPlan();
  // حساب القيم كما في StatsSummary وBadges
  const allTasks = plan.flatMap(week => (week.days || []).flatMap(day => day.tasks || []));
  const doneTasks = allTasks.filter(t => t.done);
  const progress = allTasks.length ? Math.round((doneTasks.length / allTasks.length) * 100) : 0;
  const totalMinutes = doneTasks.reduce((sum, t) => sum + (t.duration || 0), 0);
  const learningHours = Math.round(totalMinutes / 60);
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
  // Badges
  const phases = Array.from(new Set(plan.map(w => w.phase)));
  const phaseDone = phases.map(phase => plan.filter(w => w.phase === phase).flatMap(w => (w.days || []).flatMap(d => d.tasks?.filter(t => t.done) || [])).length);
  const phaseTotals = phases.map(phase => plan.filter(w => w.phase === phase).flatMap(w => (w.days || []).flatMap(d => d.tasks || [])).length);
  const firstPhaseComplete = phaseDone[0] === phaseTotals[0] && phaseTotals[0] > 0;
  const hasStreak7 = maxStreak >= 7;
  const allPhasesComplete = phaseDone.every((d, i) => d === phaseTotals[i] && phaseTotals[i] > 0);

  function handleDownload() {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("تقرير إنجازاتك", 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`نسبة إنجاز الخطة: ${progress}%`, 20, 40);
    doc.text(`إجمالي ساعات التعلم: ${learningHours} ساعة`, 20, 50);
    doc.text(`أطول سلسلة التزام: ${maxStreak} يوم`, 20, 60);
    let badges = [];
    if (firstPhaseComplete) badges.push("🏅 أول مرحلة مكتملة");
    if (hasStreak7) badges.push("🏆 سلسلة 7 أيام");
    if (allPhasesComplete) badges.push("👑 جميع المراحل مكتملة");
    doc.text(`الشارات: ${badges.length ? badges.join("، ") : "-"}`, 20, 70);
    doc.setFontSize(11);
    doc.text("تم توليد هذا التقرير تلقائيًا من لوحة إنجازاتك في تطبيق سايبر بلان.", 20, 90);
    doc.save("achievements-report.pdf");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  }

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
          </select>
          <Button className="w-full" onClick={handleDownload}>تحميل التقرير</Button>
          {success && <div className="text-green-600 text-center mt-2">تم تحميل التقرير بنجاح!</div>}
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
