<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <v-row>
      <v-col cols="12" md="4" v-for="skill in skills" :key="skill.name">
        <ProgressChart :value="skill.value" :label="skill.name" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
import ProgressChart from '../components/charts/ProgressChart.vue';
const { plan, appState } = inject('app') as any;
// حساب تقدم كل مهارة من المهام المنجزة
const skills = computed(() => {
  const stats: Record<string, { total: number; completed: number }> = {};
  plan.value.forEach((week: any) => {
    week.days.forEach((day: any, dayIdx: number) => {
      day.tasks.forEach((task: any, taskIdx: number) => {
        if (!stats[task.type]) stats[task.type] = { total: 0, completed: 0 };
        stats[task.type].total++;
        if (appState.value?.progress?.[week.week]?.days?.[dayIdx]?.tasks?.[taskIdx] === 'completed') {
          stats[task.type].completed++;
        }
      });
    });
  });
  return Object.entries(stats).map(([name, stat]) => ({
    name,
    value: stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0,
  }));
});
</script>