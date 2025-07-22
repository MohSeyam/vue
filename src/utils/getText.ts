import type { LocalizedString } from '@/types/plan'
import { useI18n } from 'vue-i18n'

export function getText(obj: LocalizedString): string {
  const { locale } = useI18n()
  return obj[locale.value] || obj['en'] || obj['ar'] || ''
}