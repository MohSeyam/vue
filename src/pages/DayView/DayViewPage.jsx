import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

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
export default function DayView({ weekId, dayKey }) {
    const { lang, appState, setAppState, planData, translations, Icons, setModal } = useContext(AppContext);
    const t = translations[lang];
    const weekData = planData.find(w => w.week === weekId);
    const dayData = weekData?.days.find(d => d.key === dayKey);
    const dayIndex = weekData ? weekData.days.findIndex(d => d.key === dayKey) : -1;

    if (!dayData || dayIndex === -1) return <div>Day not found.</div>;

    // دالة لتغيير حالة المهمة بين مكتملة وغير مكتملة
    const handleTaskToggle = (taskIndex) => {
        setAppState(prevState => {
            const newState = JSON.parse(JSON.stringify(prevState));
            const currentStatus = newState.progress[weekId].days[dayIndex].tasks[taskIndex];
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
        <div className="bg-white dark:bg-[#111] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 animate-fade-in">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{dayData.day[lang]}: {dayData.topic[lang]}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                <div className="lg:col-span-2 space-y-8">
                    {/* قسم المهام */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">{t.activeTasks}</h4>
                        <div className="space-y-3">
                            {dayData.tasks.map((task, taskIndex) => (
                                <div key={task.id} className={`flex items-start p-3 rounded-lg transition-colors ${appState.progress[weekId]?.days[dayIndex]?.tasks[taskIndex] === 'completed' ? 'opacity-60' : ''}`}>
                                    <input type="checkbox" id={`task-${task.id}`} className="hidden"
                                        checked={appState.progress[weekId]?.days[dayIndex]?.tasks[taskIndex] === 'completed'}
                                        onChange={() => handleTaskToggle(taskIndex)}
                                    />
                                    <label htmlFor={`task-${task.id}`} className="flex items-start cursor-pointer w-full">
                                        <span className={`w-5 h-5 mt-1 ${lang === 'ar' ? 'ml-4' : 'mr-4'} inline-block border-2 border-gray-300 dark:border-gray-600 rounded-md flex-shrink-0 relative ${appState.progress[weekId]?.days[dayIndex]?.tasks[taskIndex] === 'completed' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                            {appState.progress[weekId]?.days[dayIndex]?.tasks[taskIndex] === 'completed' && <Icons.check className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                        </span>
                                        <div className="flex-grow">
                                            <p className={`text-gray-800 dark:text-gray-200 ${appState.progress[weekId]?.days[dayIndex]?.tasks[taskIndex] === 'completed' ? 'line-through' : ''}`}>{task.description[lang]}</p>
                                            <div className="flex items-center mt-2 space-x-3 rtl:space-x-reverse">
                                                <span className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1.5">{Icons.task(task.type)} {task.type}</span>
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                                    <Icons.clock className="w-4 h-4 me-1" />
                                                    <span>{task.duration} {t.minutes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    <button onClick={() => openNoteModal(task.id, task.description[lang])} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        <Icons.edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* قسم المراجع */}
                    <ResourcesSection weekId={weekId} dayIndex={dayIndex} />
                </div>
                {/* قسم مهمة التدوين المسائية */}
                {dayData.notes_prompt && dayData.notes_prompt.points.length > 0 && (
                     <div className="lg:col-span-1">
                        <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg sticky top-8 border border-gray-200 dark:border-gray-800">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{t.eveningJournaling}</h4>
                            <ul className="space-y-3 list-disc list-inside text-gray-600 dark:text-gray-400">
                                {dayData.notes_prompt.points.map((point, index) => <li key={index}>{point[lang]}</li>)}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}