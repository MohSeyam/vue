<template>
  <v-card class="pa-4 v-card--link animate-fade-in" elevation="2">
    <v-card-title class="font-weight-bold">{{ phaseTitle }}</v-card-title>
    <v-card-subtitle>{{ phaseRange }}</v-card-subtitle>
    <v-card-text>
      <v-progress-linear :model-value="progress" color="success" height="8" rounded />
      <div class="mt-2 text-caption text-grey">{{ progress }}% {{ t.tasksCompleted }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$emit('view-phase', phaseId)">{{ t.planOverview }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps, inject } from 'vue';
const props = defineProps<{ phaseId: number, phaseTitle: string, phaseRange: string, progress: number }>();
const { t } = inject('app') as any;
</script>