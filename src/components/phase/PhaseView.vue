<template>
  <v-container fluid class="py-8">
    <v-btn v-if="route.fullPath !== '/'" @click="goBack" color="primary" class="mb-4">رجوع</v-btn>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-primary mb-2">المراحل</v-card-title>
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
import { useRouter } from 'vue-router';
const router = useRouter();
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// Dummy phases data for demonstration, replace with real data
const phases = computed(() => [
  // ...
]);
function goToPhase(phaseId: string | number) {
  router.push({ name: 'weeks', params: { phaseId } });
}
function goBack() {
  router.back();
}
</script>