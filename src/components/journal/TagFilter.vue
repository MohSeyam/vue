<template>
  <div class="flex gap-2 flex-wrap">
    <button
      @click="$emit('update:selectedTag', '')"
      :class="[selectedTag === '' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-3 py-1 rounded-full text-xs font-bold transition hover:bg-cyan-400']"
    >
      {{ $t('journal.allTags') }}
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      @click="$emit('update:selectedTag', tag === selectedTag ? '' : tag)"
      :class="[selectedTag === tag ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-3 py-1 rounded-full text-xs font-bold transition hover:bg-cyan-400']"
    >
      #{{ tag }}
    </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ tags: string[], selectedTag: string }>()
const emit = defineEmits(['update:selectedTag'])
</script>