import { defineStore } from 'pinia'

// Store لإدارة سجل التدوينات
export const useJournalStore = defineStore('journal', {
  state: () => ({
    entries: [],
    tags: []
  }),
  actions: {
    // دوال إضافة/تعديل/حذف التدوينات
  }
})