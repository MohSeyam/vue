<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-pink-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
    <div v-if="hasUpcomingTasks" class="w-full">
      <ul class="text-sm text-gray-700 dark:text-gray-200 w-full">
        <li v-for="task in upcomingTasks" :key="task.id" class="mb-2 flex flex-col border-b border-gray-100 dark:border-gray-700 pb-1">
          <div class="flex items-center justify-between">
            <span :class="{'line-through text-gray-400': task.completed}">{{ task.title }}</span>
            <span :class="[
              'text-xs font-bold px-2 rounded',
              task.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' : '',
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : '',
              task.priority === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''
            ]">{{ task.priority }}</span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-xs text-gray-400">{{ task.due }}</span>
            <span v-if="task.completed" class="text-xs text-green-500">✓</span>
          </div>
          <div v-if="task.description" class="text-xs text-gray-500 mt-1">{{ task.description }}</div>
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