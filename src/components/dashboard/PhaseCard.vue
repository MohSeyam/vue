<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
    <svg class="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>
    <div class="text-lg font-bold">{{ currentPhase }}</div>
    <div class="text-xs text-gray-400 mb-1">{{ phaseDescription }}</div>
    <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full my-2">
      <div class="h-2 bg-cyan-500 rounded-full" :style="{ width: phaseProgress + '%' }"></div>
    </div>
    <div class="flex justify-between w-full text-xs text-gray-400">
      <span>{{ phaseStart }}</span>
      <span>{{ phaseEnd }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { currentPhase, phaseDescription, phaseProgress, phaseStart, phaseEnd } = storeToRefs(useDashboardStore())
</script>