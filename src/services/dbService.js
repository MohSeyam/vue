// dbService.js
// العمود الفقري للتطبيق: جميع عمليات Dexie.js (IndexedDB) تتم من هنا فقط
import Dexie from "dexie";

// تعريف قاعدة البيانات والجداول
export const db = new Dexie("cyberPlanDB");
db.version(1).stores({
  plan: "++id, week, phase", // بيانات الخطة (مراحل، أسابيع)
  notes: "++id, title, tags, createdAt, updatedAt",
  journal: "++id, date, content, tags",
  settings: "key, value"
});

// --- دوال CRUD للخطة ---
export async function getPlan() {
  return await db.plan.toArray();
}
export async function savePlan(planArr) {
  await db.plan.clear();
  return await db.plan.bulkAdd(planArr);
}

// --- دوال CRUD للملاحظات ---
export async function getNotes() {
  return await db.notes.orderBy('updatedAt').reverse().toArray();
}
export async function addNote(note) {
  return await db.notes.add({ ...note, createdAt: Date.now(), updatedAt: Date.now() });
}
export async function updateNote(id, updates) {
  return await db.notes.update(id, { ...updates, updatedAt: Date.now() });
}
export async function deleteNote(id) {
  return await db.notes.delete(id);
}

// --- دوال CRUD لليوميات ---
export async function getJournalEntries() {
  return await db.journal.orderBy('date').reverse().toArray();
}
export async function addJournalEntry(entry) {
  return await db.journal.add({ ...entry, date: entry.date || Date.now() });
}
export async function updateJournalEntry(id, updates) {
  return await db.journal.update(id, updates);
}
export async function deleteJournalEntry(id) {
  return await db.journal.delete(id);
}

// --- إعدادات المستخدم ---
export async function getSetting(key) {
  return await db.settings.get(key);
}
export async function setSetting(key, value) {
  return await db.settings.put({ key, value });
}

// --- تصدير واستيراد البيانات (ملكية المستخدم) ---
export async function exportAllData() {
  const plan = await getPlan();
  const notes = await getNotes();
  const journal = await getJournalEntries();
  const settings = await db.settings.toArray();
  return { plan, notes, journal, settings };
}
export async function importAllData({ plan, notes, journal, settings }) {
  await db.transaction('rw', db.plan, db.notes, db.journal, db.settings, async () => {
    await db.plan.clear();
    await db.notes.clear();
    await db.journal.clear();
    await db.settings.clear();
    if (plan) await db.plan.bulkAdd(plan);
    if (notes) await db.notes.bulkAdd(notes);
    if (journal) await db.journal.bulkAdd(journal);
    if (settings) await db.settings.bulkAdd(settings);
  });
}
