<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-pink-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
    <div v-if="hasUpcomingTasks" class="w-full">
      <ul class="text-sm text-gray-700 dark:text-gray-200 w-full">
        <li v-for="task in upcomingTasks" :key="task.id" class="mb-1 flex justify-between">
          <span>{{ task.title }}</span>
          <span class="text-xs text-gray-400">{{ task.due }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="text-lg font-bold">{{ $t('dashboard.noUpcoming') }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.upcoming') }}</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { upcomingTasks, hasUpcomingTasks } = storeToRefs(useDashboardStore())
</script>