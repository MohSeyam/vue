<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed, ref } from 'vue'
import jsPDF from 'jspdf'
const plan = usePlanStore()
const exportLang = ref('en')
const exportType = ref('pdf')
const logoSvg = `<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='22' fill='#06b6d4' stroke='#fff' stroke-width='4'/><path d='M16 32L24 16L32 32' stroke='#fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>`
const weeks = computed(() => plan.weeks.map(w => ({
  week: w.week,
  title: w.title,
  days: w.days.length,
  tasks: w.days.reduce((acc, d) => acc + d.tasks.length, 0),
  minutes: w.days.reduce((acc, d) => acc + d.tasks.reduce((tacc, t) => tacc + (t.duration || 0), 0), 0),
  sources: w.days.reduce((acc, d) => acc + (d.resources?.length || 0), 0)
})))
function exportWeek() {
  if (exportType.value === 'pdf') {
    const doc = new jsPDF()
    doc.addImage('data:image/svg+xml;utf8,' + encodeURIComponent(logoSvg), 'SVG', 10, 8, 18, 18)
    doc.setFontSize(18)
    doc.text(exportLang.value === 'ar' ? 'أسابيع الخطة' : 'Plan Weeks', 32, 20)
    let y = 38
    weeks.value.forEach(w => {
      doc.setFontSize(14)
      doc.text(`${exportLang.value === 'ar' ? 'الأسبوع' : 'Week'} ${w.week}: ${w.title[exportLang.value] || w.title.en}`, 10, y)
      y += 7
      doc.setFontSize(11)
      doc.text(`${exportLang.value === 'ar' ? 'عدد الأيام' : 'Days'}: ${w.days}`, 14, y)
      y += 6
      doc.text(`${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${w.tasks}`, 14, y)
      y += 6
      doc.text(`${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Minutes'}: ${w.minutes} min`, 14, y)
      y += 6
      doc.text(`${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: ${w.sources}`, 14, y)
      y += 10
      if (y > 270) { doc.addPage(); y = 20 }
    })
    doc.save('weeks.pdf')
  } else if (exportType.value === 'md') {
    let md = `![logo](data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)})\n# ${exportLang.value === 'ar' ? 'أسابيع الخطة' : 'Plan Weeks'}\n\n`
    weeks.value.forEach(w => {
      md += `## ${exportLang.value === 'ar' ? 'الأسبوع' : 'Week'} ${w.week}: ${w.title[exportLang.value] || w.title.en}\n- ${exportLang.value === 'ar' ? 'عدد الأيام' : 'Days'}: ${w.days}\n- ${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${w.tasks}\n- ${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Minutes'}: ${w.minutes} min\n- ${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: ${w.sources}\n\n`
    })
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'weeks.md'
    a.click()
    URL.revokeObjectURL(url)
  } else if (exportType.value === 'html') {
    let html = `<div style='font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#fff;border-radius:16px;box-shadow:0 2px 8px #0001'><div style='text-align:center;margin-bottom:16px;'>${logoSvg}</div><h2 style='color:#06b6d4'>${exportLang.value === 'ar' ? 'أسابيع الخطة' : 'Plan Weeks'}</h2>`;
    weeks.value.forEach(w => {
      html += `<div style='margin-bottom:16px'><b>${exportLang.value === 'ar' ? 'الأسبوع' : 'Week'} ${w.week}: ${w.title[exportLang.value] || w.title.en}</b><ul style='list-style:none;padding:0'>`;
      html += `<li>${exportLang.value === 'ar' ? 'عدد الأيام' : 'Days'}: <b>${w.days}</b></li>`;
      html += `<li>${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: <b>${w.tasks}</b></li>`;
      html += `<li>${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Minutes'}: <b>${w.minutes} min</b></li>`;
      html += `<li>${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: <b>${w.sources}</b></li>`;
      html += '</ul></div>';
    })
    html += '</div>';
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'weeks.html'
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
      <button @click="exportWeek" class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        {{ $t('plan.export') }}
      </button>
    </div>
    <div class="mb-4 mt-2">
      <span v-html="logoSvg" class="block mx-auto" style="width:48px;height:48px;"></span>
    </div>
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.weeksList') }}</h3>
    <ul>
      <li v-for="w in weeks" :key="w.week" class="mb-2">
        <div class="font-bold text-cyan-700 dark:text-cyan-300">{{ $t('plan.week') }} {{ w.week }} - {{ w.title[$i18n.locale] || w.title.en }}</div>
        <div class="text-xs text-gray-500">{{ $t('plan.days') }}: {{ w.days }} | {{ $t('plan.tasks') }}: {{ w.tasks }} | {{ $t('plan.totalMinutes') }}: {{ w.minutes }} | {{ $t('plan.sources') }}: {{ w.sources }}</div>
      </li>
    </ul>
  </div>
</template>