<template>
  <v-card class="pa-4 v-card--link animate-fade-in" elevation="2">
    <v-card-title class="font-weight-bold">{{ t.achievements }}</v-card-title>
    <v-list>
      <v-list-item v-for="ach in achievements" :key="ach.id">
        <v-list-item-title>{{ ach.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ ach.date }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import { inject } from 'vue';
defineProps<{ achievements: any[] }>();
const { t } = inject('app') as any;
// props غير مستخدم فعلياً
</script>