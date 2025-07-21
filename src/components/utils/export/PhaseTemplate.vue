<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
const plan = usePlanStore()
const phases = computed(() => {
  const map = new Map<number, { phase: number, weeks: number }>()
  for (const w of plan.weeks) {
    if (!map.has(w.phase)) map.set(w.phase, { phase: w.phase, weeks: 0 })
    map.get(w.phase).weeks++
  }
  return Array.from(map.values())
})
</script>
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.phases') }}</h3>
    <ul>
      <li v-for="p in phases" :key="p.phase" class="mb-1">{{ $t('plan.phase') }} {{ p.phase }} - {{ p.weeks }} {{ $t('plan.weeks') }}</li>
    </ul>
  </div>
</template>