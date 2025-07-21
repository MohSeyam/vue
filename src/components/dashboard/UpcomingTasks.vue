<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-pink-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
    <div v-if="plan.upcomingTasks.length" class="w-full">
      <ul class="text-sm text-gray-700 dark:text-gray-200 w-full">
        <li v-for="task in plan.upcomingTasks" :key="task.id" class="mb-1 flex flex-col border-b border-gray-100 dark:border-gray-700 pb-1">
          <div class="flex justify-between items-center">
            <span class="font-bold">{{ task.title?.en || task.id }}</span>
            <span class="text-xs text-gray-400">{{ task.due || '' }}</span>
          </div>
          <div class="text-xs text-gray-400 mt-0.5">{{ task.description?.en || '' }}</div>
        </li>
      </ul>
    </div>
    <div v-else class="text-lg font-bold">{{ $t('dashboard.noUpcoming') }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.upcoming') }}</div>
  </div>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
const plan = usePlanStore()
</script>