<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <svg class="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
    <div class="text-lg font-bold">{{ today }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.calendar') }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const today = ref('')
onMounted(() => {
  const d = new Date()
  today.value = d.toLocaleDateString()
})
</script>