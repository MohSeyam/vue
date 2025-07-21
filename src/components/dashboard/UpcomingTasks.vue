<template>
  <v-card class="pa-4 text-center" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ $t('dashboard.upcoming', 'المهام القادمة') }}</v-card-title>
    <v-list dense v-if="plan.upcomingTasks.length">
      <v-list-item v-for="task in plan.upcomingTasks" :key="task.id">
        <v-list-item-title class="font-weight-bold">{{ plan.getTaskDesc(task) }}</v-list-item-title>
        <v-list-item-subtitle>{{ plan.getTaskDesc(task) }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-alert v-else type="info" color="primary">{{ $t('dashboard.noUpcoming', 'لا توجد مهام قادمة') }}</v-alert>
  </v-card>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
const plan = usePlanStore()
</script>