<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <div v-if="phase">
      <!-- Phase Header -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">{{ phase.title }}</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">{{ phase.goal }}</p>
      </div>
      <!-- Weeks Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <router-link v-for="week in phase.weeks" :key="week.id" :to="`/week/${week.id}`" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group">
          <div class="mb-4">
            <!-- Heroicon: CalendarDays -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 7.5v12A1.5 1.5 0 004.5 21z" />
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ week.title }}</h2>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full" :style="{ width: getWeekProgress(week) + '%' }"></div>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">التقدم: {{ getWeekProgress(week) }}%</div>
        </router-link>
      </div>
    </div>
    <div v-else class="text-center text-gray-400">لم يتم العثور على المرحلة المطلوبة.</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanStore } from '@/stores/usePlanStore'
import type { Phase, Week, Task } from '@/types/plan'
const route = useRoute()
const planStore = usePlanStore()
const phase = computed(() => planStore.phases.find(p => p.id === route.params.id) as Phase | undefined)
function getWeekProgress(week: Week) {
  const total = (week.days || []).reduce((acc: number, d) => acc + (d.tasks?.length || 0), 0)
  const done = (week.days || []).reduce((acc: number, d) => acc + (d.tasks?.filter((t: Task) => t.done).length || 0), 0)
  return total ? Math.round((done / total) * 100) : 0
}
</script>