<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <nav class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <div class="flex items-center gap-4">
        <router-link to="/" class="font-bold text-lg">Cyber Plan</router-link>
        <router-link to="/day" class="ml-4">Day</router-link>
        <router-link to="/notebook" class="ml-4">Notebook</router-link>
        <router-link to="/achievements" class="ml-4">Achievements</router-link>
        <router-link to="/calendar" class="ml-4">Calendar</router-link>
        <router-link to="/skills" class="ml-4">Skills</router-link>
      </div>
      <div>
        <!-- Language switcher and dark mode toggle will go here -->
      </div>
    </nav>
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// App shell logic
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
