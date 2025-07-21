<template>
  <v-container fluid class="py-8">
    <Breadcrumbs :items="[
      { title: t.home, to: '/' },
      { title: t.planOverview }
    ]" />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-primary mb-2">{{ t.planOverview }}</v-card-title>
          <v-list dense>
            <v-list-item v-for="phase in phases" :key="phase.id" @click="goToPhase(phase.id)" class="v-card--link">
              <v-list-item-title class="font-weight-bold">{{ phase.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ phase.objective }}</v-list-item-subtitle>
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
import { useRouter } from 'vue-router';
const router = useRouter();
import { useRoute } from 'vue-router';
const route = useRoute();
const { phaseList, t, lang } = inject('app') as any;
const phases = computed(() => Object.entries(phaseList.value).map(([id, phase]: [string, any]) => ({
  id,
  title: phase.title[lang],
  objective: phase.objective?.[lang] || '',
})));
function goToPhase(phaseId: string | number) {
  router.push({ name: 'weeks', params: { phaseId } });
}
function goBack() {
  router.back();
}
</script>