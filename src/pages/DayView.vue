<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <DayCard :day-key="day.key" :day-title="day.title" :day-topic="day.topic" :tasks="day.tasks" />
  </v-container>
</template>
<script setup lang="ts">
import DayCard from '../components/dashboard/day/DayCard.vue';
const day = {
  key: 'sat',
  title: 'السبت',
  topic: 'مقدمة في الأمن السيبراني',
  tasks: [
    { id: 't1', description: 'مشاهدة فيديو', type: 'Video', duration: 60 },
    { id: 't2', description: 'حل تمرين', type: 'Practical', duration: 30 },
  ],
};
</script>