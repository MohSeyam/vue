import React from "react";
import DayHeader from "./DayHeader";
import TaskList from "./TaskList";
import ResourceList from "./ResourceList";
import PomodoroTimer from "./PomodoroTimer";
import TiptapJournalEditor from "./TiptapJournalEditor";
import NotesPrompt from "./NotesPrompt";

export default function DayViewPage({ day, weekId, phaseId }) {
  // حماية ضد البيانات الناقصة
  if (!day || !weekId || !phaseId) {
    return <div className="text-center text-red-500 py-12">اليوم أو بيانات الأسبوع/المرحلة غير متوفرة أو هناك خطأ في البيانات.</div>;
  }
  try {
    return (
      <>
        <DayHeader day={day} weekId={weekId} phaseId={phaseId} />
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <TaskList tasks={day.tasks || []} weekId={weekId} dayKey={day.key} />
            <ResourceList resources={day.resources || []} />
          </div>
          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <PomodoroTimer />
            <TiptapJournalEditor onSave={(content) => alert("Saved!\n" + content)} dateKey={`${weekId}-${day.key}`} />
          </div>
        </div>
        {day.notes_prompt && (
          <div className="mt-8">
            <NotesPrompt prompt={day.notes_prompt} />
          </div>
        )}
      </>
    );
  } catch (err) {
    return <div className="text-center text-red-500 py-12">حدث خطأ أثناء عرض اليوم: {err.message}</div>;
  }
}