// منطق البحث المؤجل (debounced search)
import { ref } from 'vue';

export function useDebouncedSearch(searchFn: (query: string) => void, delay = 300) {
  const timer = ref<number | null>(null);

  function onSearch(query: string) {
    if (timer.value) clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      searchFn(query);
    }, delay) as unknown as number;
  }

  return { onSearch };
}