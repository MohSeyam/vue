<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { ref } from 'vue'
import jsPDF from 'jspdf'
const plan = usePlanStore()
const exportLang = ref('en')
const exportType = ref('pdf')
const logoSvg = `<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='22' fill='#06b6d4' stroke='#fff' stroke-width='4'/><path d='M16 32L24 16L32 32' stroke='#fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>`
const day = plan.currentDay
function exportDay() {
  if (!day) return
  if (exportType.value === 'pdf') {
    const doc = new jsPDF()
    doc.addImage('data:image/svg+xml;utf8,' + encodeURIComponent(logoSvg), 'SVG', 10, 8, 18, 18)
    doc.setFontSize(18)
    doc.text(exportLang.value === 'ar' ? 'يوم الخطة' : 'Plan Day', 32, 20)
    let y = 38
    doc.setFontSize(14)
    doc.text(`${day.day[exportLang.value] || day.day.en}`, 10, y)
    y += 7
    doc.setFontSize(11)
    doc.text(`${day.topic?.[exportLang.value] || day.topic?.en || ''}`, 14, y)
    y += 7
    doc.text(`${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${day.tasks.length}`, 14, y)
    y += 7
    day.tasks.forEach((t, i) => {
      doc.text(`- ${t.description[exportLang.value] || t.description.en} (${t.type || ''}, ${t.duration} min)`, 18, y)
      y += 6
      if (y > 270) { doc.addPage(); y = 20 }
    })
    if (day.resources?.length) {
      y += 6
      doc.text(exportLang.value === 'ar' ? 'المصادر:' : 'Resources:', 14, y)
      y += 6
      day.resources.forEach(r => {
        doc.text(`- ${r.title} (${r.type})`, 18, y)
        y += 6
        if (y > 270) { doc.addPage(); y = 20 }
      })
    }
    doc.save('day.pdf')
  } else if (exportType.value === 'md') {
    let md = `![logo](data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)})\n# ${exportLang.value === 'ar' ? 'يوم الخطة' : 'Plan Day'}\n\n## ${day.day[exportLang.value] || day.day.en}\n${day.topic?.[exportLang.value] || day.topic?.en || ''}\n- ${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${day.tasks.length}\n`;
    day.tasks.forEach(t => {
      md += `  - ${t.description[exportLang.value] || t.description.en} (${t.type || ''}, ${t.duration} min)\n`
    })
    if (day.resources?.length) {
      md += `\n${exportLang.value === 'ar' ? 'المصادر:' : 'Resources:'}\n`
      day.resources.forEach(r => {
        md += `  - ${r.title} (${r.type})\n`
      })
    }
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'day.md'
    a.click()
    URL.revokeObjectURL(url)
  } else if (exportType.value === 'html') {
    let html = `<div style='font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#fff;border-radius:16px;box-shadow:0 2px 8px #0001'><div style='text-align:center;margin-bottom:16px;'>${logoSvg}</div><h2 style='color:#06b6d4'>${exportLang.value === 'ar' ? 'يوم الخطة' : 'Plan Day'}</h2>`;
    html += `<div style='font-weight:bold;font-size:1.2em'>${day.day[exportLang.value] || day.day.en}</div>`;
    html += `<div style='color:#666'>${day.topic?.[exportLang.value] || day.topic?.en || ''}</div>`;
    html += `<div style='margin:8px 0'>${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: <b>${day.tasks.length}</b></div>`;
    html += '<ul style="padding-left:18px">';
    day.tasks.forEach(t => {
      html += `<li>${t.description[exportLang.value] || t.description.en} (${t.type || ''}, ${t.duration} min)</li>`;
    })
    html += '</ul>';
    if (day.resources?.length) {
      html += `<div style='margin-top:8px'>${exportLang.value === 'ar' ? 'المصادر:' : 'Resources:'}</div><ul style="padding-left:18px">`;
      day.resources.forEach(r => {
        html += `<li>${r.title} (${r.type})</li>`;
      })
      html += '</ul>';
    }
    html += '</div>';
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'day.html'
    a.click()
    URL.revokeObjectURL(url)
  }
}
</script>
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center">
    <div class="flex gap-2 mb-2 w-full justify-between">
      <div class="flex gap-2">
        <select v-model="exportLang" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
        <select v-model="exportType" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
          <option value="pdf">PDF</option>
          <option value="md">Markdown</option>
          <option value="html">HTML</option>
        </select>
      </div>
      <button @click="exportDay" class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        {{ $t('plan.export') }}
      </button>
    </div>
    <div class="mb-4 mt-2">
      <span v-html="logoSvg" class="block mx-auto" style="width:48px;height:48px;"></span>
    </div>
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.today') }}</h3>
    <div v-if="day">
      <div class="font-bold">{{ day.day[$i18n.locale] || day.day.en }}</div>
      <div class="text-xs text-gray-500 mb-1">{{ day.topic?.[$i18n.locale] || day.topic?.en }}</div>
      <div class="text-xs mb-2">{{ $t('plan.tasks') }}: {{ day.tasks.length }}</div>
      <ul class="mb-2">
        <li v-for="t in day.tasks" :key="t.id" class="text-xs">- {{ t.description[$i18n.locale] || t.description.en }} ({{ t.type || '' }}, {{ t.duration }} min)</li>
      </ul>
      <div v-if="day.resources?.length" class="text-xs text-gray-500 mb-1">{{ $t('plan.sources') }}:</div>
      <ul v-if="day.resources?.length">
        <li v-for="r in day.resources" :key="r.title" class="text-xs">- {{ r.title }} ({{ r.type }})</li>
      </ul>
    </div>
    <div v-else class="text-xs text-gray-400">{{ $t('plan.noDay') }}</div>
  </div>
</template>