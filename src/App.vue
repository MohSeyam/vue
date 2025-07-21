<template>
  <Navbar />
  <v-main>
    <keep-alive include="DashboardView,NotebookView,JournalView,AchievementsView,SettingsView">
      <router-view />
    </keep-alive>
  </v-main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
const drawer = ref(false)
const { locale } = useI18n()
const theme = useTheme()
const navItems = [
  { path: '/dashboard', icon: 'mdi-view-dashboard' },
  { path: '/notebook', icon: 'mdi-notebook' },
  { path: '/journal', icon: 'mdi-book-open' },
  { path: '/achievements', icon: 'mdi-trophy' },
  { path: '/settings', icon: 'mdi-cog' }
]
function toggleLocale() {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
  document.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
}
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
