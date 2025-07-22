// planStore.js
// Zustand store لإدارة حالة الخطة والتقدم والملاحظات
import { create } from "zustand";
import * as db from "../services/dbService";
import * as staticData from "../services/dataService";

export const usePlanStore = create((set, get) => ({
  // بيانات ثابتة
  phases: staticData.getPhases(),
  goals: staticData.getGoals(),
  resources: staticData.getResources(),

  // بيانات ديناميكية (من db)
  plan: [],
  notes: [],
  journal: [],
  loading: false,

  // تحميل كل البيانات من db
  fetchAll: async () => {
    set({ loading: true });
    const [plan, notes, journal] = await Promise.all([
      db.getPlan(),
      db.getNotes(),
      db.getJournalEntries()
    ]);
    set({ plan, notes, journal, loading: false });
  },

  // تحديث الخطة
  savePlan: async (planArr) => {
    await db.savePlan(planArr);
    set({ plan: await db.getPlan() });
  },

  // إدارة الملاحظات
  addNote: async (note) => {
    await db.addNote(note);
    set({ notes: await db.getNotes() });
  },
  updateNote: async (id, updates) => {
    await db.updateNote(id, updates);
    set({ notes: await db.getNotes() });
  },
  deleteNote: async (id) => {
    await db.deleteNote(id);
    set({ notes: await db.getNotes() });
  },

  // إدارة اليوميات
  addJournalEntry: async (entry) => {
    await db.addJournalEntry(entry);
    set({ journal: await db.getJournalEntries() });
  },
  updateJournalEntry: async (id, updates) => {
    await db.updateJournalEntry(id, updates);
    set({ journal: await db.getJournalEntries() });
  },
  deleteJournalEntry: async (id) => {
    await db.deleteJournalEntry(id);
    set({ journal: await db.getJournalEntries() });
  },

  // مزامنة/تحديث يدوي
  refresh: async () => {
    await get().fetchAll();
  },
}));