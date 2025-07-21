<template>
  <v-card class="pa-4 text-center" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ time }}</v-card-title>
    <v-card-subtitle class="mb-2">{{ today }}</v-card-subtitle>
    <div class="text-xs text-gray-400 mb-1">{{ timezone }}</div>
    <div class="text-xs text-gray-400">{{ $t('dashboard.clock', 'الساعة المحلية') }}</div>
  </v-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/useDashboardStore'
const { time, today, timezone } = storeToRefs(useDashboardStore())
</script>