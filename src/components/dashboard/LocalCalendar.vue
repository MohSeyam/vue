<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
    <div class="flex gap-1 mb-2">
      <span v-for="(d, i) in weekDays" :key="i" :class="['px-2 py-0.5 rounded', d === weekDays[new Date().getDay()] ? 'bg-cyan-200 dark:bg-cyan-700 text-cyan-900 dark:text-cyan-100' : 'text-gray-400']">{{ d }}</span>
    </div>
    <div class="text-lg font-bold mb-1">{{ today }}</div>
    <ul v-if="todayEvents.length" class="text-xs text-gray-600 dark:text-gray-300">
      <li v-for="e in todayEvents" :key="e.id">• {{ e.title }}</li>
    </ul>
    <div v-else class="text-xs text-gray-400">{{ $t('dashboard.calendar') }}</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { today, todayEvents, weekDays } = storeToRefs(useDashboardStore())
</script>