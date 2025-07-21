<template>
  <v-card class="pa-4 text-center" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ currentWeek ? getWeekTitle(currentWeek) : '' }}</v-card-title>
    <v-card-subtitle class="mb-2">{{ currentWeek?.objective?.[$i18n.locale] || currentWeek?.objective?.en || '' }}</v-card-subtitle>
    <v-progress-linear :model-value="progress" color="primary" height="10" rounded class="mb-2" />
    <div class="d-flex justify-between text-xs text-gray-400">
      <span>{{ $t('plan.week', 'الأسبوع') }} {{ currentWeek?.week }}</span>
      <span>{{ $t('plan.phase', 'المرحلة') }} {{ currentWeek?.phase }}</span>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
const { currentWeek, getWeekTitle } = usePlanStore()
const progress = computed(() => 20) // يمكنك ربطها بتقدم حقيقي لاحقًا
</script>