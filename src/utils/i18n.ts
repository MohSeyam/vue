import { createI18n } from 'vue-i18n'
import ar from '@/locales/ar.json'
import en from '@/locales/en.json'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || navigator.language.startsWith('ar') ? 'ar' : 'en',
  fallbackLocale: 'ar',
  messages: { ar, en }
})