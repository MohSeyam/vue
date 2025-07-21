<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-8 text-center">{{ $t('achievements.title') }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div class="bg-gradient-to-tr from-cyan-700 to-blue-800 rounded-2xl shadow-xl p-8 text-white flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mb-2 text-cyan-200">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37A5.5 5.5 0 1112 6.5" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.5v6l4 2" />
        </svg>
        <div class="text-3xl font-bold">{{ progress }}%</div>
        <div class="text-lg mt-2">{{ $t('achievements.progress') }}</div>
        <div class="w-full bg-white/20 rounded-full h-3 mt-4">
          <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full transition-all duration-700" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      <div class="bg-gradient-to-tr from-purple-700 to-cyan-700 rounded-2xl shadow-xl p-8 text-white flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mb-2 text-purple-200">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
        </svg>
        <div class="text-3xl font-bold">{{ completedTasks }}</div>
        <div class="text-lg mt-2">{{ $t('achievements.completedTasks') }}</div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <PhaseProgressChart />
      <SkillsChart />
    </div>
    <div class="mb-10">
      <StatsSummary />
    </div>
    <ReportGenerator />
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8">
      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">{{ $t('achievements.details') }}</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li v-for="item in details" :key="item.label" class="text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <span class="font-bold text-cyan-600 dark:text-cyan-300">{{ item.value }}</span>
          <span>{{ $t(item.label) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import { useNotebookStore } from '@/stores/useNotebookStore'
import { useJournalStore } from '@/stores/useJournalStore'
import PhaseProgressChart from './PhaseProgressChart.vue'
import SkillsChart from './SkillsChart.vue'
import StatsSummary from './StatsSummary.vue'
import ReportGenerator from './ReportGenerator.vue'
const planStore = usePlanStore()
const notebookStore = useNotebookStore()
const journalStore = useJournalStore()
const totalTasks = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.tasks?.length || 0), 0), 0))
const completedTasks = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.tasks?.filter(t => t.done).length || 0), 0), 0))
const progress = computed(() => totalTasks.value ? Math.round((completedTasks.value / totalTasks.value) * 100) : 0)
const notesCount = computed(() => notebookStore.notes.length)
const journalCount = computed(() => journalStore.entries.length)
const details = computed(() => [
  { label: 'achievements.totalTasks', value: totalTasks.value },
  { label: 'achievements.completedTasks', value: completedTasks.value },
  { label: 'achievements.progress', value: progress.value + '%' },
  { label: 'achievements.notesCount', value: notesCount.value },
  { label: 'achievements.journalCount', value: journalCount.value }
])
</script>