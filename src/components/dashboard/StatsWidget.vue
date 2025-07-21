<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M9 17V9m4 8V5m4 8v-4"/></svg>
        <span class="font-bold">{{ stats.weeks }}</span>
        <span class="text-xs text-gray-400">{{ $t('dashboard.weeks') }}</span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
        <span class="font-bold">{{ stats.completedTasks }}</span>
        <span class="text-xs text-gray-400">مهام مكتملة</span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><rect x="2" y="7" width="20" height="7" rx="2"/></svg>
        <span class="font-bold">{{ stats.notes }}</span>
        <span class="text-xs text-gray-400">ملاحظات</span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span class="font-bold">{{ stats.studyDays }}</span>
        <span class="text-xs text-gray-400">أيام دراسة</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { stats } = storeToRefs(useDashboardStore())
</script>