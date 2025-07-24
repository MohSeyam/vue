import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getJournalEntries, updateJournalEntry, deleteJournalEntry } from "../services/dbService";
import { FaBookOpen, FaEdit, FaTrash, FaTag } from "react-icons/fa";
import { Dialog } from "../components/ui/Dialog";
import { useApp } from "../context/AppContext";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

export default function Blog() {
  const { t, i18n } = useTranslation();
  const { lang, planData } = useApp();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editContent, setEditContent] = useState("");

  // Tiptap editor for editing
  const editEditor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link,
      Placeholder.configure({
        placeholder: t("blogPlaceholder", "اكتب نص التدوينة...")
      })
    ],
    content: editContent,
    editorProps: {
      attributes: {
        class: `min-h-[100px] w-full rounded border p-2 bg-white/80 dark:bg-zinc-900 text-gray-800 dark:text-gray-100 focus:outline-none ${i18n.language === "ar" ? "text-right" : "text-left"}`,
        dir: i18n.language === "ar" ? "rtl" : "ltr"
      }
    },
    onUpdate: ({ editor }) => setEditContent(editor.getHTML())
  });

  function openEdit(entry) {
    setEditing(entry);
    setEditTitle(entry.title || "");
    setEditTags(Array.isArray(entry.tags) ? entry.tags.join(", ") : (entry.tags || ""));
    setEditContent(entry.content || "");
    setTimeout(() => {
      if (editEditor) editEditor.commands.setContent(entry.content || "");
    }, 0);
  }

  async function saveEdit() {
    if (!editing) return;
    await updateJournalEntry(editing.id, {
      title: editTitle,
      tags: editTags,
      content: editContent,
    });
    setEditing(null);
    setExpanded({ ...editing, title: editTitle, tags: editTags, content: editContent });
    console.log('After save, expanded:', { ...editing, title: editTitle, tags: editTags, content: editContent });
    fetchEntries();
  }

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
    <div className="max-w-4xl mx-auto py-8 px-2" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        <FaBookOpen className="inline w-9 h-9 text-emerald-400" />
        {t("blogTitle", "المدونة")}
      </h1>
      <div>
        {loading ? (
          <div className="text-center text-gray-400">{t("loading", "جاري التحميل...")}</div>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center text-gray-400">
            <FaBookOpen className="w-24 h-24 mb-4 text-emerald-200 dark:text-emerald-900" />
            <div className="text-xl font-bold mb-2">لا توجد تدوينات</div>
            <div className="text-base">ابدأ بكتابة تدويناتك أثناء الدراسة وستظهر هنا تلقائيًا.</div>
          </div>
        ) : (
          <div className="grid gap-4 min-h-[60vh]">
            {entries.map(entry => (
              <div
                key={entry.id}
                className="rounded-2xl shadow-lg bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-5 flex flex-col gap-2 hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => setExpanded(entry)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg text-emerald-900 dark:text-emerald-200">{entry.title || t("untitled", "(بدون عنوان)")}</span>
                  {Array.isArray(entry.tags) && entry.tags.length > 0 && entry.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs ml-1 flex items-center gap-1"><FaTag />{tag}</span>
                  ))}
                  {typeof entry.tags === "string" && entry.tags.trim() && entry.tags.split(",").map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs ml-1 flex items-center gap-1"><FaTag />{tag.trim()}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span className="font-bold text-emerald-700">
                    {getDayTitle(entry) ? getDayTitle(entry) : t("unknownDay", "يوم غير معروف")}
                  </span>
                  <span>|</span>
                  <span>{new Date(entry.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 mb-2" dangerouslySetInnerHTML={{ __html: entry.content?.slice(0, 120) + (entry.content?.length > 120 ? "..." : "") }} />
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 text-xs rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1 transition"
                    onClick={e => { e.stopPropagation(); setExpanded(entry); }}
                    aria-label={t("expand", "عرض كامل")}
                  >
                    <FaBookOpen />
                  </button>
                  <button
                    className="px-3 py-1 text-xs rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1 transition"
                    onClick={e => { e.stopPropagation(); openEdit(entry); }}
                    aria-label={t("edit", "تعديل")}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-1 text-xs rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center gap-1 transition"
                    onClick={e => { e.stopPropagation(); handleDelete(entry.id); }}
                    aria-label={t("delete", "حذف")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {expanded && (
          <Dialog open={!!expanded} onOpenChange={v => !v && setExpanded(null)}>
            <div className="p-4 max-w-lg flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-2xl text-light-text dark:text-dark-text flex items-center gap-2">
                  <FaBookOpen /> {expanded.title || t("untitled", "(بدون عنوان)")}
                </h2>
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-light-blue hover:bg-blue-200 text-white border border-light-blue flex items-center gap-1 transition font-bold"
                  onClick={() => openEdit(expanded)}
                  aria-label={t("edit", "تعديل")}
                >
                  <FaEdit /> تعديل
                </button>
              </div>
              <div
                className="prose prose-sm max-w-none mb-2 text-light-text dark:text-dark-text"
                style={{
                  color: 'inherit',
                  '--tw-prose-body': 'inherit',
                  '--tw-prose-headings': 'inherit',
                  '--tw-prose-links': 'inherit',
                  '--tw-prose-bold': 'inherit',
                  '--tw-prose-counters': 'inherit',
                  '--tw-prose-bullets': 'inherit',
                  '--tw-prose-hr': 'inherit',
                  '--tw-prose-quotes': 'inherit',
                  '--tw-prose-quote-borders': 'inherit',
                  '--tw-prose-captions': 'inherit',
                  '--tw-prose-code': 'inherit',
                  '--tw-prose-pre-code': 'inherit',
                  '--tw-prose-pre-bg': 'inherit',
                  '--tw-prose-th-borders': 'inherit',
                  '--tw-prose-td-borders': 'inherit',
                }}
                dangerouslySetInnerHTML={{ __html: expanded.content }}
              />
              {console.log('Expanded dialog render:', expanded)}
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(expanded.tags) && expanded.tags.length > 0 && expanded.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-full text-xs flex items-center gap-1"><FaTag />{tag}</span>
                ))}
                {typeof expanded.tags === "string" && expanded.tags.trim() && expanded.tags.split(",").map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-full text-xs flex items-center gap-1"><FaTag />{tag.trim()}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <span className="font-bold text-emerald-700">
                  {getDayTitle(expanded) ? getDayTitle(expanded) : t("unknownDay", "يوم غير معروف")}
                </span>
                <span>|</span>
                <span>{new Date(expanded.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center gap-1 transition"
                  onClick={() => { handleDelete(expanded.id); setExpanded(null); }}
                  aria-label={t("delete", "حذف")}
                >
                  <FaTrash /> حذف
                </button>
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 flex items-center gap-1 transition"
                  onClick={() => setExpanded(null)}
                  aria-label={t("close", "إغلاق")}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </Dialog>
        )}
        {editing && (
          <Dialog open={!!editing} onOpenChange={v => !v && setEditing(null)}>
            <div className="p-4 max-w-lg flex flex-col gap-2">
              <h2 className="font-bold text-lg mb-2">{t("editBlogEntry", "تعديل التدوينة")}</h2>
              <input className="w-full mb-2 p-2 rounded border" value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="العنوان..." />
              <input className="w-full mb-2 p-2 rounded border" value={editTags} onChange={e => setEditTags(e.target.value)} placeholder="تاجات (افصل بينها بفاصلة)" />
              <TiptapToolbar editor={editEditor} lang={lang} />
              <EditorContent editor={editEditor} />
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 text-xs rounded-lg bg-light-blue hover:bg-blue-200 text-white border border-light-blue flex items-center gap-1 transition" onClick={saveEdit}><FaEdit /> {t("save", "حفظ")}</button>
                <button className="px-3 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 flex items-center gap-1 transition" onClick={() => setEditing(null)}>{t("close", "إغلاق")}</button>
              </div>
            </div>
          </Dialog>
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
