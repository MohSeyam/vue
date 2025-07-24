import React, { useRef } from "react";
import { useApp } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

export default function Settings() {
  const { plan, notes, journal, progress, savePlan, addNote, addJournalEntry, setTaskProgress } = useApp();
  const fileInputRef = useRef();

  // تصدير كل البيانات كـ JSON
  const handleExport = () => {
    const data = { plan, notes, journal, progress };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cyberplan-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تصدير البيانات بنجاح!");
  };

  // استيراد كل البيانات من JSON
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      if (data.plan) await savePlan(data.plan);
      if (data.notes) for (const n of data.notes) await addNote(n);
      if (data.journal) for (const j of data.journal) await addJournalEntry(j);
      if (data.progress) for (const p of data.progress) await setTaskProgress(p.weekId, p.dayKey, p.taskId, p.done);
      toast.success("تم استيراد البيانات بنجاح!");
    } catch {
      toast.error("فشل في قراءة الملف. تأكد أنه نسخة احتياطية من التطبيق.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card className="p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2">إعدادات التطبيق</h2>
        <div className="text-slate-600 dark:text-slate-300 mb-4">يمكنك تصدير نسخة احتياطية من جميع بياناتك أو استيرادها لاحقًا.</div>
        <Button onClick={handleExport} className="w-full">تصدير جميع البيانات (JSON)</Button>
        <input type="file" accept="application/json" ref={fileInputRef} style={{ display: "none" }} onChange={handleImport} />
        <Button onClick={() => fileInputRef.current.click()} className="w-full" variant="secondary">استيراد نسخة احتياطية</Button>
      </Card>
    </div>
  );
}
