<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed, ref } from 'vue'
import jsPDF from 'jspdf'
const plan = usePlanStore()
const exportLang = ref('en')
const exportType = ref('pdf')
const logoSvg = `<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='22' fill='#06b6d4' stroke='#fff' stroke-width='4'/><path d='M16 32L24 16L32 32' stroke='#fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>`
const phases = computed(() => {
  const map = new Map<number, { phase: number, weeks: number, tasks: number, minutes: number, sources: number }>()
  for (const w of plan.weeks) {
    if (!map.has(w.phase)) map.set(w.phase, { phase: w.phase, weeks: 0, tasks: 0, minutes: 0, sources: 0 })
    const p = map.get(w.phase)
    p.weeks++
    p.tasks += w.days.reduce((acc, d) => acc + d.tasks.length, 0)
    p.minutes += w.days.reduce((acc, d) => acc + d.tasks.reduce((tacc, t) => tacc + (t.duration || 0), 0), 0)
    p.sources += w.days.reduce((acc, d) => acc + (d.resources?.length || 0), 0)
  }
  return Array.from(map.values())
})
function exportPhase() {
  if (exportType.value === 'pdf') {
    const doc = new jsPDF()
    doc.addImage('data:image/svg+xml;utf8,' + encodeURIComponent(logoSvg), 'SVG', 10, 8, 18, 18)
    doc.setFontSize(18)
    doc.text(exportLang.value === 'ar' ? 'مراحل الخطة' : 'Plan Phases', 32, 20)
    let y = 38
    phases.value.forEach(p => {
      doc.setFontSize(14)
      doc.text(`${exportLang.value === 'ar' ? 'المرحلة' : 'Phase'} ${p.phase}`, 10, y)
      y += 7
      doc.setFontSize(11)
      doc.text(`${exportLang.value === 'ar' ? 'عدد الأسابيع' : 'Weeks'}: ${p.weeks}`, 14, y)
      y += 6
      doc.text(`${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${p.tasks}`, 14, y)
      y += 6
      doc.text(`${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Minutes'}: ${p.minutes} min`, 14, y)
      y += 6
      doc.text(`${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: ${p.sources}`, 14, y)
      y += 10
      if (y > 270) { doc.addPage(); y = 20 }
    })
    doc.save('phases.pdf')
  } else if (exportType.value === 'md') {
    let md = `![logo](data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)})\n# ${exportLang.value === 'ar' ? 'مراحل الخطة' : 'Plan Phases'}\n\n`
    phases.value.forEach(p => {
      md += `## ${exportLang.value === 'ar' ? 'المرحلة' : 'Phase'} ${p.phase}\n- ${exportLang.value === 'ar' ? 'عدد الأسابيع' : 'Weeks'}: ${p.weeks}\n- ${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${p.tasks}\n- ${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Minutes'}: ${p.minutes} min\n- ${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: ${p.sources}\n\n`
    })
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'phases.md'
    a.click()
    URL.revokeObjectURL(url)
  } else if (exportType.value === 'html') {
    let html = `<div style='font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#fff;border-radius:16px;box-shadow:0 2px 8px #0001'><div style='text-align:center;margin-bottom:16px;'>${logoSvg}</div><h2 style='color:#06b6d4'>${exportLang.value === 'ar' ? 'مراحل الخطة' : 'Plan Phases'}</h2>`;
    phases.value.forEach(p => {
      html += `<div style='margin-bottom:16px'><b>${exportLang.value === 'ar' ? 'المرحلة' : 'Phase'} ${p.phase}</b><ul style='list-style:none;padding:0'>`;
      html += `<li>${exportLang.value === 'ar' ? 'عدد الأسابيع' : 'Weeks'}: <b>${p.weeks}</b></li>`;
      html += `<li>${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: <b>${p.tasks}</b></li>`;
      html += `<li>${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Minutes'}: <b>${p.minutes} min</b></li>`;
      html += `<li>${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: <b>${p.sources}</b></li>`;
      html += '</ul></div>';
    })
    html += '</div>';
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'phases.html'
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
      <button @click="exportPhase" class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        {{ $t('plan.export') }}
      </button>
    </div>
    <div class="mb-4 mt-2">
      <span v-html="logoSvg" class="block mx-auto" style="width:48px;height:48px;"></span>
    </div>
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.phases') }}</h3>
    <ul>
      <li v-for="p in phases" :key="p.phase" class="mb-2">
        <div class="font-bold text-cyan-700 dark:text-cyan-300">{{ $t('plan.phase') }} {{ p.phase }}</div>
        <div class="text-xs text-gray-500">{{ $t('plan.weeks') }}: {{ p.weeks }} | {{ $t('plan.tasks') }}: {{ p.tasks }} | {{ $t('plan.totalMinutes') }}: {{ p.minutes }} | {{ $t('plan.sources') }}: {{ p.sources }}</div>
      </li>
    </ul>
  </div>
</template>