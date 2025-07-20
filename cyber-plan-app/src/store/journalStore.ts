import { defineStore } from 'pinia';

export const useJournalStore = defineStore('journal', {
  state: () => ({
    entries: [],
  }),
  actions: {
    addEntry(entry: any) {
      this.entries.push(entry);
    },
  },
});