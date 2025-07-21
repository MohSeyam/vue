<template>
  <v-tabs v-model="activeDayIndex" color="primary" grow>
    <v-tab v-for="(day, i) in days" :key="day.id" :value="i">
      {{ day.label || day.id }}
    </v-tab>
  </v-tabs>
</template>
<script setup lang="ts">
const props = defineProps({ days: Array, activeDayIndex: Number })
const emit = defineEmits(['update:activeDayIndex'])
const activeDayIndex = defineModel('activeDayIndex', { type: Number })
</script>