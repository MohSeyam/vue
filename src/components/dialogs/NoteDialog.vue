<template>
  <v-dialog v-model="modelValue" max-width="800px" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">{{ t.editNote }}</span>
        <v-btn icon="mdi-close" variant="text" @click="$emit('close')"></v-btn>
      </v-card-title>
      <v-card-subtitle>{{ t.noteOnTask }} "{{ taskDescription }}"</v-card-subtitle>
      <v-card-text class="quill-container">
        <v-text-field :label="t.noteTitle" v-model="note.title" variant="outlined" class="mb-4" />
        <v-text-field :label="t.keywords" v-model="note.keywords" variant="outlined" class="mb-4" hint="مفصولة بفاصلة" />
        <QuillEditor v-model="note.content" :rtl="lang === 'ar'" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="error" @click="$emit('delete')">{{ t.deleteNote }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')">{{ t.cancel }}</v-btn>
        <v-btn color="primary" variant="flat" @click="$emit('save', note)">{{ t.saveNote }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import QuillEditor from '../common/QuillEditor.vue';
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue: boolean, note: any, lang: string, t: any, taskDescription: string }>();
const emit = defineEmits(['update:modelValue', 'save', 'delete', 'close']);
const note = ref({ ...props.note });
watch(() => props.note, v => note.value = { ...v });
</script>