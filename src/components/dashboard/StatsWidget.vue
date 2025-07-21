<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <svg class="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M9 17V9m4 8V5m4 8v-4"/></svg>
    <div class="text-2xl font-bold">{{ weeks }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.weeks') }}</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { weeks } = storeToRefs(useDashboardStore())
</script>