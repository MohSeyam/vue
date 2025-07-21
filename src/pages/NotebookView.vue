<template>
  <v-container fluid class="pa-4 pa-md-8 animate-fade-in">
    <v-card-title class="text-h4 font-weight-bold mb-4">{{ t.notebook }}</v-card-title>
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <SearchBar v-model="search" />
      </v-col>
      <v-col cols="12" md="6">
        <TagFilter v-model="selectedTags" :tags="allTags" />
      </v-col>
    </v-row>
    <div v-if="filteredNotes.length === 0" class="text-center py-16">
      <v-icon size="64" color="grey-lighten-1">mdi-notebook-multiple</v-icon>
      <h3 class="mt-4 text-h6 text-grey">{{ t.noNotesInNotebook }}</h3>
    </div>
    <v-row v-else class="mt-6">
      <v-col v-for="note in filteredNotes" :key="note.updatedAt" cols="12" md="6" lg="4">
        <AnimatedCard @click="openNote(note)">
          <v-card-text>
            <div class="text-caption text-grey">{{ note.weekTitle }}</div>
            <p class="text-h6 font-weight-bold text-primary truncate">{{ note.title }}</p>
            <div class="text-body-2 text-grey-darken-1 mt-2" style="height: 4.5em; overflow: hidden;" v-html="note.content"></div>
          </v-card-text>
          <v-card-actions class="px-4">
            <div class="d-flex flex-wrap ga-1">
              <v-chip v-for="kw in (note.keywords || '').split(',').slice(0,3)" :key="kw" size="x-small" color="purple" variant="tonal">{{ kw.trim() }}</v-chip>
            </div>
            <v-spacer></v-spacer>
            <div class="text-caption text-grey">{{ formatDate(note.updatedAt, lang) }}</div>
          </v-card-actions>
        </AnimatedCard>
      </v-col>
    </v-row>
    <NoteDialog
      v-model="noteDialogOpen"
      :note="activeNote"
      :lang="lang"
      :t="t"
      :taskDescription="activeNote?.taskDescription || ''"
      @save="saveNote"
      @delete="deleteNote"
      @close="closeDialog"
    />
  </v-container>
</template>
<script setup lang="ts">
import AnimatedCard from '../components/common/AnimatedCard.vue';
import NoteDialog from '../components/dialogs/NoteDialog.vue';
import SearchBar from '../components/SearchBar.vue';
import TagFilter from '../components/TagFilter.vue';
import { ref, computed, inject } from 'vue';
const { lang, t, appState } = inject('app') as any;
const search = ref('');
const selectedTags = ref<string[]>([]);
const allNotes = computed(() => {
  // استخرج جميع الملاحظات من appState (منطق مبسط)
  if (!appState.value || !appState.value.notes) return [];
  const notesList: any[] = [];
  Object.keys(appState.value.notes).forEach(weekKey => {
    Object.keys(appState.value.notes[weekKey].days).forEach(dayIdx => {
      const dayNotes = appState.value.notes[weekKey].days[dayIdx];
      Object.keys(dayNotes).forEach(taskId => {
        const note = dayNotes[taskId];
        notesList.push({
          ...note,
          weekTitle: `الأسبوع ${weekKey}`,
          taskDescription: note.title,
        });
      });
    });
  });
  return notesList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
});
const allTags = computed(() => {
  const tags = new Set<string>();
  allNotes.value.forEach(note => (note.keywords || '').split(',').forEach((kw: string) => tags.add(kw.trim())));
  return Array.from(tags).filter(Boolean);
});
const filteredNotes = computed(() => {
  return allNotes.value.filter(note => {
    const matchesSearch = !search.value || note.title.includes(search.value) || note.content.includes(search.value);
    const matchesTags = selectedTags.value.length === 0 || selectedTags.value.some(tag => (note.keywords || '').includes(tag));
    return matchesSearch && matchesTags;
  });
});
const noteDialogOpen = ref(false);
const activeNote = ref<any>({ title: '', content: '', keywords: '' });
function openNote(note: any) {
  activeNote.value = { ...note };
  noteDialogOpen.value = true;
}
function saveNote(note: any) {
  // منطق الحفظ (يجب ربطه مع appState)
  noteDialogOpen.value = false;
}
function deleteNote() {
  // منطق الحذف (يجب ربطه مع appState)
  noteDialogOpen.value = false;
}
function closeDialog() {
  noteDialogOpen.value = false;
}
function formatDate(date: string, lang: string) {
  return new Date(date).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' });
}
</script>