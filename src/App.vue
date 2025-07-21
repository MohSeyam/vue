<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Modern Navigation Bar -->
    <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-4">
            <router-link to="/" class="flex items-center space-x-2 group">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">CP</span>
              </div>
              <span class="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CyberPlan
              </span>
            </router-link>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-1">
            <router-link 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path" 
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              :class="$route.path === item.path ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'"
            >
              <span class="mr-2 text-lg">{{ item.icon }}</span>
              {{ item.name }}
            </router-link>
          </div>

          <!-- Right Side Controls -->
          <div class="flex items-center space-x-3">
            <!-- Dark Mode Toggle -->
            <button 
              @click="toggleDarkMode" 
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span class="text-lg">{{ isDark ? '🌙' : '☀️' }}</span>
            </button>
            
            <!-- Language Switcher -->
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path" 
            class="flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors"
            :class="$route.path === item.path ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          >
            <span class="mr-3 text-lg">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const isDark = ref(false);

const navItems = [
  { name: 'Dashboard', path: '/', icon: '🏠' },
  { name: 'Daily Tasks', path: '/day', icon: '📅' },
  { name: 'Notebook', path: '/notebook', icon: '📝' },
  { name: 'Achievements', path: '/achievements', icon: '🏆' },
  { name: 'Calendar', path: '/calendar', icon: '📊' },
  { name: 'Skills', path: '/skills', icon: '🎯' }
];

function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
}

onMounted(() => {
  // Check if user prefers dark mode
  isDark.value = document.documentElement.classList.contains('dark');
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}

/* Smooth transitions */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
</style>
