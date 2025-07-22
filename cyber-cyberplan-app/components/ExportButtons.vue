<template>
  <div class="flex gap-2">
    <button @click="$emit('export-pdf')" class="px-3 py-1 bg-red-500 text-white rounded">Export PDF</button>
    <button @click="$emit('export-md')" class="px-3 py-1 bg-gray-700 text-white rounded">Export Markdown</button>
  </div>
</template>

<script setup lang="ts">
// Emits: export-pdf, export-md
</script>