import React, { useState, Suspense, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaCheck, FaTimes, FaLink, FaBook, FaVideo, FaPodcast, FaShieldAlt, FaUserSecret, FaGavel, FaVial, FaHandsHelping } from "react-icons/fa";
import "./glassmorphism.css";

const resourceIcons = {
  video: <FaVideo />,
  article: <FaBook />,
  link: <FaLink />,
  book: <FaBook />,
  course: <FaVial />,
  podcast: <FaPodcast />,
  default: <FaLink />,
};
const sectionIcons = {
  "Blue Team": <FaShieldAlt />,
  "Red Team": <FaUserSecret />,
  "Policies": <FaGavel />,
  "Practical": <FaVial />,
  "Soft Skills": <FaHandsHelping />,
  default: <FaShieldAlt />,
};

const AccordionTaskCard = React.memo(function AccordionTaskCard({
  task, checked, onToggle, onEditNote, resources = [], onResourcesChange, noteContent, onSaveNote, dateKey, prompts
}) {
  const [expanded, setExpanded] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  return (
    <div className={`glass-card w-full mb-4 transition-all ${checked ? 'opacity-60' : ''}`}>
      <div className="flex items-center cursor-pointer" onClick={() => setExpanded(v => !v)}>
        <span className="brutal-btn mr-3" onClick={e => { e.stopPropagation(); onToggle(); }}>
          {checked ? <FaCheck /> : <FaTimes />}
        </span>
        <span className="section-icon mr-2">{sectionIcons[task.section] || sectionIcons.default}</span>
        <span className="font-bold flex-1 text-base text-light-text dark:text-dark-text">{task.title}</span>
        <span className="ml-2 text-xs text-gray-500">{task.duration} دقيقة</span>
        <span className="ml-2">{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <div className="mt-4 space-y-4">
          {/* المراجع */}
          <div>
            <h4 className="font-semibold mb-2">المراجع</h4>
            <ul>
              {resources.map((res, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>{resourceIcons[res.type] || resourceIcons.default}</span>
                  <a href={res.url} target="_blank" rel="noopener noreferrer">{res.title}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* محرر الملاحظة */}
          <div className="glass-card p-3">
            <button className="brutal-btn mb-2" onClick={() => setShowNoteEditor(v => !v)}>
              {showNoteEditor ? "إغلاق" : "تعديل الملاحظة"}
            </button>
            {showNoteEditor ? (
              <Suspense fallback={<div>جاري تحميل المحرر...</div>}>
                {/* محرر النصوص هنا */}
              </Suspense>
            ) : (
              <div>{noteContent}</div>
            )}
          </div>
          {/* مؤقت البومودورو */}
          <button className="brutal-btn mt-2">بدء مؤقت التركيز</button>
          {/* أسئلة التفكير (prompts) */}
          {prompts && prompts.length > 0 && (
            <div className="glass-card p-3 mt-2">
              <h4 className="font-semibold mb-2">للمساعدة على التفكير</h4>
              <ul className="text-sm text-gray-400 list-disc pl-5">
                {prompts.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
export default AccordionTaskCard;