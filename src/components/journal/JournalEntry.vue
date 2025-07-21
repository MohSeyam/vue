<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-all cursor-pointer" @click="$emit('toggle')">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-lg">{{ entry.title.en }}</h2>
        <span class="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 px-2 py-1 rounded">{{ dayLabel }}<span v-if="dayDate"> • {{ dayDate }}</span></span>
      </div>
      <div class="flex gap-2">
        <button @click.stop="$emit('edit')" class="text-gray-400 hover:text-cyan-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6v-6H3v6z"/></svg></button>
        <button @click.stop="$emit('delete')" class="text-gray-400 hover:text-red-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>
    </div>
    <transition name="expand">
      <div v-if="expanded" class="mt-3">
        <div class="flex gap-2 mb-2">
          <button @click.stop="copyContent" class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-cyan-100 dark:hover:bg-cyan-800">{{ $t('journal.copy') }}</button>
          <button @click.stop="exportEntry('md')" class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-purple-100 dark:hover:bg-purple-800">MD</button>
          <button @click.stop="exportEntry('pdf')" class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-green-100 dark:hover:bg-green-800">PDF</button>
        </div>
        <div :dir="isArabic ? 'rtl' : 'ltr'" v-html="renderedContent" class="prose dark:prose-invert max-w-none"></div>
        <div v-if="entry.tags?.length" class="mt-2 flex flex-wrap gap-1">
          <span v-for="tag in entry.tags" :key="tag" class="bg-cyan-200 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded text-xs font-bold">#{{ tag }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import jsPDF from 'jspdf'
import TurndownService from 'turndown'
const props = defineProps<{ entry: any, dayLabel: string, dayDate?: string, expanded: boolean }>()
const { locale, t } = useI18n()
const isArabic = computed(() => locale.value === 'ar')
const renderedContent = computed(() => marked.parse(props.entry.content[locale.value] || props.entry.content.en))
function copyContent() {
  navigator.clipboard.writeText(props.entry.content[locale.value] || props.entry.content.en)
}
function exportEntry(type: 'md' | 'pdf') {
  if (type === 'md') {
    const turndownService = new TurndownService()
    let md = `# ${props.entry.title[locale.value] || props.entry.title.en}\n\n${turndownService.turndown(props.entry.content[locale.value] || props.entry.content.en)}\n`
    if (props.entry.tags?.length) md += `\n**Tags:** ${props.entry.tags.join(', ')}\n`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'entry.md'
    a.click()
    URL.revokeObjectURL(url)
  } else if (type === 'pdf') {
    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text(props.entry.title[locale.value] || props.entry.title.en, 10, 20)
    doc.setFontSize(11)
    doc.text(props.entry.content[locale.value] || props.entry.content.en, 10, 28)
    if (props.entry.tags?.length) doc.text('Tags: ' + props.entry.tags.join(', '), 10, 36)
    doc.save('entry.pdf')
  }
}
</script>
<style scoped>
.expand-enter-active, .expand-leave-active { transition: max-height 0.3s, opacity 0.3s; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }
.expand-enter-to, .expand-leave-from { max-height: 500px; opacity: 1; }
</style>