<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M9 17V9m4 8V5m4 8v-4"/></svg>
    <div class="flex gap-2 mb-2">
      <span v-for="(label, key) in statLabels" :key="key" class="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">{{ label }}</span>
    </div>
    <div class="text-2xl font-bold">{{ stats.weeks }} / {{ stats.tasks }} / {{ stats.days }}</div>
    <div class="text-xs text-gray-400 mt-1">إحصائيات الخطة</div>
  </div>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
const plan = usePlanStore()
const statLabels = {
  weeks: 'عدد الأسابيع',
  tasks: 'عدد المهام',
  days: 'عدد الأيام'
}
const stats = computed(() => ({
  weeks: plan.weeks.length,
  tasks: plan.allTasks.length,
  days: plan.allDays.length
}))
</script>