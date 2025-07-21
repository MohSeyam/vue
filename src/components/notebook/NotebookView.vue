<template>
  <v-container fluid class="py-8">
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <v-text-field v-model="search" :label="$t('notebook.search')" prepend-inner-icon="mdi-magnify" clearable></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="text-end">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openEditor = true">{{ $t('notebook.addNote') }}</v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-chip-group v-model="selectedTag" row>
          <v-chip v-for="tag in allTags" :key="tag" :value="tag" filter>{{ tag }}</v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="note in filteredNotes" :key="note.id" cols="12" sm="6" md="4">
        <v-card class="pa-4 mb-4" elevation="6">
          <v-card-title class="font-weight-bold text-primary">{{ getText(note.title) }}</v-card-title>
          <v-card-text class="mb-2">{{ getText(note.content).slice(0, 120) }}...</v-card-text>
          <div class="d-flex flex-wrap gap-1 mb-2">
            <v-chip v-for="tag in note.tags" :key="tag" size="x-small" color="secondary" class="me-1">{{ tag }}</v-chip>
          </div>
          <v-btn color="primary" icon="mdi-pencil" @click="editNote(note)" size="small" class="me-2"/>
        </v-card>
      </v-col>
      <v-col v-if="filteredNotes.length === 0" cols="12">
        <v-alert type="info" color="primary">{{ $t('notebook.noNotes') }}</v-alert>
      </v-col>
    </v-row>
    <NoteEditor v-if="openEditor" :note="editingNote" @save="saveNote" @close="closeEditor" />
  </v-container>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNotebookStore } from '@/stores/useNotebookStore'
import { getText } from '@/utils/getText'
import NoteEditor from './NoteEditor.vue'
const store = useNotebookStore()
const openEditor = ref(false)
const editingNote = ref<any>(null)
const search = ref('')
const selectedTag = ref('')
const allTags = computed(() => Array.from(new Set(store.notes.flatMap(n => n.tags || []))))
const filteredNotes = computed(() => {
  let notes = store.notes
  if (selectedTag.value) notes = notes.filter(n => n.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    notes = notes.filter(n => getText(n.title).toLowerCase().includes(q) || getText(n.content).toLowerCase().includes(q))
  }
  return notes
})
function editNote(note: any) {
  editingNote.value = note
  openEditor.value = true
}
function closeEditor() {
  openEditor.value = false
  editingNote.value = null
}
function saveNote(note: any) {
  store.addNote(note)
  closeEditor()
}
</script>
