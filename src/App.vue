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
</script>
