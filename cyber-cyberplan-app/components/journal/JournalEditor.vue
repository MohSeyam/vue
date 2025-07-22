<template>
  <div class="quill-container">
    <div ref="editorRef"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
const props = defineProps<{ modelValue: string, rtl?: boolean }>();
const emit = defineEmits(['update:modelValue']);
const editorRef = ref();
let quill: any;
onMounted(() => {
  import('quill').then(({ default: Quill }) => {
    quill = new Quill(editorRef.value, {
      theme: 'snow',
      modules: { toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'code-block']] },
      placeholder: '...'
    });
    quill.root.innerHTML = props.modelValue || '';
    if (props.rtl) quill.root.dir = 'rtl';
    quill.on('text-change', () => {
      emit('update:modelValue', quill.root.innerHTML);
    });
  });
});
watch(() => props.modelValue, v => {
  if (quill && quill.root.innerHTML !== v) quill.root.innerHTML = v || '';
});
</script>
<style scoped>
.quill-container .ql-editor {
  min-height: 150px;
}
</style>