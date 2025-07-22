<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in text-center">
    <v-row class="mb-4">
      <v-col cols="12" md="6" class="mx-auto">
        <ProgressChart :value="progress" label="جولة التعريف" />
      </v-col>
    </v-row>
    <v-card class="pa-8 mx-auto" max-width="600">
      <v-icon size="64" color="primary">mdi-shield-account</v-icon>
      <v-card-title class="font-weight-bold text-primary mt-4">{{ t.welcome }}</v-card-title>
      <v-card-text class="my-4">
        <div class="text-h6 mb-2">{{ t.onboardingIntro }}</div>
        <ul class="text-start mx-auto" style="max-width: 400px;">
          <li>{{ t.onboardingStep1 }}</li>
          <li>{{ t.onboardingStep2 }}</li>
          <li>{{ t.onboardingStep3 }}</li>
        </ul>
      </v-card-text>
      <v-btn color="primary" size="large" class="mt-6" @click="$emit('finish')">{{ t.startNow }}</v-btn>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
import ProgressChart from '../components/charts/ProgressChart.vue';
const { t, appState } = inject('app') as any;
const progress = computed(() => {
  // مثال: إذا أكمل أول ملاحظة أو أول أسبوع
  let val = 0;
  if (appState.value?.notes) {
    const firstNote = Object.values(appState.value.notes).some((w: any) => Object.values(w.days).some((d: any) => Object.keys(d).length > 0));
    if (firstNote) val += 50;
  }
  if (appState.value?.progress) {
    const weekComplete = Object.values(appState.value.progress).some((w: any) => Object.values(w.days).every((d: any) => d.tasks.every((s: string) => s === 'completed')));
    if (weekComplete) val += 50;
  }
  return val;
});
</script>