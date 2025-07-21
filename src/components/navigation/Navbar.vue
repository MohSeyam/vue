<template>
  <nav class="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-gray-900 dark:to-gray-800 shadow-lg z-50 flex items-center justify-between px-4">
    <div class="flex items-center gap-2">
      <router-link to="/dashboard" class="group p-2 rounded-full hover:bg-cyan-100/30 dark:hover:bg-gray-700 transition" title="Dashboard">
        <svg class="w-7 h-7 text-white group-hover:text-cyan-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
      </router-link>
      <router-link to="/notebook" class="group p-2 rounded-full hover:bg-cyan-100/30 dark:hover:bg-gray-700 transition" title="Notebook">
        <svg class="w-7 h-7 text-white group-hover:text-cyan-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V19.5m0 0a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.75A2.25 2.25 0 016.75 4.5h7.5A2.25 2.25 0 0116.5 6.75v12.75z"/></svg>
      </router-link>
      <router-link to="/journal" class="group p-2 rounded-full hover:bg-cyan-100/30 dark:hover:bg-gray-700 transition" title="Journal">
        <svg class="w-7 h-7 text-white group-hover:text-cyan-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 17V9m4 8V5m4 8v-4"/></svg>
      </router-link>
      <router-link to="/achievements" class="group p-2 rounded-full hover:bg-cyan-100/30 dark:hover:bg-gray-700 transition" title="Achievements">
        <svg class="w-7 h-7 text-white group-hover:text-cyan-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3.75h10.5a.75.75 0 01.75.75v2.25a6.75 6.75 0 01-13.5 0V4.5a.75.75 0 01.75-.75z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 15.75v4.5m-3 0h6"/></svg>
      </router-link>
      <router-link to="/settings" class="group p-2 rounded-full hover:bg-cyan-100/30 dark:hover:bg-gray-700 transition" title="Settings">
        <svg class="w-7 h-7 text-white group-hover:text-cyan-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6.75h3m-1.5 0v10.5m0 0h-3m3 0h3"/></svg>
      </router-link>
    </div>
    <div class="flex items-center gap-2">
      <button @click="toggleLocale" class="p-2 rounded-full bg-white/20 hover:bg-white/40 dark:bg-gray-700 dark:hover:bg-gray-600 transition" title="Change Language">
        <span class="text-xl">🌐</span>
      </button>
      <button @click="toggleTheme" class="p-2 rounded-full bg-white/20 hover:bg-white/40 dark:bg-gray-700 dark:hover:bg-gray-600 transition" title="Toggle Theme">
        <span v-if="theme === 'dark'" class="text-xl">🌙</span>
        <span v-else class="text-xl">☀️</span>
      </button>
    </div>
  </nav>
  <div class="h-16"></div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { computed } from 'vue'
const { locale } = useI18n()
const settings = useSettingsStore()
const theme = computed(() => settings.theme)
function toggleLocale() {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
  document.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
}
function toggleTheme() {
  settings.theme = settings.theme === 'dark' ? 'light' : 'dark'
}
</script>
<style scoped>
nav { font-family: inherit; }
</style>