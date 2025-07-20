import { defineStore } from 'pinia';

export const useJournalStore = defineStore('journal', {
  state: () => ({
    entries: [] as any[],
  }),
  actions: {
    addEntry(entry: any) {
      this.entries.push(entry);
    },
  },
});