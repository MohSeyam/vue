<template>
  <v-container fluid class="py-8">
    <v-row class="mb-6" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-icon size="56" color="secondary" class="mb-2">mdi-trophy</v-icon>
        <h1 class="text-h4 font-weight-bold mb-2">{{ $t('achievements.title', 'إنجازاتك وتقدمك') }}</h1>
        <p class="text-subtitle-1">{{ $t('achievements.desc', 'تابع تقدمك في خطة الأمن السيبراني واحتفل بإنجازاتك!') }}</p>
      </v-col>
    </v-row>
    <v-row class="gap-4">
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-secondary">{{ $t('achievements.progress') }}</v-card-title>
          <v-card-text>
            <v-progress-linear :model-value="progress" color="primary" height="20" rounded>
              <template #default>
                <strong>{{ Math.round(progress) }}%</strong>
              </template>
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-secondary">{{ $t('achievements.skills') }}</v-card-title>
          <v-list>
            <v-list-item v-for="skill in skills" :key="skill.name">
              <v-list-item-content>
                <v-list-item-title>{{ skill.name }}</v-list-item-title>
                <v-progress-linear :model-value="skill.level" color="primary" height="8" rounded class="mt-1"/>
              </v-list-item-content>
              <v-list-item-action><span class="text-caption">{{ skill.level }}%</span></v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-secondary">{{ $t('achievements.stats') }}</v-card-title>
          <v-list>
            <v-list-item v-for="stat in stats" :key="stat.label">
              <v-list-item-icon><v-icon color="primary">{{ stat.icon }}</v-icon></v-list-item-icon>
              <v-list-item-title>{{ stat.label }}</v-list-item-title>
              <v-list-item-action><span class="font-weight-bold">{{ stat.value }}</span></v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-secondary">{{ $t('achievements.report') }}</v-card-title>
          <v-card-text>
            <v-btn color="primary" prepend-icon="mdi-file-download" @click="downloadReport">{{ $t('achievements.downloadReport', 'تحميل تقرير الإنجازات') }}</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const progress = ref(68)
const skills = ref([
  { name: 'الشبكات', level: 80 },
  { name: 'البرمجة', level: 60 },
  { name: 'التحليل', level: 70 },
  { name: 'الكتابة', level: 90 }
])
const stats = ref([
  { label: 'عدد الأسابيع', value: 12, icon: 'mdi-calendar-week' },
  { label: 'عدد المهام', value: 120, icon: 'mdi-format-list-checkbox' },
  { label: 'عدد الأيام', value: 60, icon: 'mdi-calendar-today' },
  { label: 'عدد التدوينات', value: 24, icon: 'mdi-book-open-variant' }
])
function downloadReport() {
  // منطق التصدير (PDF/CSV)
  alert('سيتم تحميل تقرير الإنجازات قريبًا!')
}
</script>