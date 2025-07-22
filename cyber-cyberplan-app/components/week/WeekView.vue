<template>
  <v-container fluid class="py-8">
    <Breadcrumbs :items="[
      { title: 'الرئيسية', to: '/' },
      { title: 'نظرة على الخطة', to: '/plan' },
      { title: phaseTitle }
    ]" />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-primary mb-2">{{ phaseTitle }}</v-card-title>
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
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const { plan, phaseList, lang } = inject('app') as any;
const phaseId = computed(() => Array.isArray(route.params.phaseId) ? route.params.phaseId[0] : route.params.phaseId);
const weeks = computed(() => plan.value.filter((w: any) => w.phase == phaseId.value));
const phaseTitle = computed(() => phaseList.value[phaseId.value]?.title?.[lang] || 'Phase');
function goToWeek(weekId: number) {
  router.push({ name: 'days', params: { phaseId: phaseId.value, weekId } });
}
</script>