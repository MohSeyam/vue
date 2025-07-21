<template>
  <v-container fluid class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-6" elevation="8">
          <v-card-title class="font-weight-bold text-primary mb-4">{{ $t('settings.title', 'الإعدادات') }}</v-card-title>
          <v-form @submit.prevent="saveSettings">
            <v-row class="mb-4">
              <v-col cols="12">
                <v-switch v-model="darkMode" :label="$t('settings.darkMode', 'الوضع الليلي')" color="primary" inset></v-switch>
              </v-col>
              <v-col cols="12">
                <v-select v-model="language" :items="languages" :label="$t('settings.language', 'اللغة')" color="primary"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-end">
                <v-btn color="primary" type="submit">{{ $t('settings.save', 'حفظ') }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const darkMode = ref(false)
const language = ref('ar')
const languages = [
  { title: 'العربية', value: 'ar' },
  { title: 'English', value: 'en' }
]
function saveSettings() {
  // منطق الحفظ (تغيير اللغة/الوضع)
  alert('تم حفظ الإعدادات!')
}
</script>