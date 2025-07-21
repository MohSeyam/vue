<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <Toast ref="toastRef" />
    <div class="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <div class="flex gap-2 flex-wrap items-center">
        <select v-model="selectedWeek" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
          <option v-for="w in weekOptions" :key="w.value" :value="w.value">{{ w.label }}</option>
        </select>
        <select v-model="selectedDayKey" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
          <option v-for="d in dayOptions" :key="d.value" :value="d.value">{{ d.label }}</option>
        </select>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button @click="openEditor()" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          إضافة تدوينة
        </button>
      </div>
    </div>
    <div class="mb-2 text-sm text-gray-500 dark:text-gray-300">عدد التدوينات: {{ filteredEntries.length }}</div>
    <JournalEntriesList :entries="filteredEntries" :search="search" @edit="editEntry" @delete="deleteEntry" />
    <JournalEntry v-if="showEditor" :entry="editingEntry" @save="saveEntry" @close="closeEditor" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import { useJournalStore } from '@/stores/useJournalStore'
import Toast from '@/components/common/Toast.vue'
import TagFilter from './TagFilter.vue'
import SearchBar from './SearchBar.vue'
import JournalEntriesList from './JournalEntriesList.vue'
import JournalEntry from './JournalEntry.vue'
import jsPDF from 'jspdf'
import TurndownService from 'turndown'
const planStore = usePlanStore()
const journalStore = useJournalStore()
const showEditor = ref(false)
const editingEntry = ref(null)
const showExport = ref(false)
const search = ref('')
const selectedTag = ref('')
const toastRef = ref()
const selectedWeek = ref('')
const selectedDayKey = ref('')
const weekOptions = computed(() => planStore.weeks.map(w => ({ label: w.title.en, value: String(w.week) })))
const dayOptions = computed(() => {
  const week = planStore.weeks.find(w => String(w.week) === selectedWeek.value)
  return week ? week.days.map(d => ({ label: d.day.en, value: d.key })) : []
})
const filteredEntries = computed(() => {
  let list = journalStore.getJournalsByDayKey(selectedDayKey.value)
  if (selectedTag.value) list = list.filter(e => e.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(e => e.content.toLowerCase().includes(q))
  }
  return list
})
const exportLang = ref('en')
onMounted(() => {
  if (!planStore.planLoaded) planStore.loadPlan()
  setTimeout(() => {
    if (planStore.weeks.length) {
      selectedWeek.value = String(planStore.weeks[0].week)
      selectedDayKey.value = planStore.weeks[0].days[0].key
    }
  }, 300)
})
function openEditor() {
  editingEntry.value = { id: '', dayKey: selectedDayKey.value, content: '', createdAt: new Date().toISOString(), tags: [] }
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
  if (!selectedWeek.value || !selectedDayKey.value) {
    toastRef.value?.show('اختر الأسبوع واليوم أولاً!', 'error')
    return
  }
  if (!entry.id) {
    journalStore.addEntry({ ...entry, dayKey: selectedDayKey.value })
    toastRef.value?.show('تمت إضافة التدوينة!', 'success')
  } else {
    // تحديث التدوينة (يمكنك إضافة منطق التحديث هنا)
    toastRef.value?.show('تم تحديث التدوينة!', 'success')
  }
  closeEditor()
}
function deleteEntry(id) {
  // حذف التدوينة (يمكنك إضافة منطق الحذف هنا)
  toastRef.value?.show('تم حذف التدوينة!', 'success')
}
function exportEntries(type) {
  showExport.value = false
  const list = filteredEntries.value
  if (!list.length) return toastRef.value?.show('لا توجد تدوينات للتصدير!', 'error')
  if (type === 'pdf') {
    const doc = new jsPDF()
    list.forEach((entry, i) => {
      const day = getDayLabel(entry.week, entry.dayKey)
      const date = getDayDate(entry.week, entry.dayKey)
      doc.setFontSize(14)
      doc.text((entry.title[exportLang.value] || entry.title.en) + ' [' + day + (date ? ' - ' + date : '') + ']', 10, 20)
      doc.setFontSize(11)
      doc.text((entry.content[exportLang.value] || entry.content.en), 10, 28)
      if (entry.tags?.length) doc.text('Tags: ' + entry.tags.join(', '), 10, 36)
      if (i < list.length - 1) doc.addPage()
    })
    doc.save('journal.pdf')
    toastRef.value?.show('تم تصدير التدوينات كـ PDF!', 'success')
  } else if (type === 'md') {
    const turndownService = new TurndownService()
    let md = ''
    list.forEach(entry => {
      const day = getDayLabel(entry.week, entry.dayKey)
      const date = getDayDate(entry.week, entry.dayKey)
      md += `# ${(entry.title[exportLang.value] || entry.title.en)}\n`;
      md += `**Day:** ${day}${date ? ' - ' + date : ''}\n`;
      md += `\n${turndownService.turndown(entry.content[exportLang.value] || entry.content.en)}\n`
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
  } else if (type === 'html') {
    let html = '<html><body>'
    list.forEach(entry => {
      const day = getDayLabel(entry.week, entry.dayKey)
      const date = getDayDate(entry.week, entry.dayKey)
      html += `<h2>${entry.title[exportLang.value] || entry.title.en} [${day}${date ? ' - ' + date : ''}]</h2>`
      html += `<div>${entry.content[exportLang.value] || entry.content.en}</div>`
      if (entry.tags?.length) html += `<div><b>Tags:</b> ${entry.tags.join(', ')}</div>`
      html += '<hr/>'
    })
    html += '</body></html>'
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'journal.html'
    a.click()
    URL.revokeObjectURL(url)
    toastRef.value?.show('تم تصدير التدوينات كـ HTML!', 'success')
  }
}
function getDayLabel(week, dayKey) {
  const w = planStore.weeks.find(w => String(w.week) === String(week))
  const d = w?.days.find(d => d.key === dayKey)
  return d ? d.day.en : dayKey
}
function getDayDate(week, dayKey) {
  const w = planStore.weeks.find(w => String(w.week) === String(week))
  const d = w?.days.find(d => d.key === dayKey)
  return d?.date
}
</script>