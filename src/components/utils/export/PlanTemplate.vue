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
  <v-card class="pa-6 mb-4" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ plan.title[$i18n.locale] || plan.title.en }}</v-card-title>
    <v-list dense>
      <v-list-item v-for="phase in plan.phases" :key="phase.phase">
        <v-list-item-title class="font-weight-bold">{{ $t('plan.phase', 'المرحلة') }} {{ phase.phase }}: {{ phase.title[$i18n.locale] || phase.title.en }}</v-list-item-title>
        <v-list-item-subtitle>
          <div v-for="w in phase.weeks" :key="w.week" class="mb-1">
            <span class="font-weight-bold">- {{ $t('plan.week', 'الأسبوع') }} {{ w.week }}:</span>
            <span> {{ w.title[$i18n.locale] || w.title.en }}</span>
            <ul class="pl-4">
              <li v-for="d in w.days" :key="d.key">
                <span class="font-weight-bold">{{ d.day[$i18n.locale] || d.day.en }}:</span>
                <span> {{ d.topic?.[$i18n.locale] || d.topic?.en || '' }}</span>
                <ul class="pl-4">
                  <li v-for="t in d.tasks" :key="t.id">
                    {{ t.description[$i18n.locale] || t.description.en }} ({{ t.type || '' }}, {{ t.duration }} min)
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-actions class="justify-end mt-4">
      <v-btn color="primary" prepend-icon="mdi-file-download" @click="exportPlan">{{ $t('plan.export', 'تصدير الخطة') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>