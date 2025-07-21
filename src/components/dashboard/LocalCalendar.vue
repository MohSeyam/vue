<template>
  <v-card class="pa-4 text-center" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ plan.currentDay ? plan.getText(plan.currentDay.day) : '' }}</v-card-title>
    <v-card-subtitle class="mb-2">{{ plan.currentDay ? plan.getDayTopic(plan.currentDay) : '' }}</v-card-subtitle>
    <v-list dense v-if="plan.currentDay?.tasks?.length">
      <v-list-item v-for="t in plan.currentDay.tasks" :key="t.id">
        <v-list-item-icon><v-icon color="primary">mdi-checkbox-blank-circle-outline</v-icon></v-list-item-icon>
        <v-list-item-title>{{ plan.getTaskDesc(t) }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <div v-else class="text-xs text-gray-400">{{ $t('dashboard.calendar', 'لا توجد مهام اليوم') }}</div>
  </v-card>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
const plan = usePlanStore()
</script>