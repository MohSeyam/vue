<template>
  <v-container fluid class="pa-4 pa-md-8 animate-fade-in">
    <v-row>
      <v-col cols="12" md="4">
        <ProgressChart :value="weekProgress" label="التقدم الأسبوعي" />
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col v-for="week in weeks" :key="week.week" cols="12" md="6">
            <WeekCard :week-id="week.week" :week-title="week.title[lang]" :week-subtitle="week.objective[lang]" :progress="getWeekProgress(week)" @view-week="goToWeek" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col v-for="(phase, key) in phases" :key="key" cols="12" md="6">
        <PhaseCard :phase-id="String(key)" :phase-title="phase.title[lang]" :phase-range="phase.range[lang]" :progress="getPhaseProgress(String(key))" @view-phase="goToPhase" />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col v-for="day in currentWeek.days" :key="day.key" cols="12" md="4">
        <DayCard :day-key="day.key" :day-title="day.day[lang]" :day-topic="day.topic[lang]" :tasks="day.tasks" @view-day="goToDay" />
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
import { inject, computed } from 'vue';
import WeekCard from '../components/dashboard/week/WeekCard.vue';
import PhaseCard from '../components/dashboard/phase/PhaseCard.vue';
import DayCard from '../components/dashboard/day/DayCard.vue';
import AchievementsList from '../components/dashboard/achievements/AchievementsList.vue';
import ProgressChart from '../components/charts/ProgressChart.vue';
const { plan, phaseList, lang, t, setView } = inject('app') as any;
const weeks = computed(() => plan.value);
const phases = computed(() => phaseList.value);
const currentWeek = computed(() => weeks.value[0]); // يمكن تحسينه لاحقًا
const weekProgress = computed(() => getWeekProgress(currentWeek.value));
function getWeekProgress(week: any) {
  const total = week.days.reduce((acc: number, day: any) => acc + day.tasks.length, 0);
  // هنا يمكن ربط التقدم الفعلي من appState
  return total > 0 ? Math.round((week.days.reduce((acc: number, day: any) => acc + day.tasks.filter((t: any) => t.completed).length, 0) / total) * 100) : 0;
}
function getPhaseProgress(phaseKey: string) {
  const phaseWeeks = weeks.value.filter((w: any) => w.phase == phaseKey);
  const total = phaseWeeks.reduce((acc: number, w: any) => acc + w.days.reduce((a: number, d: any) => a + d.tasks.length, 0), 0);
  return total > 0 ? Math.round((phaseWeeks.reduce((acc: number, w: any) => acc + w.days.reduce((a: number, d: any) => a + d.tasks.filter((t: any) => t.completed).length, 0), 0) / total) * 100) : 0;
}
function goToPhase(phaseId: string | number) {
  setView({ page: 'week', params: { phaseId } });
}
function goToWeek(weekId: number) {
  setView({ page: 'day', params: { weekId } });
}
function goToDay(_key: string) { /* ربط مع التنقل */ }
const achievements = computed(() => [
  { id: 'a1', title: t.value['firstNote' as 'ar' | 'en'] || 'أول ملاحظة', date: '2024-05-01' },
  { id: 'a2', title: t.value['weekComplete' as 'ar' | 'en'] || 'إكمال أسبوع', date: '2024-05-07' },
]);
</script>