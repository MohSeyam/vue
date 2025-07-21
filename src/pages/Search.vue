<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <AdvancedSearch :items="items" :tags="tags" />
  </v-container>
</template>
<script setup lang="ts">
import AdvancedSearch from '../components/search/AdvancedSearch.vue';
const items = [
  { id: 'n1', title: 'ملاحظة حول الأمن السيبراني', date: '2024-05-01', tags: ['أمن', 'ملاحظة'] },
  { id: 'j1', title: 'يومية السبت', date: '2024-05-02', tags: ['يومية'] },
];
const tags = ['أمن', 'ملاحظة', 'يومية'];
</script>