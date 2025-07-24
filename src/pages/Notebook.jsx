// Notebook.jsx

import React, { useState, useMemo, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaTag, FaEdit, FaTrash, FaRegStickyNote } from "react-icons/fa";
import { Dialog } from "../components/ui/Dialog";

function extractAllNotes(appState, planData, lang) {
  const notes = [];
  for (const weekId in appState.notes) {
    const week = appState.notes[weekId];
    if (!week?.days) continue;
    week.days.forEach((dayNotes, dayIdx) => {
      if (!dayNotes) return;
      for (const taskId in dayNotes) {
        const note = dayNotes[taskId];
        // استخراج اليوم والمهمة المرتبطة
        const weekObj = planData.find(w => String(w.week) === String(weekId));
        const dayObj = weekObj?.days?.[dayIdx];
        const taskObj = dayObj?.tasks?.find(t => String(t.id) === String(taskId));
        notes.push({
          id: `${weekId}-${dayIdx}-${taskId}`,
          title: note.title || taskObj?.description?.[lang] || "(بدون عنوان)",
          tags: (note.keywords || "").split(",").map(t => t.trim()).filter(Boolean),
          content: note.content,
          weekId,
          dayIdx,
          dayTitle: dayObj?.day?.[lang] || dayObj?.day?.ar || dayObj?.day?.en,
          taskTitle: taskObj?.description?.[lang] || taskObj?.description?.ar || taskObj?.description?.en,
        });
      }
    });
  }
  return notes;
}

export default function Notebook() {
  const { appState, planData, lang, setAppState } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editTags, setEditTags] = useState("");

  const notes = useMemo(() => extractAllNotes(appState, planData, lang), [appState, planData, lang]);
  const allTags = useMemo(() => Array.from(new Set(notes.flatMap(n => n.tags))), [notes]);
  const filteredNotes = notes.filter(n =>
    (!selectedTag || n.tags.includes(selectedTag)) &&
    (n.title.includes(search) || n.content?.includes(search) || n.taskTitle?.includes(search))
  );

  function openEdit(note) {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditTags(note.tags.join(", "));
    setEditContent(note.content);
  }
  function saveEdit() {
    // تحديث الملاحظة في appState
    setAppState(prev => {
      const newState = { ...prev };
      const week = newState.notes[selectedNote.weekId];
      if (!week?.days?.[selectedNote.dayIdx]?.[selectedNote.id.split("-")[2]]) return prev;
      week.days[selectedNote.dayIdx][selectedNote.id.split("-")[2]] = {
        ...week.days[selectedNote.dayIdx][selectedNote.id.split("-")[2]],
        title: editTitle,
        keywords: editTags,
        content: editContent,
      };
      return newState;
    });
    setSelectedNote(null);
  }
  function deleteNote() {
    setAppState(prev => {
      const newState = { ...prev };
      const week = newState.notes[selectedNote.weekId];
      if (week?.days?.[selectedNote.dayIdx]?.[selectedNote.id.split("-")[2]]) {
        delete week.days[selectedNote.dayIdx][selectedNote.id.split("-")[2]];
      }
      return newState;
    });
    setSelectedNote(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold mb-6">دفتر الملاحظات</h1>
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          className="p-2 rounded border flex-1 min-w-[180px]"
          placeholder="بحث عن ملاحظة..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {allTags.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full border brutal-btn ${selectedTag === tag ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
          >
            <FaTag className="inline mr-1" /> {tag}
          </button>
        ))}
        {selectedTag && (
          <button className="ml-2 text-xs text-red-500 underline" onClick={() => setSelectedTag("")}>إزالة الفلتر</button>
        )}
      </div>
      <div className="grid gap-4 min-h-[60vh]">
        {filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center text-gray-400">
            <FaRegStickyNote className="w-24 h-24 mb-4 text-blue-200 dark:text-blue-900" />
            <div className="text-xl font-bold mb-2">لا توجد ملاحظات</div>
            <div className="text-base">ابدأ بإضافة ملاحظاتك أثناء الدراسة وستظهر هنا تلقائيًا.</div>
          </div>
        )}
        {filteredNotes.map(note => (
          <div key={note.id} className="rounded-2xl shadow-lg bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-5 flex flex-col gap-2 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-lg text-blue-900 dark:text-blue-200">{note.title}</span>
              {note.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs ml-1">{tag}</span>)}
            </div>
            <div className="text-xs text-gray-500 mb-1">{note.dayTitle} - {note.taskTitle}</div>
            <div className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 mb-2" dangerouslySetInnerHTML={{ __html: note.content?.slice(0, 120) + (note.content?.length > 120 ? "..." : "") }} />
            <div className="flex gap-2 mt-2">
              <button className="px-4 py-1 text-xs rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1 transition" onClick={() => openEdit(note)}><FaEdit /> تحرير</button>
              <button className="px-4 py-1 text-xs rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center gap-1 transition" onClick={() => { setSelectedNote(note); deleteNote(); }}><FaTrash /> حذف</button>
            </div>
          </div>
        ))}
      </div>
      {selectedNote && (
        <Dialog open={!!selectedNote} onOpenChange={v => !v && setSelectedNote(null)}>
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">تعديل الملاحظة</h2>
            <input className="w-full mb-2 p-2 rounded border" value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="العنوان..." />
            <input className="w-full mb-2 p-2 rounded border" value={editTags} onChange={e => setEditTags(e.target.value)} placeholder="تاجات (افصل بينها بفاصلة)" />
            <textarea className="w-full mb-2 p-2 rounded border min-h-[120px]" value={editContent} onChange={e => setEditContent(e.target.value)} placeholder="المحتوى..." />
            <div className="flex gap-2 mt-2">
              <button className="brutal-btn px-3 py-1 text-xs" onClick={saveEdit}><FaEdit /> حفظ</button>
              <button className="brutal-btn px-3 py-1 text-xs bg-red-100 text-red-600 border-red-400" onClick={deleteNote}><FaTrash /> حذف</button>
              <button className="brutal-btn px-3 py-1 text-xs" onClick={() => setSelectedNote(null)}>إغلاق</button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
