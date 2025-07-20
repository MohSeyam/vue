<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded shadow mb-2 flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <h3 class="font-bold text-lg">{{ note.title }}</h3>
      <span class="text-xs text-gray-500">{{ note.type }}</span>
    </div>
    <div class="text-gray-700 dark:text-gray-200 text-sm line-clamp-2">{{ note.content }}</div>
    <div class="flex flex-wrap gap-1">
      <span v-for="tag in note.tags" :key="tag" class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">#{{ tag }}</span>
    </div>
    <div class="flex gap-2 justify-end">
      <button @click="$emit('edit', note)" class="text-blue-500">Edit</button>
      <button @click="$emit('delete', note)" class="text-red-500">Delete</button>
      <button @click="$emit('export', note)" class="text-green-500">Export</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
});
</script>