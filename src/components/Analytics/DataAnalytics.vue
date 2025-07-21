<template>
  <div class="space-y-8">
    <!-- Analytics Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">تحليلات البيانات</h2>
          <p class="text-gray-600 dark:text-gray-400">تتبع تقدمك في تعلم الأمن السيبراني</p>
        </div>
        <div class="flex items-center space-x-3">
          <select
            v-model="selectedPeriod"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="week">الأسبوع</option>
            <option value="month">الشهر</option>
            <option value="quarter">الربع</option>
            <option value="year">السنة</option>
          </select>
          <button
            @click="exportAnalytics"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            تصدير البيانات
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">إجمالي ساعات الدراسة</p>
              <p class="text-2xl font-bold">{{ analytics.totalStudyHours }}</p>
            </div>
            <span class="text-2xl">⏰</span>
          </div>
          <div class="mt-2 text-sm opacity-90">
            +{{ analytics.studyHoursGrowth }}% من الفترة السابقة
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">المهام المكتملة</p>
              <p class="text-2xl font-bold">{{ analytics.completedTasks }}</p>
            </div>
            <span class="text-2xl">✅</span>
          </div>
          <div class="mt-2 text-sm opacity-90">
            +{{ analytics.tasksGrowth }}% من الفترة السابقة
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">معدل الإنجاز</p>
              <p class="text-2xl font-bold">{{ analytics.completionRate }}%</p>
            </div>
            <span class="text-2xl">📊</span>
          </div>
          <div class="mt-2 text-sm opacity-90">
            +{{ analytics.rateGrowth }}% من الفترة السابقة
          </div>
        </div>

        <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">الأيام المتتالية</p>
              <p class="text-2xl font-bold">{{ analytics.streak }}</p>
            </div>
            <span class="text-2xl">🔥</span>
          </div>
          <div class="mt-2 text-sm opacity-90">
            أفضل سجل: {{ analytics.bestStreak }} يوم
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Study Hours Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">ساعات الدراسة الأسبوعية</h3>
        <div class="h-64 flex items-end justify-between space-x-2">
          <div
            v-for="(day, index) in weeklyStudyHours"
            :key="index"
            class="flex-1 flex flex-col items-center"
          >
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ day.name }}</div>
            <div
              class="w-full bg-blue-200 dark:bg-blue-900/30 rounded-t transition-all duration-300 hover:bg-blue-300 dark:hover:bg-blue-900/50"
              :style="{ height: (day.hours / maxStudyHours) * 200 + 'px' }"
            ></div>
            <div class="text-xs text-gray-700 dark:text-gray-300 mt-1">{{ day.hours }}h</div>
          </div>
        </div>
      </div>

      <!-- Skills Progress Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">تقدم المهارات</h3>
        <div class="space-y-4">
          <div v-for="skill in skillsProgress" :key="skill.name" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ skill.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                class="h-3 rounded-full transition-all duration-500"
                :class="getSkillColorClass(skill.progress)"
                :style="{ width: skill.progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Learning Categories -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">فئات التعلم</h3>
        <div class="space-y-4">
          <div v-for="category in learningCategories" :key="category.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ category.name }}</span>
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ category.percentage }}%</span>
          </div>
        </div>
        <div class="mt-4 h-32 flex items-center justify-center">
          <div class="relative w-24 h-24">
            <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                stroke-width="2"
                stroke-dasharray="75, 100"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-bold text-gray-900 dark:text-white">75%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Time Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">توزيع الوقت</h3>
        <div class="space-y-3">
          <div v-for="timeSlot in timeDistribution" :key="timeSlot.period" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-gray-700 dark:text-gray-300">{{ timeSlot.period }}</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ timeSlot.hours }}h</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: (timeSlot.hours / maxTimeSlot) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Insights -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">رؤى الأداء</h3>
        <div class="space-y-4">
          <div v-for="insight in performanceInsights" :key="insight.id" class="flex items-start space-x-3">
            <span class="text-lg">{{ insight.icon }}</span>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ insight.title }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">{{ insight.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const selectedPeriod = ref('month');

const analytics = ref({
  totalStudyHours: 156,
  studyHoursGrowth: 12,
  completedTasks: 89,
  tasksGrowth: 8,
  completionRate: 78,
  rateGrowth: 5,
  streak: 15,
  bestStreak: 23
});

const weeklyStudyHours = ref([
  { name: 'الأحد', hours: 4 },
  { name: 'الاثنين', hours: 6 },
  { name: 'الثلاثاء', hours: 3 },
  { name: 'الأربعاء', hours: 5 },
  { name: 'الخميس', hours: 7 },
  { name: 'الجمعة', hours: 2 },
  { name: 'السبت', hours: 4 }
]);

const skillsProgress = ref([
  { name: 'أمن الشبكات', progress: 85 },
  { name: 'أمن الويب', progress: 72 },
  { name: 'التحليل الجنائي', progress: 45 },
  { name: 'التشفير', progress: 38 }
]);

const learningCategories = ref([
  { name: 'أمن الشبكات', percentage: 35, color: '#3b82f6' },
  { name: 'أمن الويب', percentage: 28, color: '#f59e0b' },
  { name: 'التحليل الجنائي', percentage: 22, color: '#10b981' },
  { name: 'التشفير', percentage: 15, color: '#8b5cf6' }
]);

const timeDistribution = ref([
  { period: 'صباحاً (6-12)', hours: 8 },
  { period: 'ظهراً (12-18)', hours: 12 },
  { period: 'مساءً (18-24)', hours: 6 },
  { period: 'ليلاً (0-6)', hours: 2 }
]);

const performanceInsights = ref([
  {
    id: 1,
    icon: '📈',
    title: 'تحسن مستمر',
    description: 'معدل إنجازك يتحسن بنسبة 12% هذا الشهر'
  },
  {
    id: 2,
    icon: '🎯',
    title: 'تركيز عالي',
    description: 'أفضل أوقات الدراسة لديك هي بين 12-18 مساءً'
  },
  {
    id: 3,
    icon: '⚡',
    title: 'سرعة التعلم',
    description: 'أنت تتعلم أسرع من 85% من المستخدمين'
  },
  {
    id: 4,
    icon: '🏆',
    title: 'إنجاز قريب',
    description: 'أنت على بعد 3 مهام من إنجاز جديد'
  }
]);

const maxStudyHours = computed(() => {
  return Math.max(...weeklyStudyHours.value.map(day => day.hours));
});

const maxTimeSlot = computed(() => {
  return Math.max(...timeDistribution.value.map(slot => slot.hours));
});

function getSkillColorClass(progress: number): string {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 60) return 'bg-blue-500';
  if (progress >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

function exportAnalytics() {
  // TODO: Implement analytics export
  console.log('Exporting analytics for period:', selectedPeriod.value);
}
</script>