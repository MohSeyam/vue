// useCyberPlan.js
// الخطاف الرئيسي لجلب وإدارة بيانات الخطة والتقدم وحفظها
import { useEffect, useState, useCallback } from "react";
import * as db from "../services/dbService";

export function useCyberPlan() {
  const [plan, setPlan] = useState([]);
  const [notes, setNotes] = useState([]);
  const [journal, setJournal] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب كل البيانات من القاعدة
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [planData, notesData, journalData, progressData] = await Promise.all([
      db.getPlan(),
      db.getNotes(),
      db.getJournalEntries(),
      db.getProgress()
    ]);
    // تهيئة كل مهمة بـ done: false إذا لم تكن موجودة (للتوافق فقط)
    const normalizedPlan = planData.map(week => ({
      ...week,
      days: (week.days || []).map(day => ({
        ...day,
        tasks: (day.tasks || []).map(task => {
          const t = { ...task, done: typeof task.done === 'boolean' ? task.done : false };
          if (typeof task.done !== 'boolean') console.log('Initialized done for task:', t);
          return t;
        })
      }))
    }));
    setPlan(normalizedPlan);
    setProgress(progressData);
    console.log('fetchAll: setPlan', normalizedPlan);
    setNotes(notesData);
    setJournal(journalData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // تحديث الخطة
  const savePlan = async (planArr) => {
    console.log('savePlan: planArr before save', planArr);
    await db.savePlan(planArr);
    const newPlan = await db.getPlan();
    console.log('savePlan: plan after save', newPlan);
    setPlan(newPlan);
  };

  // تحديث حالة مهمة واحدة في progress
  const setTaskProgress = async (weekId, dayKey, taskId, done) => {
    await db.setTaskProgress(weekId, dayKey, taskId, done);
    setProgress(await db.getProgress());
  };

  // إدارة الملاحظات
  const addNote = async (note) => {
    await db.addNote(note);
    setNotes(await db.getNotes());
  };
  const updateNote = async (id, updates) => {
    await db.updateNote(id, updates);
    setNotes(await db.getNotes());
  };
  const deleteNote = async (id) => {
    await db.deleteNote(id);
    setNotes(await db.getNotes());
  };

  // إدارة اليوميات
  const addJournalEntry = async (entry) => {
    await db.addJournalEntry(entry);
    setJournal(await db.getJournalEntries());
  };
  const updateJournalEntry = async (id, updates) => {
    await db.updateJournalEntry(id, updates);
    setJournal(await db.getJournalEntries());
  };
  const deleteJournalEntry = async (id) => {
    await db.deleteJournalEntry(id);
    setJournal(await db.getJournalEntries());
  };

  return {
    plan, notes, journal, loading, progress,
    savePlan,
    setTaskProgress,
    addNote, updateNote, deleteNote,
    addJournalEntry, updateJournalEntry, deleteJournalEntry,
    refresh: fetchAll
  };
}
