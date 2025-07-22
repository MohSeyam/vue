<template>
  <v-card class="pa-4 text-center phase-widget" elevation="10">
    <v-card-title class="font-weight-bold text-primary mb-2">
      <v-icon color="secondary" size="26" class="me-2">mdi-flag-variant</v-icon>
      {{ currentWeek ? getWeekTitle(currentWeek) : $t('dashboard.phase', 'المرحلة الحالية') }}
    </v-card-title>
    <v-card-subtitle class="mb-2">{{ currentWeek?.objective?.[$i18n.locale] || currentWeek?.objective?.en || '' }}</v-card-subtitle>
    <v-progress-linear :model-value="progress" color="secondary" height="10" rounded class="mb-2" />
    <div class="d-flex justify-between text-xs text-grey-lighten-1">
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
<style scoped>
.phase-widget {
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  border-radius: 18px;
}
</style>