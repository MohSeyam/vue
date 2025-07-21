<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <v-row v-if="week && week.days">
      <v-col v-for="day in week.days" :key="day.key" cols="12" md="4">
        <DayCard :day-key="day.key" :day-title="day.day[lang]" :day-topic="day.topic[lang]" :tasks="day.tasks" />
      </v-col>
    </v-row>
    <div v-else class="text-center text-grey">لا يوجد بيانات لهذا الأسبوع.</div>
  </v-container>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
import DayCard from '../components/dashboard/day/DayCard.vue';
const { plan, lang, view } = inject('app') as any;
const weekId = computed(() => view.params?.weekId || plan.value[0]?.week);
const week = computed(() => plan.value.find((w: any) => w.week == weekId.value));
</script>