<template>
  <v-app>
    <Navbar />
    <v-main>
      <keep-alive include="DashboardView,NotebookView,JournalView,AchievementsView,SettingsView">
        <router-view />
      </keep-alive>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
</script>
