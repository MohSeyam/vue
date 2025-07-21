<template>
  <div class="space-y-8">
    <!-- Profile Header -->
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">الملف الشخصي</h1>
      <p class="text-gray-600 dark:text-gray-400">عرض وإدارة معلوماتك الشخصية</p>
    </div>

    <!-- Profile Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- User Profile Card -->
      <div class="lg:col-span-1">
        <UserProfileCard :user="user" />
      </div>

      <!-- Additional Profile Sections -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Recent Achievements -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">الإنجازات الأخيرة</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="achievement in recentAchievements" :key="achievement.id" class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-2xl">{{ achievement.icon }}</span>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ achievement.title }}</h4>
                <p class="text-xs text-gray-600 dark:text-gray-400">{{ achievement.date }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Learning Statistics -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">إحصائيات التعلم</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="stat in learningStats" :key="stat.name" class="text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stat.value }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.name }}</div>
            </div>
          </div>
        </div>

        <!-- Certificates -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">الشهادات</h3>
          <div class="space-y-3">
            <div v-for="certificate in certificates" :key="certificate.id" class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🏆</span>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ certificate.name }}</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{{ certificate.issuer }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-900 dark:text-white">{{ certificate.date }}</div>
                <div class="text-xs text-green-600 dark:text-green-400">صالح</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserProfileCard from '@/components/UserProfile/UserProfileCard.vue';

const user = {
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  avatar: '/default-avatar.png',
  bio: 'مطور أمن سيبراني متخصص في أمن الشبكات والويب. أعمل على تطوير حلول أمنية مبتكرة لحماية الأنظمة والشبكات.',
  stats: {
    completedTasks: 156,
    studyHours: 342,
    streak: 15
  },
  topSkills: [
    { name: 'أمن الشبكات', level: 85 },
    { name: 'أمن الويب', level: 72 },
    { name: 'التحليل الجنائي', level: 45 },
    { name: 'التشفير', level: 38 }
  ],
  recentActivity: [
    { id: 1, description: 'أكملت مهمة "مقدمة في أمن الشبكات"', time: 'منذ ساعتين' },
    { id: 2, description: 'أضفت ملاحظة جديدة حول التشفير', time: 'منذ 4 ساعات' },
    { id: 3, description: 'حصلت على إنجاز "متعلم نشط"', time: 'منذ يوم' },
    { id: 4, description: 'أكملت 5 مهام في أسبوع واحد', time: 'منذ يومين' }
  ]
};

const recentAchievements = [
  { id: 1, icon: '🏆', title: 'متعلم نشط', date: 'اليوم' },
  { id: 2, icon: '🎯', title: 'مستوى متقدم', date: 'أمس' },
  { id: 3, icon: '⚡', title: 'سرعة التعلم', date: 'منذ 3 أيام' },
  { id: 4, icon: '🔥', title: 'أسبوع مثمر', date: 'منذ أسبوع' }
];

const learningStats = [
  { name: 'المهام المكتملة', value: '156' },
  { name: 'ساعات الدراسة', value: '342' },
  { name: 'الأيام المتتالية', value: '15' },
  { name: 'الإنجازات', value: '23' }
];

const certificates = [
  { id: 1, name: 'CompTIA Security+', issuer: 'CompTIA', date: '2024-01-15' },
  { id: 2, name: 'Certified Ethical Hacker', issuer: 'EC-Council', date: '2023-11-20' },
  { id: 3, name: 'Cisco CCNA Security', issuer: 'Cisco', date: '2023-09-10' }
];
</script>