<template>
  <v-card class="pa-4 text-center upcoming-widget" elevation="10">
    <v-card-title class="font-weight-bold text-primary mb-2">
      <v-icon color="primary" size="26" class="me-2">mdi-calendar-clock</v-icon>
      {{ $t('dashboard.upcoming', 'المهام القادمة') }}
    </v-card-title>
    <v-list density="compact" v-if="plan.upcomingTasks.length">
      <v-list-item v-for="task in plan.upcomingTasks" :key="task.id">
        <v-list-item-title class="font-weight-bold">{{ plan.getTaskDesc(task) }}</v-list-item-title>
        <v-list-item-action>
          <v-chip :color="getTaskColor(task)" size="x-small" class="text-white">{{ task.type }}</v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-alert v-else type="info" color="primary" border="start" variant="tonal" class="mt-4">
      <v-icon class="me-1">mdi-calendar-remove</v-icon>
      {{ $t('dashboard.noUpcoming', 'لا توجد مهام قادمة') }}
    </v-alert>
  </v-card>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
const plan = usePlanStore()
function getTaskColor(task: any) {
  if (task.type === 'quiz') return 'secondary'
  if (task.type === 'project') return 'success'
  if (task.type === 'review') return 'warning'
  return 'primary'
}
</script>
<style scoped>
.upcoming-widget {
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  border-radius: 18px;
}
</style>