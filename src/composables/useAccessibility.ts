// منطق الوصولية (focus management, aria)
import { onMounted } from 'vue';

export function useAccessibility(refEl: any, ariaLabel: string) {
  onMounted(() => {
    if (refEl.value) {
      refEl.value.setAttribute('aria-label', ariaLabel);
      refEl.value.setAttribute('tabindex', '0');
    }
  });
}