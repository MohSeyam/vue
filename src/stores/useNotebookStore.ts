import { defineStore } from 'pinia'

// Store لإدارة دفتر الملاحظات
export const useNotebookStore = defineStore('notebook', {
  state: () => ({
    notes: [],
    tags: []
  }),
  actions: {
    // دوال إضافة/تعديل/حذف الملاحظات
  }
})