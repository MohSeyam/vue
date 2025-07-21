<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
const plan = usePlanStore()
const weeks = computed(() => plan.weeks.map(w => ({ week: w.week, title: w.title, days: w.days.length })))
</script>
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.weeksList') }}</h3>
    <ul>
      <li v-for="w in weeks" :key="w.week" class="mb-1">{{ $t('plan.week') }} {{ w.week }} - {{ w.title[$i18n.locale] || w.title.en }} ({{ w.days }} {{ $t('plan.days') }})</li>
    </ul>
  </div>
</template>