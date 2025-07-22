<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="font-weight-bold text-primary">{{ $t('journal.addEntry', 'إضافة تدوينة أسبوعية') }}</v-card-title>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-textarea v-model="content" :label="$t('journal.content')" rows="6" auto-grow required class="mb-4"/>
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
import { ref } from 'vue'
const props = defineProps({ entry: Object })
const emit = defineEmits(['save', 'close'])
const dialog = ref(true)
const content = ref('')
if (props.entry) content.value = props.entry.content || ''
function save() {
  emit('save', { ...props.entry, content: content.value })
  dialog.value = false
}
function close() {
  emit('close')
  dialog.value = false
}
</script>