<template>
  <div class="flex gap-4 mt-6 justify-center">
    <button class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
      {{ $t('achievements.exportPDF') }}
    </button>
    <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
      {{ $t('achievements.exportMD') }}
    </button>
  </div>
</template>
<script setup lang="ts">
// واجهة فقط حالياً
</script>