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
    <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :search="search"
        @edit="$emit('edit', note)"
        @delete="$emit('delete', note.id)"
      />
    </transition-group>
    <div v-if="!notes.length" class="text-center text-gray-400 mt-8 text-lg font-bold">{{ $t('notebook.noNotes') }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import NoteCard from './NoteCard.vue'
import TagFilter from './TagFilter.vue'
import SearchBar from './SearchBar.vue'
import type { Note } from '@/types/plan'
const props = defineProps<{ notes: Note[] }>()
const emit = defineEmits(['edit', 'delete'])
const search = ref('')
const selectedTag = ref('')
const allTags = computed(() => Array.from(new Set(props.notes.flatMap(n => n.tags || []))))
</script>
<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>