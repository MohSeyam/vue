<template>
  <div class="relative">
    <!-- Notification Bell -->
    <button
      @click="toggleNotifications"
      class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
    >
      <span class="text-lg">🔔</span>
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Notification Panel -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">الإشعارات</h3>
        <div class="flex items-center space-x-2">
          <button
            @click="markAllAsRead"
            class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            تحديد الكل كمقروء
          </button>
          <button
            @click="toggleNotifications"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="max-h-96 overflow-y-auto">
        <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
          لا توجد إشعارات جديدة
        </div>
        
        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            @click="handleNotificationClick(notification)"
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notification.read }"
          >
            <div class="flex items-start space-x-3">
              <!-- Notification Icon -->
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                  :class="getNotificationIconClass(notification.type)"
                >
                  {{ getNotificationIcon(notification.type) }}
                </div>
              </div>

              <!-- Notification Content -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {{ formatTime(notification.timestamp) }}
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex-shrink-0 flex items-center space-x-1">
                <button
                  v-if="!notification.read"
                  @click.stop="markAsRead(notification.id)"
                  class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  تحديد كمقروء
                </button>
                <button
                  @click.stop="deleteNotification(notification.id)"
                  class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <router-link
          to="/notifications"
          class="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          عرض جميع الإشعارات
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    type: string;
    data: any;
  };
}

const isOpen = ref(false);
const notifications = ref<Notification[]>([
  {
    id: 1,
    type: 'achievement',
    title: 'إنجاز جديد! 🏆',
    message: 'لقد أكملت 10 مهام في أمن الشبكات',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'تم حفظ الملاحظة',
    message: 'تم حفظ ملاحظتك بنجاح',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false
  },
  {
    id: 3,
    type: 'warning',
    title: 'تذكير بالدراسة',
    message: 'لديك مهام معلقة تحتاج إلى إكمال',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true
  }
]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

function toggleNotifications() {
  isOpen.value = !isOpen.value;
}

function markAsRead(id: number) {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
}

function markAllAsRead() {
  notifications.value.forEach(n => n.read = true);
}

function deleteNotification(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id);
}

function handleNotificationClick(notification: Notification) {
  if (!notification.read) {
    markAsRead(notification.id);
  }
  
  // Handle notification action
  if (notification.action) {
    // TODO: Implement action handling
    console.log('Notification action:', notification.action);
  }
}

function getNotificationIcon(type: string): string {
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
    achievement: '🏆'
  };
  return icons[type as keyof typeof icons] || '📢';
}

function getNotificationIconClass(type: string): string {
  const classes = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    achievement: 'bg-purple-500'
  };
  return classes[type as keyof typeof classes] || 'bg-gray-500';
}

function formatTime(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'الآن';
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  return `منذ ${days} يوم`;
}

// Close notifications when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as Element;
  if (!target.closest('.notification-center')) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>