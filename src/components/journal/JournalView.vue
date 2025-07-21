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
import JournalEntriesList from './JournalEntriesList.vue'
import JournalEntry from './JournalEntry.vue'
import jsPDF from 'jspdf'
const planStore = usePlanStore()
const journalStore = useJournalStore()
const showEditor = ref(false)
const editingEntry = ref<any>(null)
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
function editEntry(entry: any) {
  editingEntry.value = entry
  showEditor.value = true
}
function closeEditor() {
  showEditor.value = false
  editingEntry.value = null
}
function saveEntry(entry: any) {
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
function deleteEntry() {
  // حذف التدوينة (يمكنك إضافة منطق الحذف هنا)
  toastRef.value?.show('تم حذف التدوينة!', 'success')
}
function getDayInfo(weekNum: number, dayKey: string) {
  const w = planStore.weeks.find(w => String(w.week) === String(weekNum))
  const d = w?.days.find(d => d.key === dayKey)
  return { week: w, day: d }
}
</script>