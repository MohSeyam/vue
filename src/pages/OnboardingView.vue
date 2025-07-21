<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in text-center">
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
import { inject } from 'vue';
const { t } = inject('app') as any;
</script>