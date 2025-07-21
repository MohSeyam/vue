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
import { inject, computed } from 'vue';
import ProgressChart from '../components/charts/ProgressChart.vue';
const { appState, plan } = inject('app') as any;
const progress = computed(() => {
  // حساب نسبة الإنجاز في الشهر الحالي
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let total = 0, completed = 0;
  plan.value.forEach((week: any) => {
    week.days.forEach((day: any) => {
      // افترض أن لكل يوم tasks وله تاريخ (يمكنك تعديل المنطق حسب بنية الداتا)
      if (day.date) {
        const d = new Date(day.date);
        if (d.getMonth() === month && d.getFullYear() === year) {
          total += day.tasks.length;
          if (appState.value?.progress?.[week.week]?.days?.[week.days.indexOf(day)]) {
            completed += appState.value.progress[week.week].days[week.days.indexOf(day)].tasks.filter((s: string) => s === 'completed').length;
          }
        }
      }
    });
  });
  return total > 0 ? Math.round((completed / total) * 100) : 0;
});
</script>