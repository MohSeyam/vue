<template>
  <v-container fluid class="py-8">
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <v-text-field v-model="search" :label="$t('journal.search')" prepend-inner-icon="mdi-magnify" clearable></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="text-end">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openEditor = true">{{ $t('journal.addEntry') }}</v-btn>
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
      <v-col v-for="entry in filteredEntries" :key="entry.id" cols="12" sm="6" md="4">
        <v-card class="pa-4 mb-4" elevation="6">
          <v-card-title class="font-weight-bold text-primary">{{ formatDate(entry.createdAt) }}</v-card-title>
          <v-card-text class="mb-2">{{ entry.content.slice(0, 120) }}...</v-card-text>
          <div class="d-flex flex-wrap gap-1 mb-2">
            <v-chip v-for="tag in entry.tags" :key="tag" size="x-small" color="secondary" class="me-1">{{ tag }}</v-chip>
          </div>
          <v-btn color="primary" icon="mdi-pencil" @click="editEntry(entry)" size="small" class="me-2"/><v-btn color="error" icon="mdi-delete" @click="deleteEntry()" size="small"/>
        </v-card>
      </v-col>
      <v-col v-if="filteredEntries.length === 0" cols="12">
        <v-alert type="info" color="primary">{{ $t('journal.noEntries') }}</v-alert>
      </v-col>
    </v-row>
    <JournalEntry v-if="openEditor" :entry="editingEntry" @save="saveEntry" @close="closeEditor" />
  </v-container>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useJournalStore } from '@/stores/useJournalStore'
import JournalEntry from './JournalEntry.vue'
const store = useJournalStore()
const openEditor = ref(false)
const editingEntry = ref<Record<string, any> | undefined>()
const search = ref('')
const selectedTag = ref('')
const allTags = computed(() => Array.from(new Set(store.entries.flatMap(e => e.tags || []))))
const filteredEntries = computed(() => {
  let entries = store.entries
  if (selectedTag.value) entries = entries.filter(e => e.tags?.includes(selectedTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    entries = entries.filter(e => e.content.toLowerCase().includes(q))
  }
  return entries
})
function editEntry(entry: any) {
  editingEntry.value = entry
  openEditor.value = true
}
function closeEditor() {
  openEditor.value = false
  editingEntry.value = undefined
}
function saveEntry(entry: any) {
  store.addEntry(entry)
  closeEditor()
}
function deleteEntry() {
  // إذا كان لديك دالة removeEntry في المتجر استخدمها هنا
  // store.removeEntry(id)
}
function formatDate(date: any) {
  return new Date(date).toLocaleDateString()
}
</script>