<template>
  <v-card class="pa-4 v-card--link animate-fade-in" elevation="2">
    <v-card-title class="font-weight-bold">{{ weekTitle }}</v-card-title>
    <v-card-subtitle>{{ weekObjective }}</v-card-subtitle>
    <v-card-text>
      <v-progress-linear :model-value="progress" color="primary" height="8" rounded></v-progress-linear>
      <div class="mt-2 text-caption text-grey">{{ progress.toFixed(0) }}% {{ t.tasksCompleted }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$emit('go-week', weekId)">{{ t.goToWeek }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps, inject } from 'vue';
const props = defineProps<{ weekId: number, weekTitle: string, weekObjective: string, progress: number }>();
const { t } = inject('app') as any;
</script>