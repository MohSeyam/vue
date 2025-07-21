<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-cyan-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <div class="mb-8 flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 text-cyan-500 mb-4 drop-shadow-lg">
        <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" fill="none" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M24 12v12l8 4" stroke="currentColor" stroke-width="3" />
      </svg>
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">{{ $t('dashboard.welcome') }}</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-2">{{ $t('dashboard.simple') }}</p>
      <p class="text-base text-cyan-700 dark:text-cyan-200 font-semibold animate-pulse">{{ $t('dashboard.motivation', 'Start your cybersecurity journey with confidence!') }}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
      <LocalClock />
      <LocalCalendar />
      <UpcomingTasks />
      <StatsWidget />
      <PhaseCard />
    </div>
  </div>
</template>
<script setup lang="ts">
import LocalClock from './LocalClock.vue'
import LocalCalendar from './LocalCalendar.vue'
import UpcomingTasks from './UpcomingTasks.vue'
import StatsWidget from './StatsWidget.vue'
import PhaseCard from './PhaseCard.vue'
</script>