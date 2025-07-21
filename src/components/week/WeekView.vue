<template>
  <v-container fluid class="py-8">
    <Breadcrumbs :items="[
      { text: 'الرئيسية', to: '/' },
      { text: 'نظرة على الخطة', to: '/plan' },
      { text: phase }
    ]" />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-primary mb-2">{{ phase }}</v-card-title>
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
import Breadcrumbs from '../common/Breadcrumbs.vue';
import { inject, computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const { plan, lang } = inject('app') as any;
const phaseId = computed(() => route.params.phaseId);
const weeks = computed(() => plan.value.filter((w: any) => w.phase == phaseId.value));
const phase = computed(() => weeks.value[0]?.phaseTitle || 'Phase');
function goToWeek(weekId: number) {
  router.push({ name: 'days', params: { phaseId: phaseId.value, weekId } });
}
</script>