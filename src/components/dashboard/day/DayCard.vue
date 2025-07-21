<template>
  <v-card class="pa-4 v-card--link animate-fade-in" elevation="2">
    <v-card-title class="font-weight-bold">{{ dayTitle }}</v-card-title>
    <v-card-subtitle>{{ dayTopic }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex flex-wrap ga-2">
        <v-chip v-for="task in tasks" :key="task.id" color="primary" variant="tonal">{{ task.type }}</v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$emit('go-day', dayKey)">{{ t.journalOnDay }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps, inject } from 'vue';
const props = defineProps<{ dayKey: string, dayTitle: string, dayTopic: string, tasks: any[] }>();
const { t } = inject('app') as any;
</script>