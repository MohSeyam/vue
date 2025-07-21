<template>
  <ul class="space-y-3">
    <li v-for="task in tasks" :key="task.id" class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-sm">
      <input type="checkbox" v-model="task.done" class="accent-cyan-500 w-5 h-5 rounded focus:ring-2 focus:ring-cyan-400" />
      <span :class="[task.done ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white', 'font-medium flex-1 transition-colors']">
        {{ task.title }}
      </span>
      <span v-if="task.done" class="text-xs text-green-500 font-bold">{{ $t('tasks.done') }}</span>
    </li>
    <li v-if="!tasks || tasks.length === 0" class="text-center text-gray-400 py-4">{{ $t('tasks.noTasks') }}</li>
  </ul>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Task } from '@/types/plan'
const props = defineProps<{ tasks: Task[] }>()
const { t } = useI18n()
</script>