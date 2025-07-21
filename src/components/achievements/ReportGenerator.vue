<template>
  <div class="flex gap-4 mt-6 justify-center">
    <select v-model="exportLang" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
    <button @click="exportAchievements('pdf')" class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
      PDF
    </button>
    <button @click="exportAchievements('md')" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
      Markdown
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import { useNotebookStore } from '@/stores/useNotebookStore'
import { useJournalStore } from '@/stores/useJournalStore'
import jsPDF from 'jspdf'
const planStore = usePlanStore()
const notebookStore = useNotebookStore()
const journalStore = useJournalStore()
const exportLang = ref('en')
const totalTasks = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.tasks?.length || 0), 0), 0))
const completedTasks = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.tasks?.filter(t => t.done).length || 0), 0), 0))
const progress = computed(() => totalTasks.value ? Math.round((completedTasks.value / totalTasks.value) * 100) : 0)
const notesCount = computed(() => notebookStore.notes.length)
const journalCount = computed(() => journalStore.entries.length)
const labels = computed(() => {
  return {
    en: {
      title: 'Achievements Report',
      totalTasks: 'Total Tasks',
      completedTasks: 'Completed Tasks',
      progress: 'Progress',
      notes: 'Notes',
      journals: 'Journal Entries'
    },
    ar: {
      title: 'تقرير الإنجازات',
      totalTasks: 'إجمالي المهام',
      completedTasks: 'المهام المنجزة',
      progress: 'نسبة الإنجاز',
      notes: 'الملاحظات',
      journals: 'تدوينات اليومية'
    }
  }[exportLang.value] || {
    title: 'Achievements Report',
    totalTasks: 'Total Tasks',
    completedTasks: 'Completed Tasks',
    progress: 'Progress',
    notes: 'Notes',
    journals: 'Journal Entries'
  }
})
function exportAchievements(type: 'pdf' | 'md') {
  if (type === 'pdf') {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(labels.value.title, 10, 20)
    doc.setFontSize(13)
    doc.text(`${labels.value.totalTasks}: ${totalTasks.value}`, 10, 40)
    doc.text(`${labels.value.completedTasks}: ${completedTasks.value}`, 10, 50)
    doc.text(`${labels.value.progress}: ${progress.value}%`, 10, 60)
    doc.text(`${labels.value.notes}: ${notesCount.value}`, 10, 70)
    doc.text(`${labels.value.journals}: ${journalCount.value}`, 10, 80)
    doc.save('achievements.pdf')
  } else if (type === 'md') {
    let md = `# ${labels.value.title}\n\n- ${labels.value.totalTasks}: ${totalTasks.value}\n- ${labels.value.completedTasks}: ${completedTasks.value}\n- ${labels.value.progress}: ${progress.value}%\n- ${labels.value.notes}: ${notesCount.value}\n- ${labels.value.journals}: ${journalCount.value}\n`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'achievements.md'
    a.click()
    URL.revokeObjectURL(url)
  }
}
</script>