<template>
  <v-container fluid class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-primary mb-2">{{ weeks[0]?.phaseTitle || 'Phase' }}</v-card-title>
          <v-list dense>
            <v-list-item v-for="w in weeks" :key="w.week" @click="goToWeek(w.week)" class="v-card--link">
              <v-list-item-title class="font-weight-bold">{{ w.title[lang] }}</v-list-item-title>
              <v-list-item-subtitle>{{ w.objective[lang] }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
const { plan, view, setView, lang } = inject('app') as any;
const phaseId = computed(() => view.params?.phaseId);
const weeks = computed(() => plan.value.filter((w: any) => w.phase == phaseId.value));
function goToWeek(weekId: number) {
  setView({ page: 'day', params: { weekId } });
}
</script>