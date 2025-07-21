<template>
  <div class="space-y-8">
    <!-- Search Header -->
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">البحث المتقدم</h1>
      <p class="text-gray-600 dark:text-gray-400">ابحث في جميع محتويات التطبيق بسهولة وسرعة</p>
    </div>

    <!-- Advanced Search Component -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <AdvancedSearch />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdvancedSearch from '@/components/Search/AdvancedSearch.vue';
</script>