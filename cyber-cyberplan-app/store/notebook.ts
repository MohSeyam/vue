import { defineStore } from 'pinia';

export interface Note {
  id: string;
  title: string;
  content: string;
  keywords?: string;
  updatedAt: string;
}

export const useNotebookStore = defineStore('notebook', {
  state: () => ({
    notes: [] as Note[],
  }),
  actions: {
    addNote(note: Note) {
      this.notes.push(note);
    },
    updateNote(id: string, data: Partial<Note>) {
      const idx = this.notes.findIndex(n => n.id === id);
      if (idx !== -1) this.notes[idx] = { ...this.notes[idx], ...data };
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter(n => n.id !== id);
    },
    setNotes(notes: Note[]) {
      this.notes = notes;
    },
  },
});