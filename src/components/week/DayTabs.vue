<template>
  <v-tabs v-model="activeDayIndex" color="primary" grow>
    <v-tab v-for="(day, i) in days" :key="(day as any).id" :value="i">
      {{ (day as any).label || (day as any).id }}
    </v-tab>
  </v-tabs>
</template>
<script setup lang="ts">
const props = defineProps({ days: Array, activeDayIndex: Number })
const emit = defineEmits(['update:activeDayIndex'])
const activeDayIndex = defineModel('activeDayIndex', { type: Number })
</script>