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
import { computed, inject } from 'vue';
const { t, appState } = inject('app') as any;
// استخراج الإنجازات ديناميكيًا (مثال: أول ملاحظة، إكمال أسبوع)
const achievements = computed(() => {
  const list = [];
  if (appState.value?.notes) {
    const firstNote = Object.values(appState.value.notes).some((w: any) => Object.values(w.days).some((d: any) => Object.keys(d).length > 0));
    if (firstNote) list.push({ id: 'a1', title: t.value['firstNote'] || 'أول ملاحظة', date: '2024-05-01' });
  }
  if (appState.value?.progress) {
    const weekComplete = Object.values(appState.value.progress).some((w: any) => Object.values(w.days).every((d: any) => d.tasks.every((s: string) => s === 'completed')));
    if (weekComplete) list.push({ id: 'a2', title: t.value['weekComplete'] || 'إكمال أسبوع', date: '2024-05-07' });
  }
  return list;
});
</script>