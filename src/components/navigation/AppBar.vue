<template>
  <v-app-bar app color="background" elevation="1" class="animate-fade-in">
    <v-toolbar-title class="font-weight-bold text-primary" @click="$emit('go-dashboard')" style="cursor: pointer;">
      {{ title }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tabs color="primary" class="d-none d-md-flex" grow>
      <v-tab to="/" prepend-icon="mdi-home-variant" />
      <v-tab to="/achievements" prepend-icon="mdi-trophy-variant" />
      <v-tab to="/notebook" prepend-icon="mdi-notebook" />
    </v-tabs>
    <v-spacer></v-spacer>
    <v-btn @click="$emit('toggle-lang')" variant="text" class="font-weight-bold mx-1">
      {{ lang === 'ar' ? 'EN' : 'ع' }}
    </v-btn>
    <v-btn @click="$emit('toggle-theme')" variant="text" icon>
      <v-icon>{{ theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script setup lang="ts">
defineProps<{
  modelValue: string;
  lang: string;
  theme: string;
  title: string;
}>();
const emit = defineEmits(['update:modelValue', 'toggle-lang', 'toggle-theme', 'go-dashboard']);
</script>