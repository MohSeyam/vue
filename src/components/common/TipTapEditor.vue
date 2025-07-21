<template>
  <div :dir="rtl ? 'rtl' : 'ltr'">
    <div class="tiptap-toolbar mb-2 flex flex-wrap gap-1">
      <button v-for="btn in buttons" :key="btn.name" :title="btn.title" @click="btn.action" :class="['tiptap-btn', btn.active() ? 'active' : '']">
        <v-icon size="20">{{ btn.icon }}</v-icon>
      </button>
    </div>
    <EditorContent :editor="editor" class="tiptap-content" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// @ts-ignore
import * as lowlight from 'lowlight'
const props = defineProps({ modelValue: String, rtl: Boolean })
const emit = defineEmits(['update:modelValue'])
const editor = ref()
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: true }),
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    editorProps: {
      attributes: {
        class: 'prose max-w-full min-h-[180px] bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 p-3 focus:outline-none',
        style: props.rtl ? 'direction: rtl; text-align: right;' : 'direction: ltr; text-align: left;'
      }
    },
    onUpdate({ editor }) {
      emit('update:modelValue', editor.getHTML())
    }
  })
})
onBeforeUnmount(() => editor.value?.destroy())
watch(() => props.modelValue, val => {
  if (editor.value && val !== editor.value.getHTML()) editor.value.commands.setContent(val || '', false)
})
watch(() => props.rtl, val => {
  if (editor.value) editor.value.commands.setTextAlign(val ? 'right' : 'left')
})
const buttons = computed(() => [
  { name: 'bold', icon: 'mdi-format-bold', title: 'Bold', action: () => editor.value.chain().focus().toggleBold().run(), active: () => editor.value?.isActive('bold') },
  { name: 'italic', icon: 'mdi-format-italic', title: 'Italic', action: () => editor.value.chain().focus().toggleItalic().run(), active: () => editor.value?.isActive('italic') },
  { name: 'underline', icon: 'mdi-format-underline', title: 'Underline', action: () => editor.value.chain().focus().toggleUnderline().run(), active: () => editor.value?.isActive('underline') },
  { name: 'heading', icon: 'mdi-format-header-2', title: 'Heading', action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(), active: () => editor.value?.isActive('heading', { level: 2 }) },
  { name: 'bulletList', icon: 'mdi-format-list-bulleted', title: 'Bullet List', action: () => editor.value.chain().focus().toggleBulletList().run(), active: () => editor.value?.isActive('bulletList') },
  { name: 'orderedList', icon: 'mdi-format-list-numbered', title: 'Ordered List', action: () => editor.value.chain().focus().toggleOrderedList().run(), active: () => editor.value?.isActive('orderedList') },
  { name: 'link', icon: 'mdi-link-variant', title: 'Link', action: () => { const url = prompt('Enter URL'); if (url) editor.value.chain().focus().setLink({ href: url }).run() }, active: () => editor.value?.isActive('link') },
  { name: 'code', icon: 'mdi-code-tags', title: 'Code', action: () => editor.value.chain().focus().toggleCode().run(), active: () => editor.value?.isActive('code') },
  { name: 'highlight', icon: 'mdi-marker', title: 'Highlight', action: () => editor.value.chain().focus().toggleHighlight().run(), active: () => editor.value?.isActive('highlight') },
  { name: 'rtl', icon: 'mdi-format-align-right', title: 'RTL', action: () => editor.value.chain().focus().setTextAlign('right').run(), active: () => editor.value?.getAttributes('textAlign').textAlign === 'right' },
  { name: 'ltr', icon: 'mdi-format-align-left', title: 'LTR', action: () => editor.value.chain().focus().setTextAlign('left').run(), active: () => editor.value?.getAttributes('textAlign').textAlign === 'left' },
])
</script>
<style scoped>
.tiptap-toolbar {
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px 8px;
}
.tiptap-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  padding: 4px 6px;
  transition: background 0.2s;
}
.tiptap-btn.active, .tiptap-btn:hover {
  background: #e0e7ef;
}
.tiptap-content {
  min-height: 180px;
  font-size: 1rem;
  line-height: 1.7;
}
</style>