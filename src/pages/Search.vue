<template>
  <v-container class="pa-4 pa-md-8 animate-fade-in">
    <AdvancedSearch :items="items" :tags="tags" />
  </v-container>
</template>
<script setup lang="ts">
import AdvancedSearch from '../components/search/AdvancedSearch.vue';
import { computed, inject } from 'vue';
const { appState, plan, lang } = inject('app') as any;
// استخراج جميع الملاحظات واليوميات من appState
const notes = computed(() => {
  if (!appState.value?.notes) return [];
  const list: any[] = [];
  Object.keys(appState.value.notes).forEach(weekKey => {
    Object.keys(appState.value.notes[weekKey].days).forEach(dayIdx => {
      const dayNotes = appState.value.notes[weekKey].days[dayIdx];
      Object.keys(dayNotes).forEach(taskId => {
        const note = dayNotes[taskId];
        const week = plan.value.find((w: any) => w.week == weekKey);
        const day = week?.days[dayIdx];
        list.push({
          id: `note-${weekKey}-${dayIdx}-${taskId}`,
          title: note.title,
          date: note.updatedAt,
          tags: (note.keywords || '').split(',').map((kw: string) => kw.trim()),
          type: 'note',
          weekTitle: week ? week.title[lang.value] : '',
          dayTitle: day ? day.day[lang.value] : '',
        });
      });
    });
  });
  return list;
});
const journals = computed(() => {
  if (!appState.value?.journals) return [];
  const list: any[] = [];
  Object.keys(appState.value.journals).forEach(dayKey => {
    const journal = appState.value.journals[dayKey];
    if (journal) {
      list.push({
        id: `journal-${dayKey}`,
        title: journal.title,
        date: journal.updatedAt,
        tags: (journal.keywords || '').split(',').map((kw: string) => kw.trim()),
        type: 'journal',
        dayKey,
      });
    }
  });
  return list;
});
const items = computed(() => [...notes.value, ...journals.value]);
const tags = computed(() => {
  const tagSet = new Set<string>();
  items.value.forEach(item => (item.tags || []).forEach((kw: string) => tagSet.add(kw)));
  return Array.from(tagSet).filter(Boolean);
});
</script>