<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded shadow max-w-lg mx-auto">
    <input v-model="title" placeholder="Title" class="w-full mb-2 p-2 rounded border" />
    <textarea v-model="content" placeholder="Write your note in Markdown..." rows="8" class="w-full mb-2 p-2 rounded border font-mono"></textarea>
    <input v-model="tagsInput" placeholder="Tags (comma separated)" class="w-full mb-2 p-2 rounded border" />
    <div class="flex justify-end gap-2">
      <button @click="emitSave" class="px-4 py-1 bg-blue-500 text-white rounded">Save</button>
      <button @click="$emit('cancel')" class="px-4 py-1 bg-gray-400 text-white rounded">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, onMounted as _onMounted } from 'vue';

const props = defineProps({
  note: {
    type: Object,
    default: () => ({ title: '', content: '', tags: [] })
  }
});
const emit = defineEmits(['save', 'cancel']);

const title = ref(props.note.title || '');
const content = ref(props.note.content || '');
const tagsInput = ref((props.note.tags || []).join(', '));

function emitSave() {
  emit('save', {
    title: title.value,
    content: content.value,
    tags: tagsInput.value.split(',').map((t: string) => t.trim()).filter(Boolean)
  });
}

watch(() => props.note, (val) => {
  title.value = val.title || '';
  content.value = val.content || '';
  tagsInput.value = (val.tags || []).join(', ');
});
</script>