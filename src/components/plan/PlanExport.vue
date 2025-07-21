<script setup lang="ts">
import { ref } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import jsPDF from 'jspdf'
const planStore = usePlanStore()
const exportLang = ref('en')
function exportPlan(type: 'pdf' | 'md') {
  const weeks = planStore.weeks
  if (type === 'pdf') {
    const doc = new jsPDF()
    let y = 20
    doc.setFontSize(18)
    doc.text(exportLang.value === 'ar' ? 'خطة التعلم' : 'Learning Plan', 10, y)
    y += 10
    weeks.forEach(w => {
      doc.setFontSize(15)
      doc.text(`${exportLang.value === 'ar' ? 'الأسبوع' : 'Week'} ${w.week}: ${w.title[exportLang.value] || w.title.en}`, 10, y)
      y += 8
      w.days.forEach(d => {
        doc.setFontSize(13)
        doc.text(`- ${d.day[exportLang.value] || d.day.en}: ${d.topic?.[exportLang.value] || d.topic?.en || ''}`, 14, y)
        y += 7
        d.tasks.forEach(t => {
          doc.setFontSize(11)
          doc.text(`  • ${t.description[exportLang.value] || t.description.en} (${t.type || ''}, ${t.duration} min)`, 18, y)
          y += 6
          if (y > 270) { doc.addPage(); y = 20 }
        })
        if (y > 270) { doc.addPage(); y = 20 }
      })
      y += 4
      if (y > 270) { doc.addPage(); y = 20 }
    })
    doc.save('plan.pdf')
  } else if (type === 'md') {
    let md = `# ${exportLang.value === 'ar' ? 'خطة التعلم' : 'Learning Plan'}\n\n`
    weeks.forEach(w => {
      md += `## ${exportLang.value === 'ar' ? 'الأسبوع' : 'Week'} ${w.week}: ${w.title[exportLang.value] || w.title.en}\n`
      w.days.forEach(d => {
        md += `- **${d.day[exportLang.value] || d.day.en}:** ${d.topic?.[exportLang.value] || d.topic?.en || ''}\n`
        d.tasks.forEach(t => {
          md += `  - ${t.description[exportLang.value] || t.description.en} (${t.type || ''}, ${t.duration} min)\n`
        })
      })
      md += '\n'
    })
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plan.md'
    a.click()
    URL.revokeObjectURL(url)
  }
}
</script>
<template>
  <div class="flex gap-4 mt-6 justify-center">
    <select v-model="exportLang" class="rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs">
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
    <button @click="exportPlan('pdf')" class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
      PDF
    </button>
    <button @click="exportPlan('md')" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
      Markdown
    </button>
  </div>
</template>