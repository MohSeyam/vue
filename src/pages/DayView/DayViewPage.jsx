import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import AccordionTaskCard from "./AccordionTaskCard";
import NotesPrompt from "./NotesPrompt";

// NoteEditor component
function NoteEditor({ note, taskDescription, onSave, onDelete }) {
    const { lang, translations, setModal, ReactQuill, setAppState, appState } = useContext(AppContext);
    const t = translations[lang];
    const [title, setTitle] = useState(note.title || '');
    const [content, setContent] = useState(note.content || '');
    const [keywords, setKeywords] = useState(note.keywords || '');

    const quillModules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link'],
        ['clean']
      ],
    };

    // حفظ الملاحظة فعليًا
    const handleSave = () => {
        onSave({ title, content, keywords });
        setModal({ isOpen: false, content: null });
    };
    // حذف الملاحظة فعليًا
    const handleDelete = () => {
        onDelete();
        setModal({ isOpen: false, content: null });
    };

    return (
        <>
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold">{t.editNote}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.noteOnTask} "{taskDescription}"</p>
            </div>
            <div className="p-6 flex-grow overflow-y-auto space-y-4">
                <div>
                    <label htmlFor="note-title-editor" className="block text-sm font-medium">{t.noteTitle}</label>
                    <input id="note-title-editor" type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md" />
                </div>
                <div>
                    <label htmlFor="note-keywords-editor" className="block text-sm font-medium">{t.keywords}</label>
                    <input id="note-keywords-editor" type="text" value={keywords} onChange={e => setKeywords(e.target.value)} className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t.noteContent}</label>
                    <div className="quill-container bg-white dark:bg-[#111]">
                        { ReactQuill ? (
                            <ReactQuill 
                                theme="snow" 
                                value={content} 
                                onChange={setContent}
                                modules={quillModules}
                            />
                          ) : (
                            <textarea
                                className="w-full h-48 p-2 border rounded bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Loading editor..."
                            />
                          )
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800/50 rounded-b-lg">
                <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md">{t.deleteNote}</button>
                <div className="flex gap-2">
                    <button onClick={() => setModal({isOpen: false, content: null})} className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">{t.cancel}</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">{t.saveNote}</button>
                </div>
            </div>
        </>
    );
}

// ResourcesSection component
function ResourcesSection({ weekId, dayIndex }) {
    const { lang, appState, setAppState, setModal, translations, Icons } = useContext(AppContext);
    const t = translations[lang];
    const resources = appState.resources[weekId]?.days[dayIndex] || [];
    // دالة لفتح نافذة تعديل أو إضافة مرجع
    const openResourceModal = (resource, index) => {
        setModal({
            isOpen: true,
            content: <ResourceEditorModal resource={resource} index={index} weekId={weekId} dayIndex={dayIndex} />
        });
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold">{t.suggestedResources}</h4>
                <button onClick={() => openResourceModal(null, null)} className="text-sm font-medium text-blue-600 hover:underline">{t.addResource}</button>
            </div>
            <div className="space-y-2">
                {resources.map((res, index) => (
                    <div key={index} className="flex items-center group">
                        <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors flex-grow min-w-0">
                            <span className="w-6 h-6 me-3 text-gray-500 dark:text-gray-400">{Icons.resource(res.type)}</span>
                            <span className="text-blue-600 dark:text-blue-400 hover:underline truncate">{res.title}</span>
                        </a>
                        <button onClick={() => openResourceModal(res, index)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icons.edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ResourceEditorModal component (placeholder for actual ResourceEditor UI)
function ResourceEditorModal({ resource, index, weekId, dayIndex }) {
    const { lang, setAppState, appState, setModal, translations } = useContext(AppContext);
    const t = translations[lang];
    const [title, setTitle] = useState(resource?.title || '');
    const [url, setUrl] = useState(resource?.url || '');
    const [type, setType] = useState(resource?.type || 'link');
    // حفظ أو تعديل مرجع
    const handleSave = () => {
        setAppState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const arr = newState.resources[weekId]?.days[dayIndex] || [];
            if (index === null || index === undefined) {
                arr.push({ title, url, type });
            } else {
                arr[index] = { title, url, type };
            }
            if (!newState.resources[weekId]) newState.resources[weekId] = { days: [] };
            newState.resources[weekId].days[dayIndex] = arr;
            return newState;
        });
        setModal({ isOpen: false, content: null });
    };
    // حذف مرجع
    const handleDelete = () => {
        setAppState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const arr = newState.resources[weekId]?.days[dayIndex] || [];
            if (index !== null && index !== undefined) arr.splice(index, 1);
            newState.resources[weekId].days[dayIndex] = arr;
            return newState;
        });
        setModal({ isOpen: false, content: null });
    };
    return (
        <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-2">{t.editResource}</h3>
            <div>
                <label className="block text-sm font-medium mb-1">{t.resourceTitle}</label>
                <input className="w-full p-2 rounded border" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">{t.resourceUrl}</label>
                <input className="w-full p-2 rounded border" value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">{t.resourceType}</label>
                <select className="w-full p-2 rounded border" value={type} onChange={e => setType(e.target.value)}>
                    <option value="video">{t.video}</option>
                    <option value="article">{t.article}</option>
                    <option value="link">{t.link}</option>
                </select>
            </div>
            <div className="flex gap-2 mt-4">
                <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md">{t.deleteResource}</button>
                <button onClick={() => setModal({ isOpen: false, content: null })} className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">{t.cancel}</button>
                <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">{t.saveResource}</button>
            </div>
        </div>
    );
}

// DayView main component
export default function DayViewPage(props) {
    const ctx = useContext(AppContext);
    const { planData, lang, appState, setAppState, translations, Icons, setModal } = ctx || {};
    const params = useParams();
    const weekId = props.weekId || params.weekId;
    const dayKey = props.dayKey || params.dayKey;
    if (!planData) return <div className="text-center text-red-500 py-12">الخطة غير محملة (planData not loaded)</div>;
    if (!weekId || !dayKey) return <div className="text-center text-red-500 py-12">weekId أو dayKey مفقود</div>;
    if (!props.day) return <div className="text-center text-red-500 py-12">اليوم غير موجود (day prop مفقود)</div>;
    if (!appState) return <div>appState not loaded</div>;
    if (!Icons) return <div>Icons not loaded</div>;
    if (!translations) return <div>translations not loaded</div>;
    if (!setModal) return <div>setModal not loaded</div>;
    if (!setAppState) return <div>setAppState not loaded</div>;
    const t = translations[lang];
    const weekData = planData.find(w => String(w.week) === String(weekId));
    if (!weekData) return <div>Week not found: {weekId}</div>;
    console.log('weekData.days:', weekData.days);
    console.log('dayKey:', dayKey, typeof dayKey);
    console.log('all day keys:', weekData.days?.map(d => d.key));
    const dayData = weekData.days?.find(d => String(d.key).toLowerCase() === String(dayKey).toLowerCase());
    const dayIndex = weekData.days?.findIndex(d => String(d.key).toLowerCase() === String(dayKey).toLowerCase());
    if (!dayData || dayIndex === -1) return <div>Day not found: {dayKey}</div>;

    // دالة لتغيير حالة المهمة بين مكتملة وغير مكتملة
    const handleTaskToggle = (taskIndex) => {
        setAppState(prevState => {
            const newState = JSON.parse(JSON.stringify(prevState));
            const currentStatus = newState.progress[weekId]?.days[dayIndex].tasks[taskIndex];
            newState.progress[weekId].days[dayIndex].tasks[taskIndex] = currentStatus === 'completed' ? 'pending' : 'completed';
            return newState;
        });
    };
    // دالة لفتح نافذة تعديل الملاحظات
    const openNoteModal = (taskId, taskDescription) => {
        const note = appState.notes[weekId]?.days[dayIndex]?.[taskId] || { title: '', content: '', keywords: '' };
        setModal({
            isOpen: true,
            content: <NoteEditor 
                        note={note} 
                        taskDescription={taskDescription}
                        onSave={(newNoteData) => {
                            setAppState(prev => {
                                const newState = JSON.parse(JSON.stringify(prev));
                                if (!newState.notes[weekId]) newState.notes[weekId] = { days: [] };
                                if (!newState.notes[weekId].days[dayIndex]) newState.notes[weekId].days[dayIndex] = {};
                                newState.notes[weekId].days[dayIndex][taskId] = newNoteData;
                                return newState;
                            });
                        }}
                        onDelete={() => {
                            setAppState(prev => {
                                const newState = JSON.parse(JSON.stringify(prev));
                                if (newState.notes[weekId]?.days[dayIndex]?.[taskId]) {
                                    delete newState.notes[weekId].days[dayIndex][taskId];
                                }
                                return newState;
                            });
                        }}
                    />
        });
    };
    return (
        <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text font-tajawal rounded-xl shadow-lg p-6 border border-light-border dark:border-dark-border animate-fade-in">
            <h1 className="text-3xl font-bold text-light-accent dark:text-dark-accent">{dayData.day[lang]}: {dayData.topic[lang]}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                <div className="lg:col-span-2 space-y-8">
                    {/* قسم المهام */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 text-light-text dark:text-dark-text">{t.activeTasks}</h4>
                        <div className="space-y-3">
                            {dayData.tasks.map((task, taskIndex) => {
                              // تحديد الأيقونة واللون حسب نوع المهمة
                              let typeIcon = Icons.task(task.type);
                              let typeColor = '#00B8D9';
                              if (task.type === 'Red Team') typeColor = '#FF5252';
                              if (task.type === 'Blue Team') typeColor = '#40C4FF';
                              if (task.type === 'Soft Skills') typeColor = '#FFD700';
                              if (task.type === 'Policies') typeColor = '#AE81FF';
                              if (task.type === 'Practical') typeColor = '#00B8D9';
                              // ملاحظة المهمة (من state)
                              const noteContent = appState.notes[weekId]?.days[dayIndex]?.[task.id]?.content || "";
                              const dateKey = `${weekId}-${dayKey}-${task.id}`;
                              const handleSaveNote = (content) => {
                                setAppState(prev => {
                                  const newState = JSON.parse(JSON.stringify(prev));
                                  if (!newState.notes[weekId]) newState.notes[weekId] = { days: [] };
                                  if (!newState.notes[weekId].days[dayIndex]) newState.notes[weekId].days[dayIndex] = {};
                                  if (!newState.notes[weekId].days[dayIndex][task.id]) newState.notes[weekId].days[dayIndex][task.id] = {};
                                  newState.notes[weekId].days[dayIndex][task.id].content = content;
                                  return newState;
                                });
                              };
                              // مراجع المهمة (من state)
                              const taskResources = (appState.resources?.[weekId]?.days?.[dayIndex]?.[task.id]) || [];
                              const handleResourcesChange = (newResources) => {
                                setAppState(prev => {
                                  const newState = JSON.parse(JSON.stringify(prev));
                                  if (!newState.resources) newState.resources = {};
                                  if (!newState.resources[weekId]) newState.resources[weekId] = { days: [] };
                                  if (!newState.resources[weekId].days[dayIndex]) newState.resources[weekId].days[dayIndex] = {};
                                  newState.resources[weekId].days[dayIndex][task.id] = newResources;
                                  return newState;
                                });
                              };
                              return (
                                <AccordionTaskCard
                                  key={task.id}
                                  task={{
                                    title: task.description[lang],
                                    type: task.type,
                                  }}
                                  checked={appState.progress[weekId]?.days[dayIndex]?.tasks[taskIndex] === 'completed'}
                                  onToggle={() => handleTaskToggle(taskIndex)}
                                  onEditNote={() => openNoteModal(task.id, task.description[lang])}
                                  typeIcon={typeIcon}
                                  typeColor={typeColor}
                                  duration={`${task.duration} ${t.minutes}`}
                                  lang={lang}
                                  description={task.details?.[lang] || ''}
                                  resources={taskResources}
                                  onResourcesChange={handleResourcesChange}
                                  noteContent={noteContent}
                                  onSaveNote={handleSaveNote}
                                  dateKey={dateKey}
                                />
                              );
                            })}
                        </div>
                    </div>
                    {/* قسم المراجع */}
                    <ResourcesSection weekId={weekId} dayIndex={dayIndex} />
                </div>
                {/* قسم مهمة التدوين المسائية */}
                {dayData.notes_prompt && dayData.notes_prompt.points.length > 0 && (
                  <div className="lg:col-span-1">
                    <div className="card sticky top-8">
                      <NotesPrompt prompt={dayData.notes_prompt} />
                      <TiptapJournalEditor
                        onSave={content => {
                          setAppState(prev => {
                            const newState = JSON.parse(JSON.stringify(prev));
                            if (!newState.journal) newState.journal = {};
                            if (!newState.journal[weekId]) newState.journal[weekId] = {};
                            newState.journal[weekId][dayKey] = content;
                            return newState;
                          });
                        }}
                        dateKey={`${weekId}-${dayKey}`}
                        initialContent={appState.journal?.[weekId]?.[dayKey] || ""}
                      />
                    </div>
                  </div>
                )}
            </div>
        </div>
    );
}