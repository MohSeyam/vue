<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <Toast ref="toastRef" />
    <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
      <h1 class="text-2xl font-bold">{{ $t('journal.title') }}</h1>
      <div class="flex gap-2 flex-wrap">
        <select v-model="selectedDay" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          <option value="">{{ $t('journal.allDays') }}</option>
          <option v-for="d in allDays" :key="d.value" :value="d.value">{{ d.label }}</option>
        </select>
        <button @click="showExport = !showExport" :disabled="!filteredEntries.length" class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-2 rounded-lg shadow hover:bg-green-200 dark:hover:bg-green-800 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          {{ $t('journal.export') }}
        </button>
        <div v-if="showExport" class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
          <button @click="exportEntries('pdf')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">PDF</button>
          <button @click="exportEntries('md')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">Markdown</button>
        </div>
        <button @click="openEditor()" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          {{ $t('journal.addEntry') }}
        </button>
      </div>
    </div>
    <div class="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <TagFilter :tags="allTags" v-model:selectedTag="selectedTag" />
      <div class="w-full md:w-64"><SearchBar v-model="search" /></div>
    </div>
    <div class="mb-2 text-sm text-gray-500 dark:text-gray-300">{{ $t('journal.entriesCount', { count: filteredEntries.length }) }}</div>
    <JournalEntriesList :entries="filteredEntries" :search="search" @edit="editEntry" @delete="deleteEntry" />
    <JournalEntry v-if="showEditor" :entry="editingEntry" @save="saveEntry" @close="closeEditor" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import Toast from '@/components/common/Toast.vue'
import TagFilter from './TagFilter.vue'
import SearchBar from './SearchBar.vue'
import JournalEntriesList from './JournalEntriesList.vue'
import JournalEntry from './JournalEntry.vue'
import jsPDF from 'jspdf'
import TurndownService from 'turndown'
const planStore = usePlanStore()
const entries = ref([
  // كل تدوينة مرتبطة بـ week و dayKey
  { id: '1', title: { en: 'First Journal', ar: 'أول تدوينة' }, content: { en: 'Today I learned...', ar: 'اليوم تعلمت...' }, week: 1, dayKey: 'sat', tags: ['reflection'] },
  { id: '2', title: { en: 'Cybersecurity Note', ar: 'ملاحظة أمنية' }, content: { en: 'Cybersecurity is important...', ar: 'الأمن السيبراني مهم...' }, week: 1, dayKey: 'sun', tags: ['cyber', 'reflection'] }
])
const showEditor = ref(false)
const editingEntry = ref(null)
const showExport = ref(false)
const search = ref('')
const selectedTag = ref('')
const toastRef = ref()
const selectedDay = ref('')
const allTags = computed(() => Array.from(new Set(entries.value.flatMap(e => e.tags || []))))
const allDays = computed(() => {
  const days: { label: string, value: string, week: number, dayKey: string }[] = []
  planStore.weeks.forEach(w => {
    w.days.forEach(d => {
      days.push({
        label: `${w.week} - ${d.day.en} (${d.key})`,
        value: `${w.week}|${d.key}`,
        week: w.week ?? 0,
        dayKey: d.key
      })
    })
  })
  return days
})
const filteredEntries = computed(() => {
  let list = entries.value
  if (selectedDay.value) {
    const [week, dayKey] = selectedDay.value.split('|')
    list = list.filter(e => String(e.week) === week && e.dayKey === dayKey)
  }
  if (selectedTag.value) list = list.filter(e => e.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(e => e.title.en.toLowerCase().includes(q) || e.content.en.toLowerCase().includes(q) || e.title.ar.toLowerCase().includes(q) || e.content.ar.toLowerCase().includes(q))
  }
  return list
})
onMounted(() => {
  if (!planStore.planLoaded) planStore.loadPlan()
})
function openEditor() {
  editingEntry.value = null
  showEditor.value = true
}
function editEntry(entry) {
  editingEntry.value = entry
  showEditor.value = true
}
function closeEditor() {
  showEditor.value = false
  editingEntry.value = null
}
function saveEntry(entry) {
  if (!selectedDay.value && !entry.id) {
    toastRef.value?.show('اختر اليوم أولاً!', 'error')
    return
  }
  if (!entry.id) {
    const [week, dayKey] = selectedDay.value.split('|')
    entry.week = Number(week)
    entry.dayKey = dayKey
    entry.id = Date.now().toString()
    entries.value.unshift(entry)
    toastRef.value?.show('تم إضافة التدوينة!', 'success')
  } else {
    const idx = entries.value.findIndex(e => e.id === entry.id)
    if (idx !== -1) entries.value[idx] = entry
    toastRef.value?.show('تم تحديث التدوينة!', 'success')
  }
  closeEditor()
}
function deleteEntry(id) {
  entries.value = entries.value.filter(e => e.id !== id)
  toastRef.value?.show('تم حذف التدوينة!', 'success')
}
function exportEntries(type) {
  showExport.value = false
  const list = filteredEntries.value
  if (!list.length) return toastRef.value?.show('لا توجد تدوينات للتصدير!', 'error')
  if (type === 'pdf') {
    const doc = new jsPDF()
    list.forEach((entry, i) => {
      doc.setFontSize(14)
      doc.text(entry.title.en, 10, 20 + i * 40)
      doc.setFontSize(11)
      doc.text(entry.content.en, 10, 28 + i * 40)
      if (entry.tags?.length) doc.text('Tags: ' + entry.tags.join(', '), 10, 36 + i * 40)
      if (i < list.length - 1) doc.addPage()
    })
    doc.save('journal.pdf')
    toastRef.value?.show('تم تصدير التدوينات كـ PDF!', 'success')
  } else if (type === 'md') {
    const turndownService = new TurndownService()
    let md = ''
    list.forEach(entry => {
      md += `# ${entry.title.en}\n\n${turndownService.turndown(entry.content.en)}\n`
      if (entry.tags?.length) md += `\n**Tags:** ${entry.tags.join(', ')}\n`
      md += '\n---\n'
    })
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'journal.md'
    a.click()
    URL.revokeObjectURL(url)
    toastRef.value?.show('تم تصدير التدوينات كـ Markdown!', 'success')
  }
}
</script>