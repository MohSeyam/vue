import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'dark',
    lang: 'ar',
    notifications: true,
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setLang(lang: string) {
      this.lang = lang;
    },
    setNotifications(val: boolean) {
      this.notifications = val;
    },
  },
});