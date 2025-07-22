import DayHeader from "./DayHeader";
import TaskList from "./TaskList";
import ResourceList from "./ResourceList";
import PomodoroTimer from "./PomodoroTimer";
import TiptapJournalEditor from "./TiptapJournalEditor";
import NotesPrompt from "./NotesPrompt";

export default function DayViewPage({ day, weekId, phaseId }) {
  // day: { day, topic, tasks, resources, notes_prompt, key }
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
}