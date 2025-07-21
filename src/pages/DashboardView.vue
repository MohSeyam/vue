<template>
  <v-container fluid class="pa-4 pa-md-8 animate-fade-in">
    <v-row>
      <v-col cols="12" md="6">
        <AnimatedCard>
          <v-card-title class="font-weight-bold">{{ t.weeklyProgress }}</v-card-title>
          <v-card-subtitle>{{ t.weekTitle }} {{ currentWeekData.week }}: {{ currentWeekData.title[lang] }}</v-card-subtitle>
          <v-card-text>
            <div class="d-flex justify-space-between mb-1">
              <span>{{ completedTasksInWeek }}/{{ totalTasksInWeek }} {{ t.tasksCompleted }}</span>
              <span>{{ weekProgress.toFixed(0) }}%</span>
            </div>
            <v-progress-linear :model-value="weekProgress" color="green" height="8" rounded></v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="grey-lighten-2" variant="flat" @click="$emit('go-week', currentWeekData.week)">{{ t.goToWeek }}</v-btn>
          </v-card-actions>
        </AnimatedCard>
      </v-col>
      <v-col cols="12" md="6">
        <AnimatedCard>
          <v-card-title class="font-weight-bold">{{ t.taskDistribution }}</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap ga-2">
              <v-chip v-for="([type, count]) in Object.entries(taskDistribution)" :key="type">
                {{ taskIcons[type] }} {{ type }}: {{ count }}
              </v-chip>
            </div>
          </v-card-text>
        </AnimatedCard>
      </v-col>
    </v-row>
    <h2 class="text-h5 font-weight-bold mt-12 mb-4">{{ t.planOverview }}</h2>
    <v-row>
      <v-col v-for="(phase, key) in phases" :key="key" cols="12" md="4">
        <AnimatedCard @click="$emit('go-phase', key)" :color="phase.vuetifyColor" variant="tonal" style="cursor:pointer;">
          <div class="d-flex justify-space-between align-center">
            <div>
              <v-card-title class="font-weight-bold">{{ phase.title[lang] }}</v-card-title>
              <v-card-subtitle>{{ phase.range[lang] }}</v-card-subtitle>
            </div>
            <v-icon size="x-large">mdi-chevron-right</v-icon>
          </div>
        </AnimatedCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import AnimatedCard from '../components/common/AnimatedCard.vue';
import { computed, inject } from 'vue';
const { lang, t, phases, planData, appState } = inject('app') as any;
const currentWeekData = computed(() => planData[0]); // استبدلها بمنطق ديناميكي لاحقًا
const totalTasksInWeek = computed(() => currentWeekData.value.days.reduce((acc, day) => acc + day.tasks.length, 0));
const completedTasksInWeek = computed(() => 0); // استبدلها بمنطق ديناميكي لاحقًا
const weekProgress = computed(() => totalTasksInWeek.value > 0 ? (completedTasksInWeek.value / totalTasksInWeek.value) * 100 : 0);
const taskIcons = { "Blue Team": "🛡️", "Red Team": "🎯", "Purple Team": "🟣", "Practical": "🛠️", "Soft Skills": "💬", "Policies": "📜" };
const taskDistribution = computed(() => {
  return currentWeekData.value.days.reduce((acc: any, day: any) => {
    day.tasks.forEach((task: any) => {
      acc[task.type] = (acc[task.type] || 0) + 1;
    });
    return acc;
  }, {});
});
</script>