<template>
  <div class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <svg class="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>
    <div class="text-lg font-bold">{{ $t('dashboard.currentPhase') }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ $t('dashboard.phase') }} 1</div>
  </div>
</template>
<script setup lang="ts">
// يمكن ربط اسم المرحلة لاحقًا من store
</script>