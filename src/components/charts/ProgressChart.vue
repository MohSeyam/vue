<template>
  <div class="progress-chart">
    <apexchart type="radialBar" :options="chartOptions" :series="series" width="280" />
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
// يفترض وجود مكتبة apexcharts/vue3-apexcharts مثبتة
const props = defineProps<{ value: number, label?: string }>();
const series = computed(() => [props.value]);
const chartOptions = computed(() => ({
  chart: { sparkline: { enabled: true } },
  labels: [props.label || 'Progress'],
  plotOptions: {
    radialBar: {
      hollow: { size: '60%' },
      dataLabels: { value: { fontSize: '28px' } }
    }
  },
  colors: ['#1976d2'],
}));
</script>