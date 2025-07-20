<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="stat in stats" :key="stat.label" class="p-4 rounded-lg shadow bg-gradient-to-br from-blue-400 to-blue-600 text-white flex flex-col items-center">
      <div class="text-3xl mb-2">{{ stat.icon }}</div>
      <div class="text-2xl font-bold">{{ stat.value }}</div>
      <div class="text-sm">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  stats: {
    type: Array,
    default: () => [
      { icon: '✅', value: 42, label: 'Tasks Done' },
      { icon: '⏰', value: 12, label: 'Hours Learned' },
      { icon: '🏆', value: 3, label: 'Achievements' }
    ]
  }
});
</script>