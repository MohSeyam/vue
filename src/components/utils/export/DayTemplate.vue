<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
const plan = usePlanStore()
const day = plan.currentDay
</script>
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.today') }}</h3>
    <div v-if="day">
      <div class="font-bold">{{ day.day[$i18n.locale] || day.day.en }}</div>
      <div class="text-xs text-gray-500 mb-1">{{ day.topic?.[$i18n.locale] || day.topic?.en }}</div>
      <div class="text-xs">{{ $t('plan.tasks') }}: {{ day.tasks.length }}</div>
    </div>
    <div v-else class="text-xs text-gray-400">{{ $t('plan.noDay') }}</div>
  </div>
</template>