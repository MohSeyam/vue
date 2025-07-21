<template>
  <div :class="[$settings.theme.value === 'dark' ? 'dark' : '', 'min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col']">
    <Navbar />
    <main class="flex-1">
      <router-view />
    </main>
    <Toast />
  </div>
</template>
<script setup lang="ts">
import Toast from './components/common/Toast.vue'
import Navbar from './components/navigation/Navbar.vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from './stores/useSettingsStore'
const $settings = storeToRefs(useSettingsStore())
</script>
