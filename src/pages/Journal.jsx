import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getJournalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } from "../services/dbService";
import { useApp } from "../context/AppContext";

export default function Journal() {
  const { t, i18n } = useTranslation();
  const { lang } = useApp();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    setEntries(await getJournalEntries());
    setLoading(false);
  }

  async function handleSave() {
    if (editing) {
      await updateJournalEntry(editing.id, { content });
    } else {
      await addJournalEntry({ content, date: Date.now() });
    }
    setContent("");
    setEditing(null);
    fetchEntries();
  }

  async function handleDelete(id) {
    await deleteJournalEntry(id);
    fetchEntries();
  }

  function startEdit(entry) {
    setEditing(entry);
    setContent(entry.content);
  }

  return (
    <div className="max-w-2xl mx-auto py-8" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-6 text-center text-emerald-700">{t("journalTitle", "اليوميات")}</h1>
      <div className="mb-6">
        <textarea
          className="w-full rounded border p-2 min-h-[80px] bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
          placeholder={t("journalPlaceholder", "اكتب تدوينتك هنا...")}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="px-4 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
            disabled={!content.trim()}
          >{editing ? t("update", "تحديث") : t("add", "إضافة")}</button>
          {editing && (
            <button onClick={() => { setEditing(null); setContent(""); }} className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200">{t("cancel", "إلغاء")}</button>
          )}
        </div>
      </div>
      <div>
        {loading ? (
          <div className="text-center text-gray-400">{t("loading", "جاري التحميل...")}</div>
        ) : entries.length === 0 ? (
          <div className="text-center text-gray-400">{t("noJournalEntries", "لا توجد تدوينات بعد.")}</div>
        ) : (
          <ul className="space-y-4">
            {entries.map(entry => (
              <li key={entry.id} className="rounded border p-3 bg-white dark:bg-zinc-900 shadow flex flex-col gap-2">
                <div className="text-xs text-gray-500 mb-1">{new Date(entry.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</div>
                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">{entry.content}</div>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => startEdit(entry)} className="text-xs text-emerald-700 hover:underline">{t("edit", "تعديل")}</button>
                  <button onClick={() => handleDelete(entry.id)} className="text-xs text-red-600 hover:underline">{t("delete", "حذف")}</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
