<template>
  <v-card class="pa-4 text-center stats-widget" elevation="10">
    <v-card-title class="font-weight-bold text-primary mb-2">
      <v-icon color="primary" size="28" class="me-2">mdi-chart-donut-variant</v-icon>
      {{ $t('dashboard.stats', 'إحصائيات الخطة') }}
    </v-card-title>
    <v-row align="center" justify="center" class="mb-2">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular :model-value="progress" size="64" width="8" color="primary" class="me-2">
          <span class="text-h6 font-weight-bold">{{ progress }}%</span>
        </v-progress-circular>
      </v-col>
    </v-row>
    <v-list density="compact" class="mb-2">
      <v-list-item>
        <v-list-item-icon><v-icon color="primary">mdi-calendar-week</v-icon></v-list-item-icon>
        <v-list-item-title>{{ $t('dashboard.weeks', 'عدد الأسابيع') }}</v-list-item-title>
        <v-list-item-action><span class="font-weight-bold">{{ stats.weeks }}</span></v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon color="secondary">mdi-checkbox-multiple-marked-outline</v-icon></v-list-item-icon>
        <v-list-item-title>{{ $t('dashboard.tasks', 'عدد المهام') }}</v-list-item-title>
        <v-list-item-action><span class="font-weight-bold">{{ stats.tasks }}</span></v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon color="success">mdi-calendar-range</v-icon></v-list-item-icon>
        <v-list-item-title>{{ $t('dashboard.days', 'عدد الأيام') }}</v-list-item-title>
        <v-list-item-action><span class="font-weight-bold">{{ stats.days }}</span></v-list-item-action>
      </v-list-item>
    </v-list>
    <v-row class="mt-4">
      <v-col cols="12">
        <DoughnutChart :data="doughnutData" :options="doughnutOptions" style="max-width:220px;margin:auto;"/>
      </v-col>
    </v-row>
    <v-progress-linear :model-value="progress" color="primary" height="8" rounded class="mt-2" />
  </v-card>
</template>
<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend)
const DoughnutChart = Doughnut
const plan = usePlanStore()
const stats = computed(() => ({
  weeks: plan.weeks.length,
  tasks: plan.allTasks.length,
  days: plan.allDays.length
}))
const progress = computed(() => {
  // مثال: نسبة إنجاز المهام (يمكنك ربطها بتقدم حقيقي لاحقًا)
  const total = stats.value.tasks
  const done = plan.allTasks.filter(t => t.done).length
  return total ? Math.round((done / total) * 100) : 0
})
const doughnutData = computed(() => ({
  labels: ['Quizzes', 'Projects', 'Reviews', 'Other'],
  datasets: [
    {
      label: 'Tasks',
      data: [
        plan.allTasks.filter(t => t.type === 'quiz').length,
        plan.allTasks.filter(t => t.type === 'project').length,
        plan.allTasks.filter(t => t.type === 'review').length,
        plan.allTasks.filter(t => !['quiz','project','review'].includes(t.type)).length
      ],
      backgroundColor: [
        '#22d3ee', // quiz
        '#0d9488', // project
        '#c084fc', // review
        '#64748b'  // other
      ],
      borderWidth: 2
    }
  ]
}))
const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'bottom', labels: { color: '#fff', font: { size: 13 } } }
  }
}
</script>
<style scoped>
.stats-widget {
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  border-radius: 18px;
}
</style>