<script setup lang="ts">
import { ref } from 'vue'
import { usePlanStore } from '@/stores/usePlanStore'
import jsPDF from 'jspdf'
const planStore = usePlanStore()
const exportLang = ref('ar')
const exportType = ref('pdf')
const langOptions = [
  { title: 'العربية', value: 'ar' },
  { title: 'English', value: 'en' }
]
const typeOptions = [
  { title: 'PDF', value: 'pdf' },
  { title: 'Markdown', value: 'md' }
]
function exportPlan() {
  // منطق التصدير (PDF/Markdown)
  alert('سيتم تصدير الخطة قريبًا!')
}
</script>
<template>
  <v-card class="pa-6 mb-4" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-4">{{ $t('plan.exportTitle', 'تصدير خطة التعلم') }}</v-card-title>
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-select v-model="exportLang" :items="langOptions" :label="$t('plan.language', 'اللغة')" color="primary"></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="exportType" :items="typeOptions" :label="$t('plan.exportType', 'نوع التصدير')" color="primary"></v-select>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-end">
        <v-btn color="primary" prepend-icon="mdi-file-download" @click="exportPlan">{{ $t('plan.export', 'تصدير') }}</v-btn>
      </v-col>
    </v-row>
    <v-divider class="mb-4"/>
    <v-list dense>
      <v-list-item v-for="w in planStore.weeks" :key="w.week">
        <v-list-item-title class="font-weight-bold">{{ exportLang === 'ar' ? 'الأسبوع' : 'Week' }} {{ w.week }}: {{ w.title[exportLang] || w.title.en }}</v-list-item-title>
        <v-list-item-subtitle>
          <div v-for="d in w.days" :key="d.key" class="mb-1">
            <span class="font-weight-bold">- {{ d.day[exportLang] || d.day.en }}:</span>
            <span> {{ d.topic?.[exportLang] || d.topic?.en || '' }}</span>
            <ul class="pl-4">
              <li v-for="t in d.tasks" :key="t.id">
                {{ t.description[exportLang] || t.description.en }} ({{ t.type || '' }}, {{ t.duration }} min)
              </li>
            </ul>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>