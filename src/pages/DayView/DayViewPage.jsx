import { DayHeader, TaskList, ResourceList, PomodoroTimer, TiptapJournalEditor, NotesPrompt } from ".";

export default function DayViewPage({ day, weekId, phaseId }) {
  // day: { day, topic, tasks, resources, notes_prompt }
  return (
    <>
      <DayHeader day={day} weekId={weekId} phaseId={phaseId} />
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <TaskList tasks={day.tasks || []} />
          <ResourceList resources={day.resources || []} />
        </div>
        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <PomodoroTimer />
          <TiptapJournalEditor onSave={(content) => alert("Saved!\n" + content)} />
        </div>
      </div>
      {day.notes_prompt && (
        <div className="mt-8">
          <NotesPrompt prompt={day.notes_prompt} />
        </div>
      )}
    </>
  );
}