<template>
  <div>
    <v-row class="mb-4" align="center" justify="space-between" no-gutters>
      <v-col cols="12" sm="8">
        <TagFilter :tags="allTags" v-model:selectedTag="selectedTag" />
      </v-col>
      <v-col cols="12" sm="4">
        <SearchBar v-model="search" />
      </v-col>
    </v-row>
    <v-row>
      <transition-group name="fade" tag="div" class="w-100 d-flex flex-wrap gap-4">
        <v-col v-for="note in notes" :key="note.id" cols="12" sm="6" md="4">
          <NoteCard
            :note="note"
            :search="search"
            @edit="$emit('edit', note)"
            @delete="$emit('delete', note.id)"
          />
        </v-col>
      </transition-group>
    </v-row>
    <v-alert v-if="!notes.length" type="info" class="mt-8 text-center" border="start" color="primary" variant="tonal">
      {{ $t('notebook.noNotes') }}
    </v-alert>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import NoteCard from './NoteCard.vue'
import TagFilter from './TagFilter.vue'
import SearchBar from './SearchBar.vue'
import type { Note } from '@/types/plan'
const props = defineProps<{ notes: Note[] }>()
const emit = defineEmits(['edit', 'delete'])
const search = ref('')
const selectedTag = ref('')
const allTags = computed(() => Array.from(new Set(props.notes.flatMap(n => n.tags || []))))
</script>
<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>