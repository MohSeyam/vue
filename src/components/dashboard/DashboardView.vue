<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 text-cyan-500 mb-6">
      <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" fill="none" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M24 12v12l8 4" stroke="currentColor" stroke-width="3" />
    </svg>
    <h1 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">{{ $t('dashboard.welcome') }}</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300">{{ $t('dashboard.simple') }}</p>
  </div>
</template>
<script setup lang="ts">
// لا حاجة لأي منطق هنا
</script>