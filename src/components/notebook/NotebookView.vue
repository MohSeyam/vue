<template>
  <div class="max-w-5xl mx-auto py-10 px-4">
    <Toast ref="toastRef" />
    <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
      <h1 class="text-2xl font-bold">{{ t('notebook.title') }}</h1>
      <div class="flex gap-2 flex-wrap">
        <select v-model="selectedWeek" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
          <option v-for="w in weekOptions" :key="w.value" :value="w.value">{{ w.label }}</option>
        </select>
        <select v-model="selectedDayKey" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
          <option v-for="d in dayOptions" :key="d.value" :value="d.value">{{ d.label }}</option>
        </select>
        <select v-model="selectedTaskId" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
          <option v-for="t in taskOptions" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>
        <button @click="openGraph = true" class="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 px-3 py-2 rounded-lg shadow hover:bg-cyan-200 dark:hover:bg-cyan-800 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          {{ t('notebook.graphTitle') }}
        </button>
        <div class="relative" @click.outside="showExport = false">
          <button :disabled="!filteredNotes.length" @click="showExport = !showExport" class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-2 rounded-lg shadow hover:bg-green-200 dark:hover:bg-green-800 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            {{ t('notebook.export') }}
          </button>
          <div v-if="showExport" class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
            <button @click="exportNotes('pdf')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">PDF</button>
            <button @click="exportNotes('md')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">Markdown</button>
          </div>
        </div>
        <button @click="openEditor()" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          {{ t('notebook.addNote') }}
        </button>
      </div>
    </div>
    <div class="mb-2 text-sm text-gray-500 dark:text-gray-300">{{ t('notebook.notesCount', { count: filteredNotes.length }) }}</div>
    <NoteTemplates @insert="insertTemplate" />
    <NoteGrid :notes="filteredNotes" :search="search" @edit="editNote" @delete="deleteNote" />
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
import { ref, computed, onMounted } from 'vue'
import { useNotebookStore } from '@/stores/useNotebookStore'
import { usePlanStore } from '@/stores/usePlanStore'
import { getText } from '@/utils/getText'
import Toast from '@/components/common/Toast.vue'
import NoteEditor from './NoteEditor.vue'
import NoteGrid from './NoteGrid.vue'
import NoteTemplates from './NoteTemplates.vue'
import GraphViewModal from './GraphViewModal.vue'
import type { Note } from '@/types/plan'
import jsPDF from 'jspdf'
import TurndownService from 'turndown'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useNotebookStore()
const planStore = usePlanStore()
const showEditor = ref(false)
const editingNote = ref<Note|null>(null)
const openGraph = ref(false)
const showExport = ref(false)
const search = ref('')
const selectedTag = ref('')
const toastRef = ref()
// اختيار الأسبوع/اليوم/المهمة
const selectedWeek = ref('')
const selectedDayKey = ref('')
const selectedTaskId = ref('')
const weekOptions = computed(() => planStore.weeks.map(w => ({ label: getText(w.title), value: String(w.week) })))
const dayOptions = computed(() => {
  const week = planStore.weeks.find(w => String(w.week) === selectedWeek.value)
  return week ? week.days.map(d => ({ label: getText(d.day), value: d.key })) : []
})
const taskOptions = computed(() => {
  const week = planStore.weeks.find(w => String(w.week) === selectedWeek.value)
  const day = week?.days.find(d => d.key === selectedDayKey.value)
  return day ? day.tasks.map(t => ({ label: getText(t.description), value: t.id })) : []
})
const filteredNotes = computed(() => {
  let notes = store.getNotesByTaskId(selectedTaskId.value)
  if (selectedTag.value) notes = notes.filter(n => n.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    notes = notes.filter(n => getText(n.title).toLowerCase().includes(q) || getText(n.content).toLowerCase().includes(q))
  }
  return notes
})
const exportLang = ref('en')
function getTaskInfo(taskId: string) {
  for (const w of planStore.weeks) {
    for (const d of w.days) {
      const t = d.tasks.find(t => t.id === taskId)
      if (t) return {
        week: w,
        day: d,
        task: t
      }
    }
  }
  return null
}
onMounted(() => {
  if (!planStore.planLoaded) planStore.loadPlan()
  setTimeout(() => {
    if (planStore.weeks.length) {
      selectedWeek.value = String(planStore.weeks[0].week)
      selectedDayKey.value = planStore.weeks[0].days[0].key
      selectedTaskId.value = planStore.weeks[0].days[0].tasks[0]?.id || ''
    }
  }, 300)
})
function openEditor() {
  editingNote.value = { id: '', taskId: selectedTaskId.value, title: { en: '', ar: '' }, content: { en: '', ar: '' }, tags: [] }
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
  else store.addNote({ ...note, taskId: selectedTaskId.value || '' })
  closeEditor()
  toastRef.value?.show(t('notebook.toastSaved'), 'success')
}
function deleteNote(id: string) {
  store.deleteNote(id)
  toastRef.value?.show(t('notebook.toastDeleted'), 'success')
}
function insertTemplate(tpl: Note) {
  editingNote.value = { ...tpl, id: '', tags: [], taskId: selectedTaskId.value || '' }
  showEditor.value = true
  toastRef.value?.show(t('notebook.toastTemplate'), 'info')
}
async function exportNotes(type: 'pdf' | 'md') {
  showExport.value = false
  const notes = filteredNotes.value
  if (!notes.length) return toastRef.value?.show(t('notebook.toastNoNotes'), 'error')
  if (type === 'pdf') {
    const doc = new jsPDF()
    notes.forEach((note, i) => {
      const info = getTaskInfo(note.taskId || '')
      const title = getText(note.title, exportLang.value)
      const content = getText(note.content, exportLang.value)
      let header = ''
      if (info) {
        header = `${getText(info.week.title)} / ${getText(info.day.day)} / ${getText(info.task.description)}`
      }
      doc.setFontSize(12)
      doc.text(header, 10, 16 + i * 50)
      doc.setFontSize(14)
      doc.text(title, 10, 24 + i * 50)
      doc.setFontSize(11)
      doc.text(content, 10, 32 + i * 50)
      if (note.tags?.length) doc.text('Tags: ' + note.tags.join(', '), 10, 40 + i * 50)
      if (i < notes.length - 1) doc.addPage()
    })
    doc.save('notes.pdf')
    toastRef.value?.show(t('notebook.toastExportedPDF'), 'success')
  } else if (type === 'md') {
    const turndownService = new TurndownService()
    let md = ''
    notes.forEach(note => {
      const info = getTaskInfo(note.taskId || '')
      let header = ''
      if (info) {
        header = `> ${getText(info.week.title, exportLang.value)} / ${getText(info.day.day, exportLang.value)} / ${getText(info.task.description, exportLang.value)}`
      }
      md += `${header}\n# ${getText(note.title, exportLang.value)}\n\n${turndownService.turndown(getText(note.content, exportLang.value))}\n`
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
    toastRef.value?.show(t('notebook.toastExportedMD'), 'success')
  }
}
</script>
<style scoped>
.bg-primary-600 { @apply bg-blue-600; }
.bg-primary-700 { @apply bg-blue-700; }
</style>