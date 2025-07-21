export interface LocalizedString {
  en: string;
  ar: string;
  [key: string]: string;
}

export interface Resource {
  type: string;
  title: string;
  url: string;
}

export interface Task {
  id?: string;
  title: LocalizedString;
  done: boolean;
  type?: string;
  duration: number;
  description: LocalizedString;
}

export interface NotesPrompt {
  title: LocalizedString;
  points: LocalizedString[];
}

export interface Note {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  tags?: string[];
  taskId: string;
}

export interface Day {
  key: string;
  day: LocalizedString;
  date?: string;
  topic?: LocalizedString;
  tasks: Task[];
  resources?: Resource[];
  notes_prompt?: NotesPrompt;
}

export interface Week {
  id?: string;
  week?: number;
  phase?: number;
  title: LocalizedString;
  objective?: LocalizedString;
  days: Day[];
  resources?: Resource[];
  notes_prompt?: NotesPrompt;
}

export interface Phase {
  id?: string;
  title: LocalizedString;
  goal?: LocalizedString;
  weeks: Week[];
}