<template>
  <v-card class="pa-4 v-card--link animate-fade-in" elevation="2">
    <v-card-title class="font-weight-bold">{{ dayTitle }}</v-card-title>
    <v-card-subtitle>{{ dayTopic }}</v-card-subtitle>
    <v-card-text>
      <v-list density="compact">
        <v-list-item v-for="task in tasks" :key="task.id">
          <v-list-item-title>{{ task.description }}</v-list-item-title>
          <v-list-item-subtitle>{{ task.type }} - {{ task.duration }} دقيقة</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$emit('view-day', dayKey)">{{ t.day }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps, inject } from 'vue';
const props = defineProps<{ dayKey: string, dayTitle: string, dayTopic: string, tasks: any[] }>();
const { t } = inject('app') as any;
</script>