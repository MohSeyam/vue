<template>
  <v-card class="pa-4 mb-4" elevation="6">
    <v-card-title class="font-weight-bold text-primary">{{ props.week.title[$i18n.locale] || props.week.title.en }}</v-card-title>
    <v-card-subtitle class="mb-2">{{ props.week.objective?.[$i18n.locale] || props.week.objective?.en }}</v-card-subtitle>
    <v-progress-linear :model-value="props.progress" color="primary" height="10" rounded class="mb-2">
      <template #default>
        <span class="text-caption">{{ props.progress }}%</span>
      </template>
    </v-progress-linear>
    <v-list dense>
      <v-list-item v-for="d in props.week.days" :key="d.key">
        <v-list-item-title>{{ d.day[$i18n.locale] || d.day.en }}: {{ d.topic?.[$i18n.locale] || d.topic?.en }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps<{ week: any, progress: number }>()
</script>