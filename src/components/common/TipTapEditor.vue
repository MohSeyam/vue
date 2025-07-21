<template>
  <div>
    <editor-content :editor="editor" class="tiptap-editor" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
const props = defineProps<{ modelValue: string, rtl?: boolean }>();
const emit = defineEmits(['update:modelValue']);
const editor = ref<Editor>();
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: '...' }),
    ],
    editorProps: {
      attributes: {
        dir: props.rtl ? 'rtl' : 'ltr',
        class: 'tiptap-editor',
      },
    },
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML());
    },
  });
});
watch(() => props.modelValue, v => {
  if (editor.value && editor.value.getHTML() !== v) editor.value.commands.setContent(v || '', {});
});
onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
<style scoped>
.tiptap-editor {
  min-height: 150px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
}
</style>