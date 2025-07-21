<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
    <div class="text-lg font-bold">{{ today }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.calendar') }}</div>
    <ul v-if="todayEvents.length" class="mt-2 w-full">
      <li v-for="event in todayEvents" :key="event.id" class="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
        <svg class="w-4 h-4 text-purple-400 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M12 14v-4"/></svg>
        <span>{{ event.title }} <span class="text-gray-400">({{ event.time }})</span></span>
      </li>
    </ul>
    <div v-else class="text-xs text-gray-400 mt-2">لا أحداث اليوم</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { today, todayEvents } = storeToRefs(useDashboardStore())
</script>