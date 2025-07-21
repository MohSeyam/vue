<template>
  <v-card class="pa-4 text-center" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ $t('dashboard.stats', 'إحصائيات الخطة') }}</v-card-title>
    <v-list dense>
      <v-list-item v-for="(label, key) in statLabels" :key="key">
        <v-list-item-title>{{ label }}</v-list-item-title>
        <v-list-item-action><span class="text-xl font-weight-bold">{{ stats[key] }}</span></v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
const plan = usePlanStore()
const statLabels = {
  weeks: 'عدد الأسابيع',
  tasks: 'عدد المهام',
  days: 'عدد الأيام'
}
const stats = computed(() => ({
  weeks: plan.weeks.length,
  tasks: plan.allTasks.length,
  days: plan.allDays.length
}))
</script>