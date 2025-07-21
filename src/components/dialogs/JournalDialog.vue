<template>
  <v-dialog v-model="modelValue" max-width="800px" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">{{ t.editJournal }}</span>
        <v-btn icon="mdi-close" variant="text" @click="$emit('close')"></v-btn>
      </v-card-title>
      <v-card-subtitle>{{ t.journalOnDay }} "{{ dayTitle }}"</v-card-subtitle>
      <v-card-text>
        <v-text-field :label="t.journalTitle" v-model="journal.title" variant="outlined" class="mb-4" />
        <JournalEditor v-model="journal.content" :rtl="lang === 'ar'" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="error" @click="$emit('delete')">{{ t.deleteJournal }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')">{{ t.cancel }}</v-btn>
        <v-btn color="primary" variant="flat" @click="$emit('save', journal)">{{ t.saveJournal }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import JournalEditor from '../journal/JournalEditor.vue';
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue: boolean, journal: any, lang: string, t: any, dayTitle: string }>();
const emit = defineEmits(['update:modelValue', 'save', 'delete', 'close']);
const journal = ref({ ...props.journal });
watch(() => props.journal, v => journal.value = { ...v });
</script>