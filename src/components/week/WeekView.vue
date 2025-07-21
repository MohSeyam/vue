<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <div v-if="week">
      <!-- Week Header -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">{{ getText(week.title) }}</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">{{ getText(week.objective) }}</p>
      </div>
      <!-- Day Tabs -->
      <DayTabs :days="week.days.map(d => ({ id: d.key, date: d.key }))" v-model:activeDayIndex="activeDayIndex" />
      <div v-if="activeDay">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-cyan-700 dark:text-cyan-300 mb-2">{{ getText(activeDay.day) }} - {{ getText(activeDay.topic) }}</h2>
        </div>
        <!-- Tasks -->
        <div class="mb-6">
          <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">{{ $t('tasks.title') }}</h3>
          <ul class="space-y-3">
            <li v-for="task in activeDay.tasks" :key="task.id" class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-sm">
              <span class="font-bold text-cyan-500">{{ task.type }}</span>
              <span class="text-xs text-gray-400">{{ task.duration }} {{ $t('tasks.min') }}</span>
              <span class="flex-1">{{ getText(task.description) }}</span>
            </li>
          </ul>
        </div>
        <!-- Resources -->
        <div v-if="activeDay.resources && activeDay.resources.length" class="mb-6">
          <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">{{ $t('resources.title') }}</h3>
          <ul class="space-y-2">
            <li v-for="res in activeDay.resources" :key="res.url">
              <a :href="res.url" target="_blank" class="text-cyan-600 dark:text-cyan-300 hover:underline font-bold">{{ res.title }}</a>
              <span class="text-xs text-gray-400 ml-2">({{ res.type }})</span>
            </li>
          </ul>
        </div>
        <!-- Notes Prompt -->
        <div v-if="activeDay.notes_prompt">
          <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">{{ getText(activeDay.notes_prompt.title) }}</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li v-for="point in activeDay.notes_prompt.points" :key="point.ar">{{ getText(point) }}</li>
          </ul>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 mt-8">{{ $t('week.noDayData') }}</div>
    </div>
    <div v-else class="text-center text-gray-400">{{ $t('week.notFound') }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanStore } from '@/stores/usePlanStore'
import { getText } from '@/utils/getText'
import DayTabs from './DayTabs.vue'
const route = useRoute()
const planStore = usePlanStore()
const week = computed(() => planStore.weeks.find(w => w.week === Number(route.params.id)))
const activeDayIndex = ref(0)
const activeDay = computed(() => week.value?.days[activeDayIndex.value])
onMounted(() => {
  if (week.value && week.value.days.length > 0) activeDayIndex.value = 0
})
</script>