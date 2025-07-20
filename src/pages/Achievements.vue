<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-center">Achievements</h1>
    <div class="flex flex-col md:flex-row gap-8 justify-center items-center mb-8">
      <ProgressCircle :percent="90" label="Phase Completion" color="#f59e42" />
      <StatsSummary :stats="stats" />
    </div>
    <SkillBarChart :skills="skills" />
  </div>
</template>

<script setup lang="ts">
import ProgressCircle from '@/components/ProgressCircle.vue';
import StatsSummary from '@/components/StatsSummary.vue';
import SkillBarChart from '@/components/SkillBarChart.vue';

const stats = [
  { icon: '🏅', value: 7, label: 'Badges' },
  { icon: '📈', value: 5, label: 'Phases Complete' },
  { icon: '🎯', value: 21, label: 'Goals Met' }
];

const skills = [
  { name: 'Network', value: 95, color: '#3b82f6' },
  { name: 'Web', value: 88, color: '#f59e42' },
  { name: 'Forensics', value: 70, color: '#10b981' }
];
</script>