<template>
  <div>
    <div class="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <div class="flex gap-2 flex-wrap">
        <TagFilter :tags="allTags" v-model:selectedTag="selectedTag" />
      </div>
      <div class="w-full md:w-64">
        <SearchBar v-model="search" />
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <NoteCard
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
        @edit="$emit('edit', note)"
        @delete="$emit('delete', note.id)"
      />
    </div>
    <div v-if="!filteredNotes.length" class="text-center text-gray-400 mt-8 text-lg font-bold">{{ $t('notebook.noNotes') }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import NoteCard from './NoteCard.vue'
import TagFilter from './TagFilter.vue'
import SearchBar from './SearchBar.vue'
import type { Note } from '@/types/plan'
import { getText } from '@/utils/getText'
const props = defineProps<{ notes: Note[] }>()
const emit = defineEmits(['edit', 'delete'])
const search = ref('')
const selectedTag = ref('')
const allTags = computed(() => Array.from(new Set(props.notes.flatMap(n => n.tags || []))))
const filteredNotes = computed(() => {
  let notes = props.notes
  if (selectedTag.value) notes = notes.filter(n => n.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    notes = notes.filter(n => getText(n.title).toLowerCase().includes(q) || getText(n.content).toLowerCase().includes(q))
  }
  return notes
})
</script>