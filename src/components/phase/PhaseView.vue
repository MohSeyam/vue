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
        <WeekCard v-for="week in phase.weeks" :key="week.id" :week="week" :progress="getWeekProgress(week)" />
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
import WeekCard from './WeekCard.vue'
const route = useRoute()
const planStore = usePlanStore()
const phase = computed(() => planStore.phases.find(p => p.id === route.params.id) as Phase | undefined)
function getWeekProgress(week: Week) {
  const total = (week.days || []).reduce((acc: number, d) => acc + (d.tasks?.length || 0), 0)
  const done = (week.days || []).reduce((acc: number, d) => acc + (d.tasks?.filter((t: Task) => t.done).length || 0), 0)
  return total ? Math.round((done / total) * 100) : 0
}
</script>