<template>
  <v-app-bar color="primary" elevate-on-scroll flat app class="cyber-navbar">
    <v-toolbar-title class="d-flex align-center gap-2">
      <span class="cyber-logo">
        <!-- شعار درع سيبراني صغير -->
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cyber-glow-nav" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.7"/>
              <stop offset="100%" stop-color="#111827" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="url(#cyber-glow-nav)"/>
          <path d="M12 18C12 12 24 6 24 6C24 6 36 12 36 18C36 30 24 42 24 42C24 42 12 30 12 18Z" fill="#1F2937" stroke="#22d3ee" stroke-width="2.5"/>
          <path d="M24 14V24L30 28" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="24" cy="24" r="3" fill="#22d3ee"/>
        </svg>
      </span>
      <span class="font-weight-bold text-white">Cyber Command</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon to="/dashboard" :title="$t('nav.dashboard')">
      <v-icon size="28">mdi-view-dashboard-variant</v-icon>
    </v-btn>
    <v-btn icon to="/notebook" :title="$t('nav.notebook')">
      <v-icon size="28">mdi-notebook-outline</v-icon>
    </v-btn>
    <v-btn icon to="/journal" :title="$t('nav.journal')">
      <v-icon size="28">mdi-book-open-variant</v-icon>
    </v-btn>
    <v-btn icon to="/achievements" :title="$t('nav.achievements')">
      <v-icon size="28">mdi-trophy-variant</v-icon>
    </v-btn>
    <v-btn icon to="/settings" :title="$t('nav.settings')">
      <v-icon size="28">mdi-cog-outline</v-icon>
    </v-btn>
    <v-divider vertical class="mx-2" />
    <v-btn icon @click="toggleLocale" :title="$t('nav.lang')">
      <v-icon size="26">mdi-translate</v-icon>
    </v-btn>
    <v-btn icon @click="toggleTheme" :title="$t('nav.theme')">
      <v-icon size="26">{{ theme === 'dark' ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
    </v-btn>
  </v-app-bar>
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
.cyber-navbar {
  box-shadow: 0 2px 16px 0 #22d3ee33, 0 1.5px 6px 0 #0001;
  background: linear-gradient(90deg, #22d3ee 0%, #1F2937 100%) !important;
}
.cyber-logo {
  display: flex;
  align-items: center;
  margin-inline-end: 8px;
}
</style>