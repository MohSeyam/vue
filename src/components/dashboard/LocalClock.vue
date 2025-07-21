<template>
  <v-card class="pa-4 text-center clock-widget" elevation="10">
    <v-card-title class="font-weight-bold text-primary mb-2 d-flex align-center justify-center gap-2">
      <v-icon color="primary" size="26">mdi-clock-time-eight-outline</v-icon>
      {{ time }}
    </v-card-title>
    <v-card-subtitle class="mb-2">{{ today }}</v-card-subtitle>
    <div class="text-xs text-grey-lighten-1 mb-1">{{ timezone }}</div>
    <div class="text-xs text-grey-lighten-1">
      <v-icon size="16" color="primary" class="me-1">mdi-earth</v-icon>
      {{ $t('dashboard.clock', 'الساعة المحلية') }}
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { time, today, timezone } = storeToRefs(useDashboardStore())
</script>
<style scoped>
.clock-widget {
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  border-radius: 18px;
}
</style>