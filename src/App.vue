<template>
  <div :class="[$settings.theme === 'dark' ? 'dark' : '', 'min-h-screen bg-gray-50 dark:bg-gray-900 flex']">
    <Sidebar />
    <main class="flex-1">
      <router-view />
    </main>
    <Toast />
  </div>
</template>
<script setup lang="ts">
import Sidebar from './components/navigation/Sidebar.vue'
import Toast from './components/common/Toast.vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from './stores/useSettingsStore'
const $settings = storeToRefs(useSettingsStore())
</script>
