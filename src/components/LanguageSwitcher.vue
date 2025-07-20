<template>
  <div class="flex gap-2">
    <button
      v-for="lang in langs"
      :key="lang.code"
      @click="setLang(lang.code)"
      :class="['px-2 py-1 rounded', currentLang === lang.code ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700']"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '../store/settingsStore';

const langs = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

const settings = useSettingsStore();
const { language } = storeToRefs(settings);
const { locale } = useI18n();

const currentLang = language.value;

function setLang(code: string) {
  settings.setLanguage(code);
  locale.value = code;
}
</script>