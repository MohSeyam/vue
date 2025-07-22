import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, weekId, dayKey }) {
  if (!tasks || !tasks.length) return null;
  return (
    <div className="flex flex-col gap-3" role="list">
      {tasks.map((task, idx) => (
        <TaskItem key={task.id || idx} task={task} weekId={weekId} dayKey={dayKey} />
      ))}
    </div>
  );
}