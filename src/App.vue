<template>
  <Navbar />
  <v-main>
    <keep-alive include="DashboardView,NotebookView,JournalView,AchievementsView,SettingsView">
      <router-view />
    </keep-alive>
  </v-main>
</template>
<script setup lang="ts">
</script>
