export interface Task {
  id: string;
  title: string;
  done: boolean;
}
export interface Day {
  id: string;
  date: string;
  tasks: Task[];
}
export interface Week {
  id: string;
  title: string;
  days: Day[];
}
export interface Phase {
  id: string;
  title: string;
  goal: string;
  weeks: Week[];
}