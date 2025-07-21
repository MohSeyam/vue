<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <Toast ref="toastRef" />
    <div class="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <div class="flex gap-2 flex-wrap items-center">
        <div class="flex gap-1">
          <button v-for="w in allWeeks" :key="w.value" @click="selectedWeek = w.value" :class="[selectedWeek === w.value ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-3 py-1 rounded-full text-xs font-bold transition hover:bg-cyan-400']">
            {{ w.label }}
          </button>
        </div>
        <div class="flex gap-1">
          <button v-for="d in weekDays" :key="d.value" @click="selectedDayKey = d.value" :class="[selectedDayKey === d.value ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-3 py-1 rounded-full text-xs font-bold transition hover:bg-purple-400']">
            {{ d.label }}
          </button>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap">
        <div class="relative">
          <button @click="showExport = !showExport" :disabled="!filteredEntries.length" class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-2 rounded-lg shadow hover:bg-green-200 dark:hover:bg-green-800 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            {{ $t('journal.export') }}
          </button>
          <div v-if="showExport" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded shadow-lg z-10 p-2">
            <div class="mb-2 flex gap-2 items-center">
              <span class="text-xs">{{ $t('journal.exportLang') }}</span>
              <select v-model="exportLang" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <button @click="exportEntries('pdf')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">PDF</button>
            <button @click="exportEntries('md')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">Markdown</button>
            <button @click="exportEntries('html')" class="block w-full text-left px-4 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-900">HTML</button>
          </div>
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
  { id: '1', title: { en: 'First Journal', ar: 'أول تدوينة' }, content: { en: 'Today I learned...', ar: 'اليوم تعلمت...' }, week: 1, dayKey: 'sat', tags: ['reflection'] },
  { id: '2', title: { en: 'Cybersecurity Note', ar: 'ملاحظة أمنية' }, content: { en: 'Cybersecurity is important...', ar: 'الأمن السيبراني مهم...' }, week: 1, dayKey: 'sun', tags: ['cyber', 'reflection'] }
])
const showEditor = ref(false)
const editingEntry = ref(null)
const showExport = ref(false)
const search = ref('')
const selectedTag = ref('')
const toastRef = ref()
const selectedWeek = ref('')
const selectedDayKey = ref('')
const allTags = computed(() => Array.from(new Set(entries.value.flatMap(e => e.tags || []))))
const allWeeks = computed(() => planStore.weeks.map(w => ({ label: w.title.en, value: String(w.week) })))
const weekDays = computed(() => {
  const week = planStore.weeks.find(w => String(w.week) === selectedWeek.value)
  return week ? week.days.map(d => ({ label: d.day.en, value: d.key })) : []
})
const filteredEntries = computed(() => {
  let list = entries.value
  if (selectedWeek.value && selectedDayKey.value) {
    list = list.filter(e => String(e.week) === selectedWeek.value && e.dayKey === selectedDayKey.value)
  }
  if (selectedTag.value) list = list.filter(e => e.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(e => e.title.en.toLowerCase().includes(q) || e.content.en.toLowerCase().includes(q) || e.title.ar.toLowerCase().includes(q) || e.content.ar.toLowerCase().includes(q))
  }
  return list
})
const exportLang = ref('en')
onMounted(() => {
  if (!planStore.planLoaded) planStore.loadPlan()
  setTimeout(() => {
    // تحديد الأسبوع واليوم الحالي تلقائيًا
    const today = new Date()
    const jsDay = today.getDay() // 0:Sun ... 6:Sat
    const dayMap = ['sun','mon','tue','wed','thu','fri','sat']
    let found = false
    for (const w of planStore.weeks) {
      for (const d of w.days) {
        if (d.key === dayMap[jsDay]) {
          selectedWeek.value = String(w.week)
          selectedDayKey.value = d.key
          found = true
          break
        }
      }
      if (found) break
    }
    if (!found && planStore.weeks.length) {
      selectedWeek.value = String(planStore.weeks[0].week)
      selectedDayKey.value = planStore.weeks[0].days[0].key
    }
  }, 300)
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
  if (!selectedWeek.value || !selectedDayKey.value) {
    toastRef.value?.show('اختر الأسبوع واليوم أولاً!', 'error')
    return
  }
  if (!entry.id) {
    entry.week = Number(selectedWeek.value)
    entry.dayKey = selectedDayKey.value
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