<template>
  <div class="max-w-xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ $t('settings.title') }}</h1>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
      <h2 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">{{ $t('settings.language') }}</h2>
      <select v-model="lang" @change="changeLang" class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-bold">
        <option value="ar">العربية</option>
        <option value="en">English</option>
      </select>
    </div>
    <!-- إعدادات أخرى ... -->
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const lang = ref(locale.value)
function changeLang() {
  locale.value = lang.value
  localStorage.setItem('lang', lang.value)
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
}
watch(lang, changeLang)
</script>