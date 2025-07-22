<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">{{ $t('achievements.stats') }}</h3>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex flex-col items-center">
        <span class="text-2xl font-bold text-cyan-600 dark:text-cyan-300">{{ weeks }}</span>
        <span class="text-xs text-gray-500 dark:text-gray-300">{{ $t('achievements.weeks') }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-2xl font-bold text-purple-600 dark:text-purple-300">{{ days }}</span>
        <span class="text-xs text-gray-500 dark:text-gray-300">{{ $t('achievements.days') }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-2xl font-bold text-pink-600 dark:text-pink-300">{{ tasks }}</span>
        <span class="text-xs text-gray-500 dark:text-gray-300">{{ $t('achievements.tasks') }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-2xl font-bold text-green-600 dark:text-green-300">{{ completed }}</span>
        <span class="text-xs text-gray-500 dark:text-gray-300">{{ $t('achievements.completed') }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
const planStore = usePlanStore()
const weeks = computed(() => planStore.weeks.length)
const days = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.length, 0))
const tasks = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.tasks?.length || 0), 0), 0))
const completed = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.tasks?.filter(t => t.done).length || 0), 0), 0))
</script>