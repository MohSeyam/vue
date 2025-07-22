<template>
  <v-card class="note-card mb-2" elevation="6">
    <v-card-title class="d-flex align-center justify-space-between pb-0">
      <span class="font-weight-bold text-primary" v-html="highlight(getText(note.title))"></span>
      <div>
        <v-btn icon size="small" color="primary" variant="text" @click="$emit('edit', note)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon size="small" color="error" variant="text" @click="$emit('delete', note.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text class="pt-2 pb-1">
      <div class="text-body-2 text-grey-darken-2" v-html="highlight(getText(note.content))"></div>
      <div v-if="note.tags?.length" class="mt-2">
        <v-chip v-for="tag in note.tags" :key="tag" size="x-small" color="secondary" class="me-1">#{{ tag }}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { getText } from '@/utils/getText'
import type { Note } from '@/types/plan'
const props = defineProps<{ note: Note, search?: string }>()
function highlight(text: string) {
  if (!props.search) return text
  const q = props.search.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')
  return text.replace(new RegExp(q, 'gi'), m => `<mark class='bg-yellow-200 dark:bg-yellow-600 rounded'>${m}</mark>`)
}
</script>
<style scoped>
.note-card {
  border-radius: 18px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.note-card:hover {
  box-shadow: 0 6px 32px 0 #22d3ee33, 0 1.5px 6px 0 #0001;
  transform: translateY(-2px) scale(1.015);
}
</style>