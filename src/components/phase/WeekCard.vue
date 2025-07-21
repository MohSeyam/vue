<template>
  <router-link :to="`/week/${week.id}`" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group">
    <div class="mb-4">
      <!-- Heroicon: CalendarDays -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 7.5v12A1.5 1.5 0 004.5 21z" />
      </svg>
    </div>
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ week.title }}</h2>
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
      <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="text-xs text-gray-500 dark:text-gray-400">التقدم: {{ progress }}%</div>
  </router-link>
</template>
<script setup lang="ts">
import type { Week } from '@/types/plan'
const props = defineProps<{ week: Week; progress: number }>()
</script>