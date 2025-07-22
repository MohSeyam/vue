<template>
  <v-card class="pa-4 animate-fade-in">
    <v-card-title class="font-weight-bold">{{ t.advancedSearch }}</v-card-title>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="query" :label="t.search" prepend-inner-icon="mdi-magnify" clearable />
      </v-col>
      <v-col cols="12" md="3">
        <TagFilter v-model="selectedTags" :tags="tags" />
      </v-col>
      <v-col cols="12" md="3">
        <DateFilter v-model="selectedDate" />
      </v-col>
    </v-row>
    <v-list>
      <v-list-item v-for="item in filteredResults" :key="item.id">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import TagFilter from '../TagFilter.vue';
import DateFilter from '../DateFilter.vue';
const { t } = inject('app') as any;
const props = defineProps<{ items: { id: string, title: string, date: string, tags?: string[] }[], tags: string[] }>();
const query = ref('');
const selectedTags = ref<string[]>([]);
const selectedDate = ref('');
const filteredResults = computed(() => {
  return props.items.filter(item => {
    const matchesQuery = !query.value || item.title.includes(query.value);
    const matchesTags = selectedTags.value.length === 0 || (item.tags || []).some(tag => selectedTags.value.includes(tag));
    const matchesDate = !selectedDate.value || item.date.startsWith(selectedDate.value);
    return matchesQuery && matchesTags && matchesDate;
  });
});
</script>