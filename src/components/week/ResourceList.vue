<template>
  <div>
    <div v-if="resources && resources.length > 0" class="grid grid-cols-1 gap-4">
      <div v-for="resource in resources" :key="resource.id" class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow hover:scale-105 transition">
        <a :href="resource.url" target="_blank" rel="noopener" class="flex-1 font-bold text-cyan-600 dark:text-cyan-300 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-block mr-2 text-purple-400 align-middle">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
          </svg>
          {{ resource.title }}
        </a>
        <a :href="resource.url" target="_blank" rel="noopener" class="text-xs text-gray-400 hover:text-cyan-500 transition">{{ $t('resources.open') }}</a>
      </div>
    </div>
    <div v-else class="text-center text-gray-400 py-4">{{ $t('resources.noResources') }}</div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
defineProps<{ resources: { id: string; title: string; url: string }[] }>()
useI18n()
</script>