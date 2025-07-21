<template>
  <aside class="hidden md:flex flex-col w-20 h-screen bg-white/10 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-r-3xl py-8 items-center space-y-8 fixed top-0 left-0 z-40">
    <router-link to="/dashboard" class="mb-8 group">
      <div class="bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-2xl p-3 shadow-lg flex items-center justify-center">
        <!-- Heroicon: ShieldCheck -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white group-hover:text-cyan-200 transition">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3.25c-2.956 1.31-5.91 2.09-8.25 2.25v5.25c0 7.25 6.25 10.25 8.25 10.25s8.25-3 8.25-10.25V5.5c-2.34-.16-5.294-.94-8.25-2.25z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 12.75l1.5 1.5 3-3" />
        </svg>
      </div>
    </router-link>
    <div class="flex flex-col space-y-6 w-full">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="group flex flex-col items-center w-full py-2" :class="$route.path.startsWith(item.path) ? 'bg-cyan-100/20 dark:bg-cyan-900/30' : ''">
        <span class="mb-1">
          <component :is="item.icon" class="w-7 h-7 text-cyan-400 group-hover:text-purple-400 transition" />
        </span>
        <span class="text-xs text-white/70 group-hover:text-cyan-200 transition">{{ item.label }}</span>
      </router-link>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { shallowRef } from 'vue'
// Heroicons SVG as components
const HomeIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75' /></svg>`
}
const NotebookIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M16.5 3.75V19.5m0 0a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.75A2.25 2.25 0 016.75 4.5h7.5A2.25 2.25 0 0116.5 6.75v12.75z' /></svg>`
}
const TrophyIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M6.75 3.75h10.5a.75.75 0 01.75.75v2.25a6.75 6.75 0 01-13.5 0V4.5a.75.75 0 01.75-.75z' /><path stroke-linecap='round' stroke-linejoin='round' d='M12 15.75v4.5m-3 0h6' /></svg>`
}
const ChartBarIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M3 3v18h18' /><path stroke-linecap='round' stroke-linejoin='round' d='M9 17V9m4 8V5m4 8v-4' /></svg>`
}
const SettingsIcon = {
  template: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M10.5 6.75h3m-1.5 0v10.5m0 0h-3m3 0h3' /></svg>`
}
const navItems = [
  { path: '/dashboard', icon: shallowRef(HomeIcon), label: 'الرئيسية' },
  { path: '/notebook', icon: shallowRef(NotebookIcon), label: 'الملاحظات' },
  { path: '/achievements', icon: shallowRef(TrophyIcon), label: 'الإنجازات' },
  { path: '/journal', icon: shallowRef(ChartBarIcon), label: 'التدوين' },
  { path: '/settings', icon: shallowRef(SettingsIcon), label: 'الإعدادات' }
]
const $route = useRoute()
</script>
<style scoped>
.router-link-exact-active {
  background: linear-gradient(90deg, #06b6d4 0%, #a78bfa 100%) !important;
  color: #fff !important;
}
</style>