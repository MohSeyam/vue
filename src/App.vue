<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>مدير الأمن السيبراني</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleLocale"><v-icon>mdi-translate</v-icon></v-btn>
      <v-btn icon @click="toggleTheme"><v-icon>{{ theme === 'dark' ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon></v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app :right="$vuetify.locale.rtl">
      <v-list>
        <v-list-item v-for="item in navItems" :key="item.path" :to="item.path" link>
          <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
const drawer = ref(false)
const { locale } = useI18n()
const theme = useTheme()
const navItems = [
  { path: '/dashboard', icon: 'mdi-view-dashboard' },
  { path: '/notebook', icon: 'mdi-notebook' },
  { path: '/journal', icon: 'mdi-book-open' },
  { path: '/achievements', icon: 'mdi-trophy' },
  { path: '/settings', icon: 'mdi-cog' }
]
function toggleLocale() {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
  document.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
}
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
