<script setup lang="ts">
import { usePlanStore } from '@/stores/usePlanStore'
import { computed, ref } from 'vue'
import jsPDF from 'jspdf'
const plan = usePlanStore()
const exportLang = ref('en')
const exportType = ref('pdf')
const weeks = computed(() => plan.weeks.length)
const days = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.length, 0))
const tasks = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + d.tasks.length, 0), 0))
const totalMinutes = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + d.tasks.reduce((tacc, t) => tacc + (t.duration || 0), 0), 0), 0))
const totalHours = computed(() => Math.floor(totalMinutes.value / 60))
const totalSources = computed(() => plan.weeks.reduce((acc, w) => acc + w.days.reduce((dacc, d) => dacc + (d.resources?.length || 0), 0), 0))
const phases = computed(() => Array.from(new Set(plan.weeks.map(w => w.phase))).length)
const logoSvg = `<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='22' fill='#06b6d4' stroke='#fff' stroke-width='4'/><path d='M16 32L24 16L32 32' stroke='#fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>`
function exportPlan() {
  if (exportType.value === 'pdf') {
    const doc = new jsPDF()
    doc.addImage('data:image/svg+xml;utf8,' + encodeURIComponent(logoSvg), 'SVG', 10, 8, 18, 18)
    doc.setFontSize(18)
    doc.text(exportLang.value === 'ar' ? 'خطة التعلم' : 'Learning Plan', 32, 20)
    doc.setFontSize(13)
    let y = 38
    doc.text(`${exportLang.value === 'ar' ? 'عدد المراحل' : 'Phases'}: ${phases.value}`, 10, y)
    y += 8
    doc.text(`${exportLang.value === 'ar' ? 'عدد الأسابيع' : 'Weeks'}: ${weeks.value}`, 10, y)
    y += 8
    doc.text(`${exportLang.value === 'ar' ? 'عدد الأيام' : 'Days'}: ${days.value}`, 10, y)
    y += 8
    doc.text(`${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${tasks.value}`, 10, y)
    y += 8
    doc.text(`${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: ${totalSources.value}`, 10, y)
    y += 8
    doc.text(`${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Hours'}: ${totalHours.value}h (${totalMinutes.value} min)`, 10, y)
    doc.save('plan.pdf')
  } else if (exportType.value === 'md') {
    let md = `![logo](data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)})\n# ${exportLang.value === 'ar' ? 'خطة التعلم' : 'Learning Plan'}\n\n- ${exportLang.value === 'ar' ? 'عدد المراحل' : 'Phases'}: ${phases.value}\n- ${exportLang.value === 'ar' ? 'عدد الأسابيع' : 'Weeks'}: ${weeks.value}\n- ${exportLang.value === 'ar' ? 'عدد الأيام' : 'Days'}: ${days.value}\n- ${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: ${tasks.value}\n- ${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: ${totalSources.value}\n- ${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Hours'}: ${totalHours.value}h (${totalMinutes.value} min)`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plan.md'
    a.click()
    URL.revokeObjectURL(url)
  } else if (exportType.value === 'html') {
    let html = `<div style='font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#fff;border-radius:16px;box-shadow:0 2px 8px #0001'><div style='text-align:center;margin-bottom:16px;'>${logoSvg}</div><h2 style='color:#06b6d4'>${exportLang.value === 'ar' ? 'خطة التعلم' : 'Learning Plan'}</h2><ul style='list-style:none;padding:0;font-size:1.1em'>`;
    html += `<li>${exportLang.value === 'ar' ? 'عدد المراحل' : 'Phases'}: <b>${phases.value}</b></li>`;
    html += `<li>${exportLang.value === 'ar' ? 'عدد الأسابيع' : 'Weeks'}: <b>${weeks.value}</b></li>`;
    html += `<li>${exportLang.value === 'ar' ? 'عدد الأيام' : 'Days'}: <b>${days.value}</b></li>`;
    html += `<li>${exportLang.value === 'ar' ? 'عدد المهام' : 'Tasks'}: <b>${tasks.value}</b></li>`;
    html += `<li>${exportLang.value === 'ar' ? 'عدد المصادر' : 'Sources'}: <b>${totalSources.value}</b></li>`;
    html += `<li>${exportLang.value === 'ar' ? 'الوقت الكلي' : 'Total Hours'}: <b>${totalHours.value}h (${totalMinutes.value} min)</b></li>`;
    html += '</ul></div>';
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plan.html'
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
      <button @click="exportPlan" class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        {{ $t('plan.export') }}
      </button>
    </div>
    <div class="mb-4 mt-2">
      <span v-html="logoSvg" class="block mx-auto" style="width:48px;height:48px;"></span>
    </div>
    <h3 class="text-lg font-bold mb-2">{{ $t('plan.summary') }}</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ phases }}</span><span class="text-xs">{{ $t('plan.phases') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ weeks }}</span><span class="text-xs">{{ $t('plan.weeks') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ days }}</span><span class="text-xs">{{ $t('plan.days') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ tasks }}</span><span class="text-xs">{{ $t('plan.tasks') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ totalHours }}</span><span class="text-xs">{{ $t('plan.totalHours') }}</span></div>
      <div class="flex flex-col items-center"><span class="text-2xl font-bold">{{ totalSources }}</span><span class="text-xs">{{ $t('plan.sources') }}</span></div>
    </div>
    <div class="text-xs text-gray-500 dark:text-gray-300">{{ $t('plan.totalMinutes') }}: {{ totalMinutes }}</div>
  </div>
</template>