<template>
  <v-navigation-drawer app permanent class="animate-fade-in">
    <v-list nav>
      <v-list-item v-for="item in menu" :key="item.value" @click="goTo(item.value)">
        <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { inject } from 'vue';
const { t, view, setView } = inject('app') as any;
const menu = [
  { value: 'dashboard', label: t.dashboard || t.home, icon: 'mdi-home-variant' },
  { value: 'phase', label: t.planOverview, icon: 'mdi-format-list-bulleted-square' },
  { value: 'notebook', label: t.notebook, icon: 'mdi-notebook' },
  { value: 'journal', label: t.journal, icon: 'mdi-book-open-variant' },
  { value: 'achievements', label: t.achievements, icon: 'mdi-trophy-variant' },
  { value: 'settings', label: t.settings, icon: 'mdi-cog' },
];
function goTo(page) {
  setView({ page });
}
</script>