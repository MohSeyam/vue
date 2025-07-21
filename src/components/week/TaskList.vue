<template>
  <v-list dense>
    <v-list-item v-for="task in props.tasks" :key="task.id">
      <v-list-item-icon><v-icon color="primary">mdi-checkbox-blank-circle-outline</v-icon></v-list-item-icon>
      <v-list-item-title>{{ (task as any).description[$i18n.locale] || (task as any).description.en }}</v-list-item-title>
      <v-list-item-subtitle>
        <span class="me-2">{{ (task as any).type }}</span>
        <span>{{ (task as any).duration }} {{ $t('tasks.min', 'دقيقة') }}</span>
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
useI18n()
const props = defineProps<{ tasks: any[] }>()
</script>