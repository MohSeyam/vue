import { useI18n } from 'vue-i18n'
export function getText(obj: { en: string; ar: string }) {
  const { locale } = useI18n()
  return obj[locale.value] || obj['ar']
}