import { defineStore } from 'pinia'

export interface JournalEntry {
  id: string
  dayKey: string // مثل w1d1 أو week1-sat
  content: string
  createdAt: string
  tags?: string[]
}

export const useJournalStore = defineStore('journal', {
  state: () => ({
    entries: [] as JournalEntry[],
    tags: []
  }),
  actions: {
    addEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'>) {
      const newEntry: JournalEntry = {
        ...entry,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }
      this.entries.push(newEntry)
    },
    getJournalsByDayKey(dayKey: string) {
      return this.entries.filter(e => e.dayKey === dayKey)
    }
  }
})