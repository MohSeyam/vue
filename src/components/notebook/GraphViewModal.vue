<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-900 rounded-xl p-8 w-full max-w-lg shadow-2xl relative flex flex-col items-center">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
      <svg class="w-24 h-24 mb-4 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" stroke-dasharray="4 4"/><path d="M24 8v16l12 8" stroke-linecap="round"/></svg>
      <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ $t('notebook.graphTitle') }}</h2>
      <p class="text-gray-500 dark:text-gray-300 mb-4 text-center">{{ $t('notebook.graphDesc') }}</p>
      <div class="text-gray-400 text-sm">(Graph visualization coming soon...)</div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Placeholder فقط
</script>