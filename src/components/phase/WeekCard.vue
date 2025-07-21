<template>
  <router-link :to="`/week/${week.id}`" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group">
    <div class="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 7.5v12A1.5 1.5 0 004.5 21z" />
      </svg>
    </div>
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ week.title[locale] || week.title.en }}</h2>
    <div class="flex gap-2 text-xs text-gray-500 dark:text-gray-300 mb-2">
      <span>🗓️ {{ daysCount }} {{ $t('plan.days') }}</span>
      <span>•</span>
      <span>📝 {{ tasksCount }} {{ $t('plan.tasks') }}</span>
      <span>•</span>
      <span>⏱️ {{ totalHours }}h</span>
    </div>
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
      <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-700" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="text-xs font-bold text-cyan-700 dark:text-cyan-300">{{ $t('plan.progress') }}: {{ progress }}%</div>
  </router-link>
</template>
<script setup lang="ts">
import type { Week } from '@/types/plan'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
defineProps<{ week: Week; progress: number }>()
const { locale } = useI18n()
const daysCount = computed(() => week.days.length)
const tasksCount = computed(() => week.days.reduce((acc, d) => acc + d.tasks.length, 0))
const totalMinutes = computed(() => week.days.reduce((acc, d) => acc + d.tasks.reduce((tacc, t) => tacc + (t.duration || 0), 0), 0))
const totalHours = computed(() => Math.floor(totalMinutes.value / 60))
</script>