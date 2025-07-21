<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <v-row>
      <v-col cols="12" md="4" v-for="skill in skills" :key="skill.name">
        <ProgressChart :value="skill.value" :label="skill.name" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import ProgressChart from '../components/charts/ProgressChart.vue';
const skills = [
  { name: 'Network', value: 80 },
  { name: 'Web', value: 60 },
  { name: 'Forensics', value: 40 },
];
</script>