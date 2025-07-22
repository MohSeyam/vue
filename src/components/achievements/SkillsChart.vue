<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">{{ $t('achievements.skills') }}</h3>
    <div class="flex flex-col gap-4">
      <div v-for="skill in skills" :key="skill.label" class="flex items-center gap-4">
        <span class="w-32 font-bold">{{ $t(skill.label) }}</span>
        <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div class="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-700" :style="{ width: skill.value + '%' }"></div>
        </div>
        <span class="w-10 text-xs text-gray-500 dark:text-gray-300">{{ skill.value }}%</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const skills = [
  { label: 'achievements.skill_network', value: 80 },
  { label: 'achievements.skill_linux', value: 60 },
  { label: 'achievements.skill_web', value: 40 },
  { label: 'achievements.skill_crypto', value: 30 }
]
</script>