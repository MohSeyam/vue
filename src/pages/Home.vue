<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Welcome to CyberPlan
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Your comprehensive cybersecurity learning journey starts here. Track progress, manage tasks, and achieve your goals.
      </p>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Tasks</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">8</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <span class="text-2xl">📋</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Study Hours</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">2.5</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <span class="text-2xl">⏰</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Streak</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">7 days</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <span class="text-2xl">🔥</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Progress Overview -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Overall Progress</h2>
        <div class="flex justify-center mb-4">
          <ProgressCircle :percent="72" label="Plan Progress" color="#10b981" :size="120" />
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">You're making great progress!</p>
        </div>
      </div>

      <!-- Skills Overview -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Skills Progress</h2>
        <SkillBarChart :skills="skills" />
      </div>
    </div>

    <!-- Quick Search -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">البحث السريع</h2>
      <div class="relative">
        <input
          type="text"
          placeholder="البحث في المهام، الملاحظات، المهارات..."
          class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">🔍</span>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">الإجراءات السريعة</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link 
          to="/day" 
          class="flex flex-col items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          <span class="text-2xl mb-2">📅</span>
          <span class="text-sm font-medium text-blue-700 dark:text-blue-300">المهام اليومية</span>
        </router-link>
        
        <router-link 
          to="/notebook" 
          class="flex flex-col items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <span class="text-2xl mb-2">📝</span>
          <span class="text-sm font-medium text-green-700 dark:text-green-300">إضافة ملاحظة</span>
        </router-link>
        
        <router-link 
          to="/achievements" 
          class="flex flex-col items-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
        >
          <span class="text-2xl mb-2">🏆</span>
          <span class="text-sm font-medium text-purple-700 dark:text-purple-300">الإنجازات</span>
        </router-link>
        
        <router-link 
          to="/analytics" 
          class="flex flex-col items-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
        >
          <span class="text-2xl mb-2">📊</span>
          <span class="text-sm font-medium text-orange-700 dark:text-orange-300">التحليلات</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgressCircle from '@/components/ProgressCircle.vue';
import SkillBarChart from '@/components/SkillBarChart.vue';

const skills = [
  { name: 'Network Security', value: 80, color: '#3b82f6' },
  { name: 'Web Security', value: 65, color: '#f59e0b' },
  { name: 'Forensics', value: 45, color: '#10b981' },
  { name: 'Cryptography', value: 30, color: '#8b5cf6' }
];
</script>