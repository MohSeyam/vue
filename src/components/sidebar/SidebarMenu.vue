<template>
  <v-navigation-drawer app permanent class="animate-fade-in">
    <v-list nav>
      <v-list-item v-for="item in menu" :key="item.value" :to="item.to">
        <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { inject } from 'vue';
const { t } = inject('app') as any;
const menu = [
  { value: 'dashboard', label: t.dashboard || t.home, icon: 'mdi-home-variant', to: '/dashboard' },
  { value: 'notebook', label: t.notebook, icon: 'mdi-notebook', to: '/notebook' },
  { value: 'journal', label: t.journal, icon: 'mdi-book-open-variant', to: '/journal' },
  { value: 'achievements', label: t.achievements, icon: 'mdi-trophy-variant', to: '/achievements' },
  { value: 'settings', label: t.settings, icon: 'mdi-cog', to: '/settings' },
];
</script>