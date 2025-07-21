<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <ExportMenu :data="achievements" filename="achievements" />
      </v-col>
    </v-row>
    <AchievementsList :achievements="achievements" />
  </v-container>
</template>
<script setup lang="ts">
import AchievementsList from '../components/dashboard/achievements/AchievementsList.vue';
import ExportMenu from '../components/export/ExportMenu.vue';
const achievements = [
  { id: 'a1', title: 'أول ملاحظة', date: '2024-05-01' },
  { id: 'a2', title: 'إكمال أسبوع', date: '2024-05-07' },
];
</script>