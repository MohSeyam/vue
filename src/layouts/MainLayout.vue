<template>
  <v-app>
    <SidebarMenu class="d-none d-md-flex" />
    <AppBar
      :model-value="page"
      :lang="lang"
      :theme="theme"
      :title="title"
      @update:modelValue="setPage"
      @toggle-lang="toggleLang"
      @toggle-theme="toggleTheme"
      @go-dashboard="goDashboard"
    />
    <v-main>
      <slot />
    </v-main>
    <BottomNav
      :model-value="page"
      :t="t"
      @update:modelValue="setPage"
    />
  </v-app>
</template>
<script setup lang="ts">
import AppBar from '../components/navigation/AppBar.vue';
import BottomNav from '../components/navigation/BottomNav.vue';
import SidebarMenu from '../components/sidebar/SidebarMenu.vue';
import { inject } from 'vue';
const { lang, theme, t, view, setView, toggleLang, toggleTheme } = inject('app') as any;
const page = view.page;
const title = t.planTitle;
function setPage(val: string) { setView({ page: val }); }
function goDashboard() { setView({ page: 'dashboard' }); }
</script>