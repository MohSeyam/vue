<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
    <div class="text-lg font-bold mb-1">{{ plan.currentDay ? plan.getText(plan.currentDay.day) : '' }}</div>
    <div class="text-xs text-gray-400 mb-1">{{ plan.currentDay ? plan.getDayTopic(plan.currentDay) : '' }}</div>
    <ul v-if="plan.currentDay?.tasks?.length" class="text-xs text-gray-600 dark:text-gray-300">
      <li v-for="t in plan.currentDay.tasks" :key="t.id">• {{ plan.getTaskDesc(t) }}</li>
    </ul>
    <div v-else class="text-xs text-gray-400">{{ $t('dashboard.calendar') }}</div>
  </div>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
const plan = usePlanStore()
</script>