<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <ProgressChart :value="progress" label="إنجاز الشهر" />
      </v-col>
    </v-row>
    <v-card class="pa-6 mx-auto" max-width="600">
      <v-card-title class="font-weight-bold text-primary">تقويم الخطة</v-card-title>
      <v-card-text>
        <!-- هنا يمكن عرض تقويم فعلي لاحقًا -->
        <div class="text-grey">(سيتم عرض التقويم هنا...)</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import ProgressChart from '../components/charts/ProgressChart.vue';
const progress = 45; // مثال: نسبة إنجاز الشهر
</script>