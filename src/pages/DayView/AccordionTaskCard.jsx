import React, { useState } from "react";

export default function AccordionTaskCard({
  task,
  checked,
  onToggle,
  onEditNote,
  typeIcon,
  typeColor,
  duration,
  lang,
  description,
  resourcesSection,
  notesSection,
  pomodoroSection,
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card w-full mb-4 transition-all">
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
        <span className="font-bold flex-1 text-base" style={{ color: typeColor }}>{task.title}</span>
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
          {resourcesSection}
          {notesSection}
          {pomodoroSection}
        </div>
      )}
    </div>
  );
}