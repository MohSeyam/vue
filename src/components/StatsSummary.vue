<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="stat in props.stats" :key="(stat as Stat).label" class="p-4 rounded-lg shadow bg-gradient-to-br from-blue-400 to-blue-600 text-white flex flex-col items-center">
      <div class="text-3xl mb-2">{{ (stat as Stat).icon }}</div>
      <div class="text-2xl font-bold">{{ (stat as Stat).value }}</div>
      <div class="text-sm">{{ (stat as Stat).label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stat { icon: string; value: number; label: string }
const props = defineProps<{ stats: Stat[] }>();
</script>