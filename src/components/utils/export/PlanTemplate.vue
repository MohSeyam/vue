<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
const plan = usePlanStore()
const weeks = computed(() => plan.weeks.length)
const days = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.length, 0))
const tasks = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + d.tasks.length, 0), 0))
const totalMinutes = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + d.tasks.reduce((tacc, t) => tacc + (t.duration || 0), 0), 0), 0))
const totalHours = computed(() => Math.floor(totalMinutes.value / 60))
const totalSources = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.resources?.length || 0), 0), 0))
const phases = computed(() => Array.from(new Set(plan.weeks.map(w => w.phase))).length)
</script>
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center">
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.summary') }}</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ phases }}</span><span class="text-xs">{{ $t('plan.phases') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ weeks }}</span><span class="text-xs">{{ $t('plan.weeks') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ days }}</span><span class="text-xs">{{ $t('plan.days') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ tasks }}</span><span class="text-xs">{{ $t('plan.tasks') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ totalHours }}</span><span class="text-xs">{{ $t('plan.totalHours') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ totalSources }}</span><span class="text-xs">{{ $t('plan.sources') }}</span></div>
    </div>
    <div class="text-xs text-gray-500 dark:text-gray-300">{{ $t('plan.totalMinutes') }}: {{ totalMinutes }}</div>
  </div>
</template>