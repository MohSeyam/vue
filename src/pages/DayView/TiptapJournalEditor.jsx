import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useApp } from "../../context/AppContext";

function TiptapToolbar({ editor, lang }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-1 mb-2 border-b pb-1">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold text-violet-700' : ''}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic text-violet-700' : ''}>I</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'line-through text-violet-700' : ''}>S</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'font-bold text-lg text-violet-700' : ''}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'font-bold text-violet-700' : ''}>H2</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-violet-700' : ''}>•</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'text-violet-700' : ''}>1.</button>
      <button onClick={() => editor.chain().focus().setTextAlign(lang === 'ar' ? 'right' : 'left').run()}>{lang === 'ar' ? 'يمين' : 'Left'}</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>وسط</button>
      <button onClick={() => editor.chain().focus().setTextAlign(lang === 'ar' ? 'left' : 'right').run()}>{lang === 'ar' ? 'يسار' : 'Right'}</button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="text-gray-400">مسح</button>
    </div>
  );
}

export default function TiptapJournalEditor({ onSave }) {
  const { lang } = useApp();
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link,
      Placeholder.configure({
        placeholder: t("journalPlaceholder", "اكتب تدوينك هنا...")
      })
    ],
    content: "",
    editorProps: {
      attributes: {
        class: `min-h-[100px] w-full rounded border p-2 bg-white/80 dark:bg-zinc-900 text-gray-800 dark:text-gray-100 focus:outline-none ${i18n.language === "ar" ? "text-right" : "text-left"}`,
        dir: i18n.language === "ar" ? "rtl" : "ltr"
      }
    },
    onUpdate: ({ editor }) => setContent(editor.getHTML())
  });
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 shadow p-4 flex flex-col">
      <span className="font-bold text-lg text-violet-700 dark:text-violet-400 mb-2">{t("eveningJournal", "التدوين المسائي")}</span>
      <TiptapToolbar editor={editor} lang={lang} />
      <EditorContent editor={editor} />
      <button
        className="mt-3 px-4 py-1 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700 transition self-end"
        onClick={() => onSave?.(content)}
        disabled={!editor || editor.isEmpty}
      >{t("save", "حفظ")}</button>
    </div>
  );
}