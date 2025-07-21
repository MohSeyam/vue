<template>
  <v-container fluid class="pa-4 pa-md-8 animate-fade-in">
    <v-row>
      <v-col cols="12" md="4">
        <ProgressChart :value="weekProgress" label="التقدم الأسبوعي" />
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col v-for="week in weeks" :key="week.id" cols="12" md="6">
            <WeekCard :week-id="week.id" :week-title="week.title" :week-subtitle="week.objective" :progress="week.progress" @view-week="goToWeek" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col v-for="phase in phases" :key="phase.id" cols="12" md="6">
        <PhaseCard :phase-id="phase.id" :phase-title="phase.title" :phase-range="phase.range" :progress="phase.progress" @view-phase="goToPhase" />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col v-for="day in days" :key="day.key" cols="12" md="4">
        <DayCard :day-key="day.key" :day-title="day.title" :day-topic="day.topic" :tasks="day.tasks" @view-day="goToDay" />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12">
        <AchievementsList :achievements="achievements" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import WeekCard from '../components/dashboard/week/WeekCard.vue';
import PhaseCard from '../components/dashboard/phase/PhaseCard.vue';
import DayCard from '../components/dashboard/day/DayCard.vue';
import AchievementsList from '../components/dashboard/achievements/AchievementsList.vue';
import ProgressChart from '../components/charts/ProgressChart.vue';

// بيانات وهمية للعرض
const weeks = [
  { id: 1, title: 'الأسبوع 1', objective: 'مقدمة الأمن السيبراني', progress: 60 },
  { id: 2, title: 'الأسبوع 2', objective: 'التهديدات والهجمات', progress: 40 },
];
const phases = [
  { id: 1, title: 'مرحلة التأسيس', range: '1-17', progress: 50 },
  { id: 2, title: 'المهارات التقنية', range: '18-36', progress: 20 },
];
const days = [
  { key: 'sat', title: 'السبت', topic: 'مقدمة', tasks: [ { id: 't1', description: 'مشاهدة فيديو', type: 'Video', duration: 60 } ] },
  { key: 'sun', title: 'الأحد', topic: 'التهديدات', tasks: [ { id: 't2', description: 'قراءة مقال', type: 'Article', duration: 30 } ] },
];
const achievements = [
  { id: 'a1', title: 'أول ملاحظة', date: '2024-05-01' },
  { id: 'a2', title: 'إكمال أسبوع', date: '2024-05-07' },
];
const weekProgress = 60;
function goToWeek(id: number) { /* ربط مع التنقل */ }
function goToPhase(id: number) { /* ربط مع التنقل */ }
function goToDay(key: string) { /* ربط مع التنقل */ }
</script>