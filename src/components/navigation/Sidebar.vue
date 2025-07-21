<template>
  <nav class="fixed top-0 left-0 w-full h-16 bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg shadow z-50 flex items-center justify-between px-4 md:px-12">
    <div class="flex items-center gap-4">
      <router-link to="/dashboard" class="flex items-center group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-500 group-hover:text-purple-500 transition">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3.25c-2.956 1.31-5.91 2.09-8.25 2.25v5.25c0 7.25 6.25 10.25 8.25 10.25s8.25-3 8.25-10.25V5.5c-2.34-.16-5.294-.94-8.25-2.25z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 12.75l1.5 1.5 3-3" />
        </svg>
      </router-link>
    </div>
    <div class="flex items-center gap-4 md:gap-8">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path"
        class="group flex items-center justify-center px-2 md:px-3 py-1 md:py-2 rounded-lg transition relative"
        :class="$route.path.startsWith(item.path) ? 'bg-cyan-100/60 dark:bg-cyan-900/40 shadow text-cyan-700 dark:text-cyan-200' : 'text-gray-500 dark:text-gray-300 hover:text-cyan-500'">
        <component :is="item.icon" class="w-7 h-7" />
      </router-link>
    </div>
    <div class="flex items-center gap-2 md:gap-4">
      <button @click="toggleLocale" class="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition shadow flex items-center justify-center" :title="$t('sidebar.langSwitch')">
        <svg v-if="locale === 'ar'" class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        <svg v-else class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
      </button>
      <button @click="toggleTheme" class="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700 transition shadow flex items-center justify-center" :title="$t('sidebar.themeSwitch')">
        <svg v-if="theme === 'dark'" class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
        <svg v-else class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
      </button>
    </div>
  </nav>
  <div class="h-16"></div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { shallowRef, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/useSettingsStore'
const { locale } = useI18n()
const $route = useRoute()
const settings = useSettingsStore()
const theme = computed(() => settings.theme)
function toggleLocale() {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
  document.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
}
function toggleTheme() {
  settings.theme = settings.theme === 'dark' ? 'light' : 'dark'
}
// أيقونات فقط بدون نصوص
const PhaseIcon = { template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M12 6v6l4 2'/></svg>` }
const TrophyIcon = { template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M6.75 3.75h10.5a.75.75 0 01.75.75v2.25a6.75 6.75 0 01-13.5 0V4.5a.75.75 0 01.75-.75z' /><path stroke-linecap='round' stroke-linejoin='round' d='M12 15.75v4.5m-3 0h6' /></svg>` }
const NotebookIcon = { template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M16.5 3.75V19.5m0 0a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.75A2.25 2.25 0 016.75 4.5h7.5A2.25 2.25 0 0116.5 6.75v12.75z' /></svg>` }
const JournalIcon = { template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M3 3v18h18' /><path stroke-linecap='round' stroke-linejoin='round' d='M9 17V9m4 8V5m4 8v-4' /></svg>` }
const SettingsIcon = { template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M10.5 6.75h3m-1.5 0v10.5m0 0h-3m3 0h3' /></svg>` }
const navItems = [
  { path: '/phase/1', icon: shallowRef(PhaseIcon) },
  { path: '/achievements', icon: shallowRef(TrophyIcon) },
  { path: '/notebook', icon: shallowRef(NotebookIcon) },
  { path: '/journal', icon: shallowRef(JournalIcon) },
  { path: '/settings', icon: shallowRef(SettingsIcon) }
]
</script>
<style scoped>
nav { font-family: inherit; }
</style>