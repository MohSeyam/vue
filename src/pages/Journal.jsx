import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getJournalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } from "../services/dbService";
import { useApp } from "../context/AppContext";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

export default function Journal() {
  const { t, i18n } = useTranslation();
  const { lang } = useApp();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link,
      Placeholder.configure({
        placeholder: t("journalPlaceholder", "اكتب تدوينتك هنا...")
      })
    ],
    content: "",
    editorProps: {
      attributes: {
        class: `min-h-[100px] w-full rounded border p-2 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 focus:outline-none ${i18n.language === "ar" ? "text-right" : "text-left"}`,
        dir: i18n.language === "ar" ? "rtl" : "ltr"
      }
    }
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (editor && editing) {
      editor.commands.setContent(editing.content || "");
    } else if (editor && !editing) {
      editor.commands.setContent("");
    }
  }, [editing, editor]);

  async function fetchEntries() {
    setLoading(true);
    setEntries(await getJournalEntries());
    setLoading(false);
  }

  async function handleSave() {
    const html = editor.getHTML();
    if (editing) {
      await updateJournalEntry(editing.id, { content: html });
    } else {
      await addJournalEntry({ content: html, date: Date.now() });
    }
    setEditing(null);
    editor.commands.setContent("");
    fetchEntries();
  }

  async function handleDelete(id) {
    await deleteJournalEntry(id);
    fetchEntries();
  }

  function startEdit(entry) {
    setEditing(entry);
    // سيتم ضبط المحتوى عبر useEffect
  }

  return (
    <div className="max-w-2xl mx-auto py-8" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-6 text-center text-emerald-700">{t("journalTitle", "اليوميات")}</h1>
      <div className="mb-6">
        <TiptapToolbar editor={editor} lang={lang} />
        <EditorContent editor={editor} />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="px-4 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
            disabled={!editor || editor.isEmpty}
          >{editing ? t("update", "تحديث") : t("add", "إضافة")}</button>
          {editing && (
            <button onClick={() => { setEditing(null); editor.commands.setContent(""); }} className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200">{t("cancel", "إلغاء")}</button>
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
                <div className="text-gray-800 dark:text-gray-100 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: entry.content }} />
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
