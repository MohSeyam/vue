<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <ProgressChart :value="progress" label="إجمالي التقدم" />
      </v-col>
      <v-col cols="12" md="6">
        <ExportMenu :data="settingsData" filename="settings" />
      </v-col>
    </v-row>
    <v-card class="pa-6 mx-auto" max-width="500">
      <v-card-title class="font-weight-bold text-primary">{{ t.settings }}</v-card-title>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12">
          <v-select
            :label="t.theme"
            :items="themeOptions"
            v-model="theme"
            @update:modelValue="toggleTheme"
          />
        </v-col>
        <v-col cols="12">
          <v-select
            :label="t.language"
            :items="langOptions"
            v-model="lang"
            @update:modelValue="toggleLang"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
import ProgressChart from '../components/charts/ProgressChart.vue';
import ExportMenu from '../components/export/ExportMenu.vue';
const { lang, theme, t, toggleLang, toggleTheme, appState } = inject('app') as any;
const themeOptions = [
  { title: t.value.themeLight, value: 'light' },
  { title: t.value.themeDark, value: 'dark' },
];
const langOptions = [
  { title: 'العربية', value: 'ar' },
  { title: 'English', value: 'en' },
];
const progress = computed(() => {
  // مثال: نسبة التقدم الكلية من appState
  if (!appState.value?.progress) return 0;
  let total = 0, completed = 0;
  Object.values(appState.value.progress).forEach((w: any) => {
    Object.values(w.days).forEach((d: any) => {
      total += d.tasks.length;
      completed += d.tasks.filter((s: string) => s === 'completed').length;
    });
  });
  return total > 0 ? Math.round((completed / total) * 100) : 0;
});
const settingsData = computed(() => ({ theme: theme.value, lang: lang.value }));
</script>