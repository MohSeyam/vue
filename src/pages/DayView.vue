<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <DayCard v-if="day" :day-key="day.key" :day-title="day.day[lang]" :day-topic="day.topic[lang]" :tasks="day.tasks" />
    <div v-else class="text-center text-grey">لا يوجد بيانات لهذا اليوم.</div>
  </v-container>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
import DayCard from '../components/dashboard/day/DayCard.vue';
const { plan, lang, view } = inject('app') as any;
// استخراج اليوم الحالي أو المحدد من planData
const day = computed(() => {
  const weekId = view.params?.weekId || plan.value[0]?.week;
  const dayKey = view.params?.dayKey || plan.value[0]?.days[0]?.key;
  const week = plan.value.find((w: any) => w.week == weekId);
  if (!week) return null;
  return week.days.find((d: any) => d.key === dayKey) || null;
});
</script>