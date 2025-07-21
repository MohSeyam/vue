<template>
  <v-list dense>
    <v-list-item v-for="task in tasks" :key="task.id">
      <v-list-item-icon><v-icon color="primary">mdi-checkbox-blank-circle-outline</v-icon></v-list-item-icon>
      <v-list-item-title>{{ task.description[$i18n.locale] || task.description.en }}</v-list-item-title>
      <v-list-item-subtitle>
        <span class="me-2">{{ task.type }}</span>
        <span>{{ task.duration }} {{ $t('tasks.min', 'دقيقة') }}</span>
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Task } from '@/types/plan'
const props = defineProps({ tasks: Array })
useI18n()
</script>