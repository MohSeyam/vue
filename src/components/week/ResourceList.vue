<template>
  <v-list dense>
    <v-list-item v-for="res in resources" :key="res.url">
      <v-list-item-icon><v-icon color="secondary">mdi-link-variant</v-icon></v-list-item-icon>
      <v-list-item-title>
        <a :href="res.url" target="_blank" class="text-primary font-bold hover:underline">{{ res.title }}</a>
      </v-list-item-title>
      <v-list-item-subtitle>{{ res.type }}</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<script setup lang="ts">
const props = defineProps({ resources: Array })
</script>