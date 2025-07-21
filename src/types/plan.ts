export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Resource {
  type: string;
  title: string;
  url: string;
}

export interface Task {
  id: string;
  type: string;
  duration: number;
  description: LocalizedString;
}

export interface NotesPrompt {
  title: LocalizedString;
  points: LocalizedString[];
}

export interface Day {
  key: string;
  day: LocalizedString;
  topic: LocalizedString;
  tasks: Task[];
  resources: Resource[];
  notes_prompt: NotesPrompt;
}

export interface Week {
  week: number;
  phase: number;
  title: LocalizedString;
  objective: LocalizedString;
  days: Day[];
}