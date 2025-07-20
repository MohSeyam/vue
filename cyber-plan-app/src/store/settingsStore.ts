import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: 'en',
    darkMode: false,
  }),
  actions: {
    setLanguage(lang: string) {
      this.language = lang;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});