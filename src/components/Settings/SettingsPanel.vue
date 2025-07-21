<template>
  <div class="space-y-8">
    <!-- Settings Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">الإعدادات</h2>
      <p class="text-gray-600 dark:text-gray-400">تخصيص تجربتك في تطبيق الأمن السيبراني</p>
    </div>

    <!-- Settings Navigation -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <nav class="space-y-1">
            <button
              v-for="section in settingsSections"
              :key="section.id"
              @click="activeSection = section.id"
              class="w-full flex items-center px-4 py-3 text-sm font-medium transition-colors"
              :class="activeSection === section.id 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
            >
              <span class="mr-3 text-lg">{{ section.icon }}</span>
              {{ section.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="lg:col-span-3">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <!-- Account Settings -->
          <div v-if="activeSection === 'account'" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">إعدادات الحساب</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم</label>
                <input
                  v-model="accountSettings.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <input
                  v-model="accountSettings.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">النبذة الشخصية</label>
                <textarea
                  v-model="accountSettings.bio"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <div class="flex items-center space-x-4">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  حفظ التغييرات
                </button>
                <button class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  إلغاء
                </button>
              </div>
            </div>
          </div>

          <!-- Notifications Settings -->
          <div v-if="activeSection === 'notifications'" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">إعدادات الإشعارات</h3>
            
            <div class="space-y-4">
              <div v-for="notification in notificationSettings" :key="notification.id" class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ notification.description }}</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      v-model="notification.enabled"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div v-if="activeSection === 'privacy'" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">إعدادات الخصوصية</h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">الملف الشخصي العام</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">السماح للآخرين برؤية ملفك الشخصي</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="privacySettings.publicProfile"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">مشاركة التقدم</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">مشاركة تقدمك مع الأصدقاء</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="privacySettings.shareProgress"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">تحليلات البيانات</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">السماح بجمع بيانات الاستخدام لتحسين التطبيق</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="privacySettings.analytics"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Theme Settings -->
          <div v-if="activeSection === 'theme'" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">إعدادات المظهر</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">المظهر</label>
                <div class="grid grid-cols-3 gap-4">
                  <button
                    @click="themeSettings.mode = 'light'"
                    class="p-4 border-2 rounded-lg transition-colors"
                    :class="themeSettings.mode === 'light' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
                  >
                    <div class="w-full h-8 bg-white border border-gray-200 rounded mb-2"></div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">فاتح</span>
                  </button>
                  
                  <button
                    @click="themeSettings.mode = 'dark'"
                    class="p-4 border-2 rounded-lg transition-colors"
                    :class="themeSettings.mode === 'dark' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
                  >
                    <div class="w-full h-8 bg-gray-800 border border-gray-700 rounded mb-2"></div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">داكن</span>
                  </button>
                  
                  <button
                    @click="themeSettings.mode = 'auto'"
                    class="p-4 border-2 rounded-lg transition-colors"
                    :class="themeSettings.mode === 'auto' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
                  >
                    <div class="w-full h-8 bg-gradient-to-r from-white to-gray-800 border border-gray-200 rounded mb-2"></div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">تلقائي</span>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">اللون الأساسي</label>
                <div class="grid grid-cols-6 gap-3">
                  <button
                    v-for="color in themeColors"
                    :key="color.name"
                    @click="themeSettings.primaryColor = color.value"
                    class="w-10 h-10 rounded-full border-2 transition-colors"
                    :class="themeSettings.primaryColor === color.value ? 'border-gray-900 dark:border-white' : 'border-gray-300 dark:border-gray-600'"
                    :style="{ backgroundColor: color.value }"
                  ></button>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div v-if="activeSection === 'security'" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">إعدادات الأمان</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الحالية</label>
                <input
                  v-model="securitySettings.currentPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الجديدة</label>
                <input
                  v-model="securitySettings.newPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
                <input
                  v-model="securitySettings.confirmPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div class="flex items-center space-x-4">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  تغيير كلمة المرور
                </button>
                <button class="px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                  حذف الحساب
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const activeSection = ref('account');

const settingsSections = ref([
  { id: 'account', name: 'الحساب', icon: '👤' },
  { id: 'notifications', name: 'الإشعارات', icon: '🔔' },
  { id: 'privacy', name: 'الخصوصية', icon: '🔒' },
  { id: 'theme', name: 'المظهر', icon: '🎨' },
  { id: 'security', name: 'الأمان', icon: '🛡️' }
]);

const accountSettings = reactive({
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  bio: 'مطور أمن سيبراني متخصص في أمن الشبكات والويب'
});

const notificationSettings = ref([
  {
    id: 1,
    title: 'إشعارات المهام',
    description: 'تذكيرات بالمهام المعلقة والجديدة',
    enabled: true
  },
  {
    id: 2,
    title: 'إشعارات الإنجازات',
    description: 'إشعارات عند إكمال المهام والإنجازات',
    enabled: true
  },
  {
    id: 3,
    title: 'إشعارات الدراسة',
    description: 'تذكيرات بمواعيد الدراسة',
    enabled: false
  },
  {
    id: 4,
    title: 'إشعارات التحديثات',
    description: 'إشعارات بتحديثات التطبيق والميزات الجديدة',
    enabled: true
  }
]);

const privacySettings = reactive({
  publicProfile: false,
  shareProgress: true,
  analytics: true
});

const themeSettings = reactive({
  mode: 'auto',
  primaryColor: '#3b82f6'
});

const securitySettings = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const themeColors = ref([
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Pink', value: '#ec4899' }
]);
</script>