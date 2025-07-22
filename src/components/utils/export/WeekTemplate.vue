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
const props = defineProps<{ week: any }>()
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
  <v-card class="pa-6 mb-4" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ props.week.title[$i18n.locale] || props.week.title.en }}</v-card-title>
    <v-card-subtitle class="mb-4">{{ props.week.objective?.[$i18n.locale] || props.week.objective?.en }}</v-card-subtitle>
    <v-list dense>
      <v-list-item v-for="d in props.week.days" :key="d.key">
        <v-list-item-title class="font-weight-bold">{{ d.day[$i18n.locale] || d.day.en }}: {{ d.topic?.[$i18n.locale] || d.topic?.en }}</v-list-item-title>
        <v-list-item-subtitle>
          <ul class="pl-4">
            <li v-for="t in d.tasks" :key="t.id">
              {{ t.description[$i18n.locale] || t.description.en }} ({{ t.type || '' }}, {{ t.duration }} min)
            </li>
          </ul>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-actions class="justify-end mt-4">
      <v-btn color="primary" prepend-icon="mdi-file-download" @click="exportWeek">{{ $t('plan.export', 'تصدير الأسبوع') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>