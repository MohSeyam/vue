<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-all cursor-pointer" @click="$emit('toggle')">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-lg">{{ entry.title.en }}</h2>
        <span class="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 px-2 py-1 rounded">{{ dayLabel }}</span>
      </div>
      <div class="flex gap-2">
        <button @click.stop="$emit('edit')" class="text-gray-400 hover:text-cyan-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6v-6H3v6z"/></svg></button>
        <button @click.stop="$emit('delete')" class="text-gray-400 hover:text-red-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>
    </div>
    <transition name="expand">
      <div v-if="expanded" class="mt-3">
        <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ entry.content.en }}</p>
        <div v-if="entry.tags?.length" class="mt-2 text-xs text-gray-400">#{{ entry.tags.join(' #') }}</div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ entry: any, dayLabel: string, expanded: boolean }>()
</script>
<style scoped>
.expand-enter-active, .expand-leave-active { transition: max-height 0.3s, opacity 0.3s; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }
.expand-enter-to, .expand-leave-from { max-height: 500px; opacity: 1; }
</style>