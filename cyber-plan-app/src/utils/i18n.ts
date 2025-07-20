import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: 'Welcome to the Cybersecurity Learning Plan App!',
  },
  ar: {
    welcome: 'مرحبًا بك في تطبيق خطة تعلم الأمن السيبراني!',
  },
};

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});