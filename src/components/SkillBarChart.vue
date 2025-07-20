<template>
  <div class="w-full p-4 bg-white dark:bg-gray-800 rounded shadow">
    <h3 class="font-bold mb-2 text-lg text-center">Skill Progress</h3>
    <div v-for="skill in skills" :key="skill.name" class="mb-2">
      <div class="flex justify-between mb-1">
        <span class="font-medium">{{ skill.name }}</span>
        <span class="text-xs text-gray-500">{{ skill.value }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-4">
        <div
          class="h-4 rounded-full transition-all duration-700"
          :style="{
            width: skill.value + '%',
            background: skill.color
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  skills: {
    type: Array,
    default: () => [
      { name: 'Network', value: 80, color: '#3b82f6' },
      { name: 'Web', value: 60, color: '#f59e42' },
      { name: 'Forensics', value: 40, color: '#10b981' }
    ]
  }
});
</script>