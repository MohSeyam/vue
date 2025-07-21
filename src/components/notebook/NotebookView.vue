<template>
  <div class="max-w-5xl mx-auto py-10 px-4">
    <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
      <h1 class="text-2xl font-bold">{{ $t('notebook.title') }}</h1>
      <div class="flex gap-2 flex-wrap">
        <button @click="openGraph = true" class="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 px-3 py-2 rounded-lg shadow hover:bg-cyan-200 dark:hover:bg-cyan-800 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          {{ $t('notebook.graphTitle') }}
        </button>
        <div class="relative">
          <button @click="showExport = !showExport" class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-2 rounded-lg shadow hover:bg-green-200 dark:hover:bg-green-800 transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            {{ $t('notebook.export') }}
          </button>
          <div v-if="showExport" class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
            <button @click="exportNotes('pdf')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">PDF</button>
            <button @click="exportNotes('md')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">Markdown</button>
          </div>
        </div>
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
import { ref, computed } from 'vue'
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
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import TurndownService from 'turndown'
const store = useNotebookStore()
const showEditor = ref(false)
const editingNote = ref<Note|null>(null)
const openGraph = ref(false)
const showExport = ref(false)
const search = ref('')
const selectedTag = ref('')
const filteredNotes = computed(() => {
  let notes = store.notes
  if (selectedTag.value) notes = notes.filter(n => n.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    notes = notes.filter(n => getText(n.title).toLowerCase().includes(q) || getText(n.content).toLowerCase().includes(q))
  }
  return notes
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
function insertTemplate(tpl: Note) {
  editingNote.value = { ...tpl, id: '', tags: [] }
  showEditor.value = true
}
async function exportNotes(type: 'pdf' | 'md') {
  showExport.value = false
  const notes = filteredNotes.value
  if (!notes.length) return alert('No notes to export!')
  if (type === 'pdf') {
    const doc = new jsPDF()
    notes.forEach((note, i) => {
      doc.setFontSize(14)
      doc.text(getText(note.title), 10, 20 + i * 40)
      doc.setFontSize(11)
      doc.text(getText(note.content), 10, 28 + i * 40)
      if (note.tags?.length) doc.text('Tags: ' + note.tags.join(', '), 10, 36 + i * 40)
      if (i < notes.length - 1) doc.addPage()
    })
    doc.save('notes.pdf')
  } else if (type === 'md') {
    const turndownService = new TurndownService()
    let md = ''
    notes.forEach(note => {
      md += `# ${getText(note.title)}\n\n${turndownService.turndown(getText(note.content))}\n`
      if (note.tags?.length) md += `\n**Tags:** ${note.tags.join(', ')}\n`
      md += '\n---\n'
    })
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'notes.md'
    a.click()
    URL.revokeObjectURL(url)
  }
}
</script>
<style scoped>
.bg-primary-600 { @apply bg-blue-600; }
.bg-primary-700 { @apply bg-blue-700; }
</style>