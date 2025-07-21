<template>
  <div class="max-w-5xl mx-auto py-10 px-4">
    <!-- Welcome Header -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">مرحبًا بك في خطة الأمن السيبراني</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">ابدأ رحلتك وتابع تقدمك في كل مرحلة.</p>
    </div>
    <!-- Phases Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div v-for="phase in phases" :key="phase.id" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group">
        <div class="mb-4">
          <!-- Heroicon: AcademicCap -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-cyan-400 group-hover:text-purple-400 transition">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 12v9m0 0l-3-3m3 3l3-3" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ phase.title }}</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">{{ phase.goal }}</p>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full" :style="{ width: getPhaseProgress(phase) + '%' }"></div>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">التقدم: {{ getPhaseProgress(phase) }}%</div>
      </div>
    </div>
    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div class="bg-gradient-to-tr from-cyan-700 to-blue-800 rounded-2xl shadow-xl p-8 text-white flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mb-2 text-cyan-200">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3.75h10.5a.75.75 0 01.75.75v2.25a6.75 6.75 0 01-13.5 0V4.5a.75.75 0 01.75-.75z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.75v4.5m-3 0h6" />
        </svg>
        <div class="text-2xl font-bold">{{ totalTasks }}</div>
        <div class="text-lg mt-2">إجمالي المهام</div>
      </div>
      <div class="bg-gradient-to-tr from-purple-700 to-cyan-700 rounded-2xl shadow-xl p-8 text-white flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mb-2 text-purple-200">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
        </svg>
        <div class="text-2xl font-bold">{{ totalWeeks }}</div>
        <div class="text-lg mt-2">عدد الأسابيع</div>
      </div>
      <div class="bg-gradient-to-tr from-pink-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mb-2 text-pink-200">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3" />
        </svg>
        <div class="text-2xl font-bold">{{ totalPhases }}</div>
        <div class="text-lg mt-2">عدد المراحل</div>
      </div>
    </div>
    <!-- Today's Tasks -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">مهام اليوم</h3>
      <ul class="space-y-2">
        <li v-for="task in todaysTasks" :key="task.id" class="flex items-center">
          <span class="inline-block w-3 h-3 rounded-full mr-2" :class="task.done ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'" />
          <span :class="task.done ? 'line-through text-gray-400' : ''">{{ task.title }}</span>
        </li>
        <li v-if="todaysTasks.length === 0" class="text-gray-400">لا توجد مهام اليوم.</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import type { Phase, Task } from '@/types/plan'
const planStore = usePlanStore()
const phases = planStore.phases as Phase[]
onMounted(() => {
  if (!planStore.planLoaded) planStore.loadPlan()
})
const totalPhases = computed(() => phases.length)
const totalWeeks = computed(() => phases.reduce((acc: number, p: Phase) => acc + (p.weeks?.length || 0), 0))
const totalTasks = computed(() => phases.reduce((acc: number, p: Phase) => acc + (p.weeks?.reduce((wacc: number, w) => wacc + (w.days?.reduce((dacc: number, d) => dacc + (d.tasks?.length || 0), 0) || 0), 0) || 0), 0))
const todaysTasks = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  for (const phase of phases) {
    for (const week of phase.weeks || []) {
      for (const day of week.days || []) {
        if (day.date === today) return day.tasks || []
      }
    }
  }
  return [] as Task[]
})
function getPhaseProgress(phase: Phase) {
  const total = (phase.weeks || []).reduce((acc: number, w) => acc + (w.days?.reduce((dacc: number, d) => dacc + (d.tasks?.length || 0), 0) || 0), 0)
  const done = (phase.weeks || []).reduce((acc: number, w) => acc + (w.days?.reduce((dacc: number, d) => dacc + (d.tasks?.filter((t: Task) => t.done).length || 0), 0) || 0), 0)
  return total ? Math.round((done / total) * 100) : 0
}
</script>