<template>
  <div class="max-w-5xl mx-auto py-10 px-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">{{ $t('notebook.title') }}</h1>
      <button @click="openEditor()" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        {{ $t('notebook.addNote') }}
      </button>
    </div>
    <SearchBar v-model="search" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <NoteCard
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
        @edit="editNote"
        @delete="deleteNote"
      />
    </div>
    <div v-if="!filteredNotes.length" class="text-center text-gray-400 mt-8">{{ $t('notebook.noNotes') }}</div>
    <NoteEditor
      v-if="showEditor"
      :note="editingNote"
      @save="saveNote"
      @close="closeEditor"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNotebookStore } from '@/stores/useNotebookStore'
import { getText } from '@/utils/getText'
import NoteCard from './NoteCard.vue'
import NoteEditor from './NoteEditor.vue'
import SearchBar from './SearchBar.vue'
import type { LocalizedString, Note } from '@/types/plan'

const store = useNotebookStore()
const search = ref('')
const showEditor = ref(false)
const editingNote = ref<Note|null>(null)

const filteredNotes = computed(() => {
  if (!search.value) return store.notes
  const q = search.value.toLowerCase()
  return store.notes.filter(note =>
    getText(note.title).toLowerCase().includes(q) ||
    getText(note.content).toLowerCase().includes(q)
  )
})

function openEditor() {
  editingNote.value = null
  showEditor.value = true
}
function editNote(note: Note) {
  editingNote.value = note
  showEditor.value = true
}
function closeEditor() {
  showEditor.value = false
  editingNote.value = null
}
function saveNote(note: Note) {
  if (note.id) store.updateNote(note)
  else store.addNote(note)
  closeEditor()
}
function deleteNote(id: string) {
  store.deleteNote(id)
}
</script>
<style scoped>
.bg-primary-600 { @apply bg-blue-600; }
.bg-primary-700 { @apply bg-blue-700; }
</style>