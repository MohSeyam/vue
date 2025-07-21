<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="font-weight-bold text-primary">{{ entry && entry.id ? $t('journal.editEntry') : $t('journal.addEntry') }}</v-card-title>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-textarea v-model="content" :label="$t('journal.content')" rows="6" auto-grow required class="mb-4"/>
          <v-combobox v-model="tags" :items="allTags" :label="$t('journal.tags')" multiple chips clearable class="mb-2"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="close">{{ $t('journal.cancel', 'إلغاء') }}</v-btn>
          <v-btn color="primary" type="submit">{{ $t('journal.save', 'حفظ') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useJournalStore } from '@/stores/useJournalStore'
const props = defineProps({ entry: Object })
const emit = defineEmits(['save', 'close'])
const store = useJournalStore()
const dialog = ref(true)
const content = ref('')
const tags = ref([])
const allTags = computed(() => Array.from(new Set(store.entries.flatMap(e => e.tags || []))))
watch(() => props.entry, (e) => {
  if (e) {
    content.value = e.content || ''
    tags.value = e.tags || []
  }
}, { immediate: true })
function save() {
  emit('save', { ...props.entry, content: content.value, tags: tags.value })
  dialog.value = false
}
function close() {
  emit('close')
  dialog.value = false
}
</script>
<style scoped>
.input { @apply w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-cyan-500; }
</style>