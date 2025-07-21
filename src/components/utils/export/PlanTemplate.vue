<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
const plan = usePlanStore()
const weeks = computed(() => plan.weeks.length)
const days = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.length, 0))
const tasks = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + d.tasks.length, 0), 0))
</script>
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center">
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.summary') }}</h3>
    <div class="flex gap-4">
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ weeks }}</span><span class="text-xs">{{ $t('plan.weeks') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ days }}</span><span class="text-xs">{{ $t('plan.days') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ tasks }}</span><span class="text-xs">{{ $t('plan.tasks') }}</span></div>
    </div>
  </div>
</template>