<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow relative group transition hover:scale-[1.02]">
    <button @click="$emit('edit', note)" class="absolute top-2 right-10 text-gray-400 hover:text-primary-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6v-6H3v6z"/></svg></button>
    <button @click="$emit('delete', note.id)" class="absolute top-2 right-2 text-gray-400 hover:text-red-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
    <h2 class="font-bold text-lg mb-2">{{ getText(note.title) }}</h2>
    <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ getText(note.content) }}</p>
    <div v-if="note.tags?.length" class="mt-2 text-xs text-gray-400">{{ note.tags.join(', ') }}</div>
  </div>
</template>
<script setup lang="ts">
import { getText } from '@/utils/getText'
import type { Note } from '@/types/plan'

defineProps<{ note: Note }>()
</script>