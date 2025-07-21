// منطق الحفظ التلقائي للمحررات أو اليوميات
import { ref, watch, onUnmounted } from 'vue';

export function useAutoSave(data: any, saveFn: () => void, delay = 2000) {
  const timer = ref<number | null>(null);

  watch(data, () => {
    if (timer.value) clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      saveFn();
    }, delay) as unknown as number;
  }, { deep: true });

  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value);
  });
}