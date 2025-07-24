import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getJournalEntries, updateJournalEntry, deleteJournalEntry } from "../services/dbService";
import { FaBookOpen } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

export default function Journal() {
  const { t, i18n } = useTranslation();
  const { lang, planData } = useApp();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    setEntries(await getJournalEntries());
    setLoading(false);
  }

  async function handleDelete(id) {
    await deleteJournalEntry(id);
    fetchEntries();
  }

  // Helper to get day title from planData
  function getDayTitle(entry) {
    if (!planData || !entry.week || !entry.dayKey) return null;
    const week = planData.find(w => String(w.week) === String(entry.week));
    const day = week?.days?.find(d => d.key === entry.dayKey);
    return day?.day?.[lang] || day?.day?.ar || day?.day?.en || null;
  }

  return (
    <div className="max-w-2xl mx-auto py-8" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-6 text-center text-emerald-700 flex items-center justify-center gap-2">
        <FaBookOpen className="inline w-8 h-8 text-emerald-400" />
        {t("journalTitle", "اليوميات")}
      </h1>
      <div>
        {loading ? (
          <div className="text-center text-gray-400">{t("loading", "جاري التحميل...")}</div>
        ) : entries.length === 0 ? (
          <div className="text-center text-gray-400">{t("noJournalEntries", "لا توجد تدوينات بعد.")}</div>
        ) : (
          <ul className="space-y-4">
            {entries.map(entry => (
              <li key={entry.id} className="rounded border p-3 bg-white dark:bg-zinc-900 shadow flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span className="font-bold text-emerald-700">
                    {getDayTitle(entry) ? getDayTitle(entry) : t("unknownDay", "يوم غير معروف")}
                  </span>
                  <span>|</span>
                  <span>{new Date(entry.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span>
                </div>
                <div className="text-gray-800 dark:text-gray-100 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: entry.content }} />
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setEditing(entry)} className="text-xs text-emerald-700 hover:underline">{t("edit", "تعديل")}</button>
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

function TiptapToolbar({ editor, lang }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-1 mb-2 border-b pb-1">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold text-emerald-700' : ''}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic text-emerald-700' : ''}>I</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'line-through text-emerald-700' : ''}>S</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'font-bold text-lg text-emerald-700' : ''}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'font-bold text-emerald-700' : ''}>H2</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-emerald-700' : ''}>• قائمة</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'text-emerald-700' : ''}>1. قائمة</button>
      <button onClick={() => editor.chain().focus().setTextAlign(lang === 'ar' ? 'right' : 'left').run()} className="">{lang === 'ar' ? 'يمين' : 'Left'}</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="">وسط</button>
      <button onClick={() => editor.chain().focus().setTextAlign(lang === 'ar' ? 'left' : 'right').run()} className="">{lang === 'ar' ? 'يسار' : 'Right'}</button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="text-gray-400">مسح</button>
    </div>
  );
}
