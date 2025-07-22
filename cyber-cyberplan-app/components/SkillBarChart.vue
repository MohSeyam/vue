<template>
  <div class="w-full p-4 bg-white dark:bg-gray-800 rounded shadow">
    <h3 class="font-bold mb-2 text-lg text-center">Skill Progress</h3>
    <div v-for="skill in props.skills" :key="(skill as Skill).name" class="mb-2">
      <div class="flex justify-between mb-1">
        <span class="font-medium">{{ (skill as Skill).name }}</span>
        <span class="text-xs text-gray-500">{{ (skill as Skill).value }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-4">
        <div
          class="h-4 rounded-full transition-all duration-700"
          :style="{
            width: (skill as Skill).value + '%',
            background: (skill as Skill).color
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Skill { name: string; value: number; color: string }
const props = defineProps<{ skills: Skill[] }>();
</script>