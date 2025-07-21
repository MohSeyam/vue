<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="font-weight-bold text-primary">{{ note && note.id ? $t('notebook.editNote') : $t('notebook.addNote') }}</v-card-title>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-text-field v-model="title" :label="$t('notebook.title')" required class="mb-4"/>
          <v-textarea v-model="content" :label="$t('notebook.content')" rows="5" auto-grow required class="mb-4"/>
          <v-combobox v-model="tags" :items="allTags" :label="$t('notebook.tags')" multiple chips clearable class="mb-2"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="close">{{ $t('notebook.cancel', 'إلغاء') }}</v-btn>
          <v-btn color="primary" type="submit">{{ $t('notebook.save', 'حفظ') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useNotebookStore } from '@/stores/useNotebookStore'
const props = defineProps({ note: Object })
const emit = defineEmits(['save', 'close'])
const store = useNotebookStore()
const dialog = ref(true)
const title = ref('')
const content = ref('')
const tags = ref([])
const allTags = computed(() => Array.from(new Set(store.notes.flatMap(n => n.tags || []))))
watch(() => props.note, (n) => {
  if (n) {
    title.value = n.title?.en || ''
    content.value = n.content?.en || ''
    tags.value = n.tags || []
  }
}, { immediate: true })
function save() {
  emit('save', { ...props.note, title: { en: title.value }, content: { en: content.value }, tags: tags.value })
  dialog.value = false
}
function close() {
  emit('close')
  dialog.value = false
}
</script>
