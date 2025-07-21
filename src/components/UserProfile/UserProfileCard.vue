<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <!-- Profile Header -->
    <div class="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
      <div class="absolute -bottom-10 left-6">
        <div class="relative">
          <img
            :src="user.avatar || '/default-avatar.png'"
            :alt="user.name"
            class="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700"
          />
          <button
            @click="editAvatar"
            class="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white text-xs transition-colors"
          >
            ✏️
          </button>
        </div>
      </div>
    </div>

    <!-- Profile Info -->
    <div class="pt-12 pb-6 px-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h2>
          <p class="text-gray-600 dark:text-gray-400">{{ user.email }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">{{ user.bio || 'لا توجد نبذة شخصية' }}</p>
        </div>
        <button
          @click="editProfile"
          class="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          تعديل
        </button>
      </div>

      <!-- User Stats -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.stats.completedTasks }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">المهام المكتملة</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.stats.studyHours }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">ساعات الدراسة</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.stats.streak }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">أيام متتالية</div>
        </div>
      </div>

      <!-- Skills Progress -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">المهارات الرئيسية</h3>
        <div v-for="skill in user.topSkills" :key="skill.name" class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">{{ skill.name }}</span>
            <span class="text-gray-900 dark:text-white font-medium">{{ skill.level }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mt-6">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">النشاط الأخير</h3>
        <div class="space-y-2">
          <div v-for="activity in user.recentActivity" :key="activity.id" class="flex items-center text-sm">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span class="text-gray-600 dark:text-gray-400">{{ activity.description }}</span>
            <span class="text-gray-400 dark:text-gray-500 mr-auto">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Skill {
  name: string;
  level: number;
}

interface Activity {
  id: number;
  description: string;
  time: string;
}

interface UserStats {
  completedTasks: number;
  studyHours: number;
  streak: number;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  stats: UserStats;
  topSkills: Skill[];
  recentActivity: Activity[];
}

const props = defineProps<{
  user: User;
}>();

function editProfile() {
  // TODO: Implement profile editing
  console.log('Edit profile');
}

function editAvatar() {
  // TODO: Implement avatar editing
  console.log('Edit avatar');
}
</script>