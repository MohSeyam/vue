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
    day.tasks.forEach(t => {
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
  <v-card class="pa-6 mb-4" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ day.day[$i18n.locale] || day.day.en }}</v-card-title>
    <v-card-subtitle class="mb-4">{{ day.topic?.[$i18n.locale] || day.topic?.en }}</v-card-subtitle>
    <v-list dense>
      <v-list-item v-for="t in day.tasks" :key="t.id">
        <v-list-item-icon><v-icon color="primary">mdi-checkbox-blank-circle-outline</v-icon></v-list-item-icon>
        <v-list-item-title>{{ t.description[$i18n.locale] || t.description.en }} ({{ t.type || '' }}, {{ t.duration }} min)</v-list-item-title>
      </v-list-item>
    </v-list>
    <div v-if="day.resources?.length" class="mt-4">
      <div class="font-weight-bold mb-2">{{ $t('plan.sources', 'المصادر:') }}</div>
      <v-list dense>
        <v-list-item v-for="r in day.resources" :key="r.title">
          <v-list-item-icon><v-icon color="secondary">mdi-link-variant</v-icon></v-list-item-icon>
          <v-list-item-title>{{ r.title }} ({{ r.type }})</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
    <v-card-actions class="justify-end mt-4">
      <v-btn color="primary" prepend-icon="mdi-file-download" @click="exportDay">{{ $t('plan.export', 'تصدير اليوم') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>