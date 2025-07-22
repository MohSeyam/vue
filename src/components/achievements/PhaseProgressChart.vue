<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">{{ $t('achievements.phaseProgress') }}</h3>
    <div class="flex flex-col gap-4">
      <div v-for="phase in phases" :key="phase.id" class="flex items-center gap-4">
        <span class="w-32 font-bold">{{ getText(phase.title) }}</span>
        <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full transition-all duration-700" :style="{ width: getPhaseProgress(phase) + '%' }"></div>
        </div>
        <span class="w-10 text-xs text-gray-500 dark:text-gray-300">{{ getPhaseProgress(phase) }}%</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import { getText } from '@/utils/getText'
import type { Phase, Task } from '@/types/plan'
const planStore = usePlanStore()
const phases = computed(() => {
  const map = new Map<number, Phase>()
  for (const w of planStore.weeks) {
    const phaseId = w.phase || 1
    if (!map.has(phaseId)) {
      map.set(phaseId, {
        id: String(phaseId),
        title: w.title,
        goal: w.objective,
        weeks: []
      })
    }
    map.get(phaseId)!.weeks.push(w)
  }
  return Array.from(map.values())
})
function getPhaseProgress(phase: Phase) {
  const total = (phase.weeks || []).reduce((acc: number, w) => acc + (w.days?.reduce((dacc: number, d) => dacc + (d.tasks?.length || 0), 0) || 0), 0)
  const done = (phase.weeks || []).reduce((acc: number, w) => acc + (w.days?.reduce((dacc: number, d) => dacc + (d.tasks?.filter((t: Task) => t.done).length || 0), 0) || 0), 0)
  return total ? Math.round((done / total) * 100) : 0
}
</script>