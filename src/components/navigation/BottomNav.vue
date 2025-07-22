<template>
  <v-bottom-navigation color="primary" grow class="d-md-none animate-fade-in" app>
    <v-btn to="/" link aria-label="الرئيسية">
      <v-icon>mdi-home-variant</v-icon>
      <span>{{ t.home }}</span>
    </v-btn>
    <v-btn to="/plan" link aria-label="نظرة على الخطة">
      <v-icon>mdi-format-list-bulleted-square</v-icon>
      <span>{{ t.planOverview }}</span>
    </v-btn>
    <v-btn to="/achievements" link aria-label="الإنجازات">
      <v-icon>mdi-trophy-variant</v-icon>
      <span>{{ t.achievements }}</span>
    </v-btn>
    <v-btn to="/notebook" link aria-label="دفتر الملاحظات">
      <v-icon>mdi-notebook</v-icon>
      <span>{{ t.notebook }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>
<script setup lang="ts">
defineProps<{
  modelValue: string;
  t: any;
}>();
const emit = defineEmits(['update:modelValue']);
</script>