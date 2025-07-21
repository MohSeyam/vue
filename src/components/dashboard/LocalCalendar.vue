<template>
  <v-card class="pa-4 text-center calendar-widget" elevation="10">
    <v-card-title class="font-weight-bold text-primary mb-2">
      <v-icon color="primary" size="26" class="me-2">mdi-calendar-today</v-icon>
      {{ plan.currentDay ? plan.getText(plan.currentDay.day) : $t('dashboard.today', 'اليوم') }}
    </v-card-title>
    <v-card-subtitle class="mb-2">{{ plan.currentDay ? plan.getDayTopic(plan.currentDay) : '' }}</v-card-subtitle>
    <v-list density="compact" v-if="plan.currentDay?.tasks?.length">
      <v-list-item v-for="t in plan.currentDay.tasks" :key="t.id">
        <v-list-item-icon><v-icon color="primary">mdi-checkbox-blank-circle-outline</v-icon></v-list-item-icon>
        <v-list-item-title>{{ plan.getTaskDesc(t) }}</v-list-item-title>
        <v-list-item-action>
          <v-chip :color="getTaskColor(t)" size="x-small" class="text-white">{{ t.type }}</v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-alert v-else type="info" color="primary" border="start" variant="tonal" class="mt-4">
      <v-icon class="me-1">mdi-calendar-remove</v-icon>
      {{ $t('dashboard.calendar', 'لا توجد مهام اليوم') }}
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
.calendar-widget {
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  border-radius: 18px;
}
</style>