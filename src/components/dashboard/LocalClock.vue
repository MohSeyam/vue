<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <svg class="w-8 h-8 text-cyan-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    <div class="text-2xl font-mono font-bold">{{ time }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.clock') }}</div>
    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ timezone }}</div>
    <button class="mt-1 text-xs text-cyan-600 dark:text-cyan-400 underline" disabled>تغيير المنطقة الزمنية</button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { time, timezone } = storeToRefs(useDashboardStore())
</script>