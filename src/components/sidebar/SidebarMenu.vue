<template>
  <v-navigation-drawer app permanent class="animate-fade-in">
    <v-list nav>
      <v-list-item v-for="item in menu" :key="item.value" :to="item.to" link>
        <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { inject } from 'vue';
const { t } = inject('app') as any;
const menu = [
  { value: 'dashboard', title: t.dashboard || t.home, icon: 'mdi-home-variant', to: '/' },
  { value: 'phase', title: t.planOverview, icon: 'mdi-format-list-bulleted-square', to: '/plan' },
  { value: 'notebook', title: t.notebook, icon: 'mdi-notebook', to: '/notebook' },
  { value: 'journal', title: t.journal, icon: 'mdi-book-open-variant', to: '/journal' },
  { value: 'achievements', title: t.achievements, icon: 'mdi-trophy-variant', to: '/achievements' },
  { value: 'settings', title: t.settings, icon: 'mdi-cog', to: '/settings' },
];
</script>