import { DayHeader, TaskList, ResourceList, PomodoroTimer, TiptapJournalEditor, NotesPrompt } from ".";

export default function DayViewPage({ day, weekId, phaseId }) {
  // day: { day, topic, tasks, resources, notes_prompt }
  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <DayHeader day={day} weekId={weekId} phaseId={phaseId} />
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <TaskList tasks={day.tasks || []} />
          <ResourceList resources={day.resources || []} />
          <NotesPrompt prompt={day.notes_prompt} />
        </div>
        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <PomodoroTimer />
          <TiptapJournalEditor onSave={(content) => alert("Saved!\n" + content)} />
        </div>
      </div>
    </div>
  );
}