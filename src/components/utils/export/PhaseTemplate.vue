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
    const phaseId = w.phase ?? 0
    if (!map.has(phaseId)) map.set(phaseId, { phase: phaseId, weeks: 0, tasks: 0, minutes: 0, sources: 0 })
    const p = map.get(phaseId)!
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
  <v-card class="pa-6 mb-4" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ phase.title[$i18n.locale] || phase.title.en }}</v-card-title>
    <v-card-subtitle class="mb-4">{{ phase.objective?.[$i18n.locale] || phase.objective?.en }}</v-card-subtitle>
    <v-list dense>
      <v-list-item v-for="w in phase.weeks" :key="w.week">
        <v-list-item-title class="font-weight-bold">{{ $t('plan.week', 'الأسبوع') }} {{ w.week }}: {{ w.title[$i18n.locale] || w.title.en }}</v-list-item-title>
        <v-list-item-subtitle>
          <div v-for="d in w.days" :key="d.key" class="mb-1">
            <span class="font-weight-bold">- {{ d.day[$i18n.locale] || d.day.en }}:</span>
            <span> {{ d.topic?.[$i18n.locale] || d.topic?.en || '' }}</span>
            <ul class="pl-4">
              <li v-for="t in d.tasks" :key="t.id">
                {{ t.description[$i18n.locale] || t.description.en }} ({{ t.type || '' }}, {{ t.duration }} min)
              </li>
            </ul>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-actions class="justify-end mt-4">
      <v-btn color="primary" prepend-icon="mdi-file-download" @click="exportPhase">{{ $t('plan.export', 'تصدير المرحلة') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>