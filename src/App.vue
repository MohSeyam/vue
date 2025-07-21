<template>
  <v-app :theme="theme">
    <!-- App Bar (Header) -->
    <v-app-bar app color="background" elevation="1">
      <v-toolbar-title class="font-weight-bold text-primary" @click="setView({ page: 'dashboard' })" style="cursor: pointer;">
        {{ t.planTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Desktop Navigation Tabs -->
      <v-tabs v-model="view.page" color="primary" class="d-none d-md-block">
        <v-tab value="dashboard" prepend-icon="mdi-home-variant">{{ t.home }}</v-tab>
        <v-tab value="achievements" prepend-icon="mdi-trophy-variant">{{ t.achievements }}</v-tab>
        <v-tab value="notebook" prepend-icon="mdi-notebook">{{ t.notebook }}</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <!-- Language and Theme Toggles -->
      <v-btn @click="toggleLang" variant="text" class="font-weight-bold mx-1">
        {{ lang === 'ar' ? 'EN' : 'ع' }}
      </v-btn>
      <v-btn @click="toggleTheme" variant="text" icon>
        <v-icon>{{ theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Main Content Area -->
    <v-main>
      <v-container fluid class="pa-4 pa-md-8">
        <component :is="currentViewComponent" class="animate-fade-in"></component>
      </v-container>
    </v-main>
    <!-- Mobile Bottom Navigation -->
    <v-bottom-navigation v-model="view.page" color="primary" grow class="d-md-none" app>
      <v-btn value="dashboard">
        <v-icon>mdi-home-variant</v-icon>
        <span>{{ t.home }}</span>
      </v-btn>
      <v-btn value="sidebar">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
        <span>{{ t.planOverview }}</span>
      </v-btn>
      <v-btn value="achievements">
        <v-icon>mdi-trophy-variant</v-icon>
        <span>{{ t.achievements }}</span>
      </v-btn>
      <v-btn value="notebook">
        <v-icon>mdi-notebook</v-icon>
        <span>{{ t.notebook }}</span>
      </v-btn>
    </v-bottom-navigation>
    <!-- Note Editor Dialog (Modal) -->
    <!-- ... سيتم نقل منطق النوافذ المنبثقة هنا لاحقًا ... -->
  </v-app>
</template>
<script setup lang="ts">
// سيتم ربط Pinia/i18n/Vuetify/Composables هنا كما في الكود المقترح
</script>
<style scoped>
body {
  font-family: 'Cairo', 'Segoe UI', sans-serif;
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.v-card--link:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04) !important;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
[dir="rtl"] .v-list-item-title,
[dir="rtl"] .v-list-item-subtitle {
  text-align: right;
}
</style>
