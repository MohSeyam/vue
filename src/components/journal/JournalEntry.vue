<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-xl relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-400 hover:text-red-500"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
      <h2 class="text-xl font-bold mb-4">{{ entry?.id ? $t('journal.editEntry') : $t('journal.addEntry') }}</h2>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="block font-semibold mb-1">{{ $t('journal.titleEn') }}</label>
          <input v-model="titleEn" ref="titleInput" required class="input" type="text" />
        </div>
        <div class="mb-3">
          <label class="block font-semibold mb-1">{{ $t('journal.titleAr') }}</label>
          <input v-model="titleAr" required class="input" type="text" dir="rtl" />
        </div>
        <div class="mb-3">
          <label class="block font-semibold mb-1">{{ $t('journal.contentEn') }} <span class="text-xs">(Markdown)</span></label>
          <textarea v-model="contentEn" required class="input" rows="4"></textarea>
        </div>
        <div class="mb-3">
          <label class="block font-semibold mb-1">{{ $t('journal.contentAr') }} <span class="text-xs">(Markdown)</span></label>
          <textarea v-model="contentAr" required class="input" rows="4" dir="rtl"></textarea>
        </div>
        <div class="mb-3">
          <label class="block font-semibold mb-1">{{ $t('journal.tags') }}</label>
          <input v-model="tags" class="input" type="text" :placeholder="$t('journal.tagsHint')" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{{ $t('common.cancel') }}</button>
          <button type="submit" class="px-4 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white">{{ $t('common.save') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{ entry?: any }>()
const emit = defineEmits(['save', 'close'])
const titleEn = ref('')
const titleAr = ref('')
const contentEn = ref('')
const contentAr = ref('')
const tags = ref('')
const titleInput = ref()
watch(() => props.entry, (n) => {
  titleEn.value = n?.title?.en || ''
  titleAr.value = n?.title?.ar || ''
  contentEn.value = n?.content?.en || ''
  contentAr.value = n?.content?.ar || ''
  tags.value = n?.tags?.join(', ') || ''
}, { immediate: true })
onMounted(() => {
  setTimeout(() => titleInput.value?.focus(), 100)
})
function submit() {
  emit('save', {
    id: props.entry?.id,
    title: { en: titleEn.value, ar: titleAr.value },
    content: { en: contentEn.value, ar: contentAr.value },
    tags: tags.value.split(',').map(t => t.trim()).filter(Boolean)
  })
}
</script>
<style scoped>
.input { @apply w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-cyan-500; }
</style>