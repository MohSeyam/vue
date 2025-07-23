import React, { useState, Suspense } from "react";
import PomodoroTimer from "./PomodoroTimer";

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

const AccordionTaskCard = React.memo(function AccordionTaskCard({
  task,
  checked,
  onToggle,
  onEditNote,
  typeIcon,
  typeColor,
  duration,
  lang,
  description,
  resources = [],
  onResourcesChange,
  noteContent,
  onSaveNote,
  dateKey,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [localResources, setLocalResources] = useState(resources);
  const [resourceEditIdx, setResourceEditIdx] = useState(null);
  const [resourceEdit, setResourceEdit] = useState({ title: '', url: '', type: 'link' });
  const [resourceError, setResourceError] = useState('');

  function handleAddResource() {
    setResourceEdit({ title: '', url: '', type: 'link' });
    setResourceEditIdx(localResources.length);
  }
  function handleEditResource(idx) {
    setResourceEdit(localResources[idx]);
    setResourceEditIdx(idx);
  }
  function handleSaveResource() {
    if (!resourceEdit.title.trim() || !resourceEdit.url.trim()) {
      setResourceError('العنوان والرابط مطلوبان');
      return;
    }
    if (!isValidUrl(resourceEdit.url)) {
      setResourceError('الرابط غير صحيح');
      return;
    }
    setResourceError('');
    const updated = [...localResources];
    updated[resourceEditIdx] = { ...resourceEdit };
    setLocalResources(updated);
    setResourceEditIdx(null);
    setResourceEdit({ title: '', url: '', type: 'link' });
    onResourcesChange?.(updated);
  }
  function handleDeleteResource(idx) {
    const updated = localResources.filter((_, i) => i !== idx);
    setLocalResources(updated);
    onResourcesChange?.(updated);
  }

  return (
    <div className="card w-full mb-4 transition-all bg-light-card border border-light-border dark:bg-dark-card dark:border-dark-border">
      {/* الحالة المصغرة */}
      <div className="flex items-center cursor-pointer" onClick={() => setExpanded((v) => !v)}>
        <span
          className={`w-5 h-5 flex items-center justify-center border-2 rounded-md mr-3 ${checked ? `bg-[${typeColor}] border-[${typeColor}]` : "border-gray-300 bg-white"}`}
          onClick={e => { e.stopPropagation(); onToggle(); }}
        >
          {checked && (
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8.5l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </span>
        <span className="font-bold flex-1 text-base text-light-text dark:text-dark-text">{task.title}</span>
        <span className="ml-2 flex items-center" title={task.type} style={{ color: typeColor }}>{typeIcon}</span>
        <span className="ml-2 text-xs text-gray-500">{duration}</span>
        <span className="ml-2">
          <svg className={`w-5 h-5 transition-transform ${expanded ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </span>
      </div>
      {/* الحالة الموسعة */}
      {expanded && (
        <div className="mt-4 space-y-4">
          <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">{description}</div>
          {/* قسم المراجع الخاص بالمهمة */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-blue-700 dark:text-blue-300">المراجع</span>
              <button className="btn-secondary text-xs py-1 px-3" onClick={e => { e.stopPropagation(); handleAddResource(); }}>إضافة مرجع</button>
            </div>
            <ul className="space-y-2">
              {localResources.map((res, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm py-1">
                  <span className="text-lg">{res.type === 'video' ? '🎬' : res.type === 'article' ? '📄' : '🔗'}</span>
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-sky-400 font-medium" aria-label={res.title}>{res.title}</a>
                  <button className="ml-2 text-slate-400 hover:text-blue-600" title="تعديل المرجع" onClick={e => { e.stopPropagation(); handleEditResource(idx); }}><i className="i-lucide-pencil" /></button>
                  <button className="ml-1 text-red-500 hover:text-red-700" title="حذف المرجع" onClick={e => { e.stopPropagation(); handleDeleteResource(idx); }}><i className="i-lucide-trash" /></button>
                </li>
              ))}
              {resourceEditIdx !== null && (
                <li className="flex items-center gap-2 text-sm py-1">
                  <select className="rounded border px-2 py-1" value={resourceEdit.type} onChange={e => setResourceEdit({ ...resourceEdit, type: e.target.value })}>
                    <option value="video">فيديو</option>
                    <option value="article">مقالة</option>
                    <option value="link">رابط</option>
                  </select>
                  <input className="rounded border px-2 py-1 flex-1" value={resourceEdit.title} onChange={e => setResourceEdit({ ...resourceEdit, title: e.target.value })} placeholder="العنوان" />
                  <input className="rounded border px-2 py-1 flex-1" value={resourceEdit.url} onChange={e => setResourceEdit({ ...resourceEdit, url: e.target.value })} placeholder="الرابط" />
                  <button className="ml-2 text-green-600" onClick={e => { e.stopPropagation(); handleSaveResource(); }}><i className="i-lucide-check" /></button>
                  <button className="ml-1 text-slate-400" onClick={e => { e.stopPropagation(); setResourceEditIdx(null); setResourceError(''); }}><i className="i-lucide-x" /></button>
                  {resourceError && <span className="text-xs text-red-500 ml-2">{resourceError}</span>}
                </li>
              )}
            </ul>
          </div>
          {/* قسم الملاحظات */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-violet-700 dark:text-violet-400">ملاحظاتي</span>
              <button className="btn-secondary text-xs py-1 px-3" onClick={() => setShowNoteEditor(v => !v)}>
                {showNoteEditor ? "إغلاق" : "تعديل الملاحظة"}
              </button>
            </div>
            {showNoteEditor && (
              <Suspense fallback={<div className="text-center text-slate-400 py-4">جاري تحميل المحرر...</div>}>
                <TiptapJournalEditor
                  onSave={data => {
                    onSaveNote(data.content || "");
                    setShowNoteEditor(false);
                  }}
                  dateKey={dateKey}
                  initialContent={noteContent}
                />
              </Suspense>
            )}
            {!showNoteEditor && noteContent && (
              <div className="prose prose-sm max-w-none bg-white/80 dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 rounded p-2 mt-2" dangerouslySetInnerHTML={{ __html: noteContent }} />
            )}
          </div>
          <PomodoroTimer initialMinutes={parseInt(duration)} />
        </div>
      )}
    </div>
  );
});
export default AccordionTaskCard;