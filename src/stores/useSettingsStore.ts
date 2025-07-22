import { defineStore } from 'pinia'

// Store لإدارة إعدادات التطبيق (المظهر، اللغة ...)
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'auto',
    language: 'ar',
    // إعدادات أخرى
  }),
  actions: {
    // دوال تغيير الإعدادات
  }
})