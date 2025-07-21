<template>
  <div class="max-w-5xl mx-auto py-10 px-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">{{ $t('notebook.title') }}</h1>
      <div class="flex gap-2">
        <button @click="openGraph = true" class="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 px-3 py-2 rounded-lg shadow hover:bg-cyan-200 dark:hover:bg-cyan-800 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          {{ $t('notebook.graphTitle') }}
        </button>
        <button @click="openEditor()" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          {{ $t('notebook.addNote') }}
        </button>
      </div>
    </div>
    <NoteTemplates @insert="insertTemplate" />
    <NoteGrid :notes="store.notes" @edit="editNote" @delete="deleteNote" />
    <NoteEditor
      v-if="showEditor"
      :note="editingNote"
      @save="saveNote"
      @close="closeEditor"
    />
    <GraphViewModal v-if="openGraph" @close="openGraph = false" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useNotebookStore } from '@/stores/useNotebookStore'
import { getText } from '@/utils/getText'
import NoteCard from './NoteCard.vue'
import NoteEditor from './NoteEditor.vue'
import SearchBar from './SearchBar.vue'
import NoteGrid from './NoteGrid.vue'
import NoteTemplates from './NoteTemplates.vue'
import TagFilter from './TagFilter.vue'
import GraphViewModal from './GraphViewModal.vue'
import type { Note } from '@/types/plan'
const store = useNotebookStore()
const showEditor = ref(false)
const editingNote = ref<Note|null>(null)
const openGraph = ref(false)
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
function insertTemplate(tpl: Note) {
  editingNote.value = { ...tpl, id: '', tags: [] }
  showEditor.value = true
}
</script>
<style scoped>
.bg-primary-600 { @apply bg-blue-600; }
.bg-primary-700 { @apply bg-blue-700; }
</style>