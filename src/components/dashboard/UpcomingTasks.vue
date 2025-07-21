<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <svg class="w-8 h-8 text-pink-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
    <div class="text-lg font-bold">{{ $t('dashboard.noUpcoming') }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.upcoming') }}</div>
  </div>
</template>
<script setup lang="ts">
// لا حاجة لمنطق حقيقي هنا
</script>