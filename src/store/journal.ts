import { defineStore } from 'pinia';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export const useJournalStore = defineStore('journal', {
  state: () => ({
    journals: [] as JournalEntry[],
  }),
  actions: {
    addJournal(entry: JournalEntry) {
      this.journals.push(entry);
    },
    updateJournal(id: string, data: Partial<JournalEntry>) {
      const idx = this.journals.findIndex(j => j.id === id);
      if (idx !== -1) this.journals[idx] = { ...this.journals[idx], ...data };
    },
    deleteJournal(id: string) {
      this.journals = this.journals.filter(j => j.id !== id);
    },
    setJournals(journals: JournalEntry[]) {
      this.journals = journals;
    },
  },
});