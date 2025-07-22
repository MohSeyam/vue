import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    lang: 'ar',
  }),
  actions: {
    setUser(name: string, email: string) {
      this.name = name;
      this.email = email;
    },
    setLang(lang: string) {
      this.lang = lang;
    },
  },
});