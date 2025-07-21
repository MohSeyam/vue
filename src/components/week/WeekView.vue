<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <div v-if="week">
      <!-- Week Header -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">{{ week.title }}</h1>
      </div>
      <!-- Day Tabs -->
      <DayTabs :days="week.days" v-model:activeDayIndex="activeDayIndex" />
      <div v-if="activeDay">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <!-- Tasks & Pomodoro -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 class="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-cyan-400"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3.75h10.5a.75.75 0 01.75.75v2.25a6.75 6.75 0 01-13.5 0V4.5a.75.75 0 01.75-.75z" /></svg>
                مهام اليوم
              </h2>
              <TaskList :tasks="activeDay.tasks" />
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 class="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-purple-400"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" /></svg>
                مؤقت بومودورو
              </h2>
              <PomodoroTimer />
            </div>
          </div>
          <!-- Resources & Journal -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 class="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-400"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3" /></svg>
                الموارد
              </h2>
              <ResourceList :resources="activeDay.resources || []" />
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 class="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-pink-400"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" /></svg>
                تدوين المساء
              </h2>
              <JournalEditor :dayId="activeDay.id" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 mt-8">لا يوجد بيانات لهذا اليوم.</div>
    </div>
    <div v-else class="text-center text-gray-400">لم يتم العثور على الأسبوع المطلوب.</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanStore } from '@/stores/usePlanStore'
import type { Week } from '@/types/plan'
import DayTabs from './DayTabs.vue'
import TaskList from './TaskList.vue'
import PomodoroTimer from './PomodoroTimer.vue'
import ResourceList from './ResourceList.vue'
import JournalEditor from './JournalEditor.vue'
const route = useRoute()
const planStore = usePlanStore()
const week = computed(() => {
  for (const phase of planStore.phases) {
    const found = phase.weeks.find(w => w.id === route.params.id)
    if (found) return found as Week
  }
  return undefined
})
const activeDayIndex = ref(0)
const activeDay = computed(() => week.value?.days[activeDayIndex.value])
onMounted(() => {
  if (week.value && week.value.days.length > 0) activeDayIndex.value = 0
})
</script>