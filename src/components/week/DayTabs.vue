<template>
  <div class="flex flex-wrap justify-center gap-2 md:gap-4">
    <button
      v-for="(day, idx) in days"
      :key="day.id"
      @click="$emit('update:activeDayIndex', idx)"
      :class="[
        'px-4 py-2 rounded-full font-bold transition-all',
        activeDayIndex === idx
          ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg scale-105'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-900'
      ]"
    >
      {{ getDayName(day.date, idx) }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ days: { id: string; date: string }[]; activeDayIndex: number }>()
const emit = defineEmits(['update:activeDayIndex'])
function getDayName(date: string, idx: number) {
  // Return Arabic day name or fallback to index
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
  const d = new Date(date)
  if (!isNaN(d.getTime())) return days[d.getDay()] || `اليوم ${idx + 1}`
  return `اليوم ${idx + 1}`
}
</script>