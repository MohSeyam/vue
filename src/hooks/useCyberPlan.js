// useCyberPlan.js
// الخطاف الرئيسي لجلب وإدارة بيانات الخطة والتقدم وحفظها
import { useEffect, useState, useCallback } from "react";
import * as db from "../services/dbService";

export function useCyberPlan() {
  const [plan, setPlan] = useState([]);
  const [notes, setNotes] = useState([]);
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب كل البيانات من القاعدة
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [planData, notesData, journalData] = await Promise.all([
      db.getPlan(),
      db.getNotes(),
      db.getJournalEntries()
    ]);
    // تهيئة كل مهمة بـ done: false إذا لم تكن موجودة
    const normalizedPlan = planData.map(week => ({
      ...week,
      days: (week.days || []).map(day => ({
        ...day,
        tasks: (day.tasks || []).map(task => ({
          ...task,
          done: typeof task.done === 'boolean' ? task.done : false
        }))
      }))
    }));
    setPlan(normalizedPlan);
    setNotes(notesData);
    setJournal(journalData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // تحديث الخطة
  const savePlan = async (planArr) => {
    await db.savePlan(planArr);
    setPlan(await db.getPlan());
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
    plan, notes, journal, loading,
    savePlan,
    addNote, updateNote, deleteNote,
    addJournalEntry, updateJournalEntry, deleteJournalEntry,
    refresh: fetchAll
  };
}
