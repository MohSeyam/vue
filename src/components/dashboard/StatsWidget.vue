<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M9 17V9m4 8V5m4 8v-4"/></svg>
    <div class="flex gap-2 mb-2">
      <button v-for="key in Object.keys(stats)" :key="key" @click="setSelectedStat(key)" :class="['px-2 py-0.5 rounded text-xs', selectedStat === key ? 'bg-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300']">{{ statLabels[key] || key }}</button>
    </div>
    <div class="text-2xl font-bold">{{ stats[selectedStat] }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ statLabels[selectedStat] }}</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { stats, selectedStat, setSelectedStat } = useDashboardStore()
const statLabels = {
  weeks: 'عدد الأسابيع',
  completedTasks: 'المهام المنجزة',
  notes: 'الملاحظات',
  studyDays: 'أيام الدراسة'
}
</script>