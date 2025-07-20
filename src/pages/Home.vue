<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-center">Home Page</h1>
    <p class="mb-8 text-center">Welcome to the Cybersecurity Learning Plan App!</p>
    <div class="flex flex-col md:flex-row gap-8 justify-center items-center mb-8">
      <ProgressCircle :percent="72" label="Plan Progress" color="#10b981" />
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
  { icon: '✅', value: 42, label: 'Tasks Done' },
  { icon: '⏰', value: 12, label: 'Hours Learned' },
  { icon: '🏆', value: 3, label: 'Achievements' }
];

const skills = [
  { name: 'Network', value: 80, color: '#3b82f6' },
  { name: 'Web', value: 60, color: '#f59e42' },
  { name: 'Forensics', value: 40, color: '#10b981' }
];
</script>