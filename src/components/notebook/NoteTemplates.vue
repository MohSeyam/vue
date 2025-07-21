<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
    <h3 class="font-bold mb-2">{{ $t('notebook.templates') }}</h3>
    <div class="flex flex-wrap gap-3">
      <button v-for="tpl in templates" :key="tpl.id" @click="$emit('insert', tpl)" class="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 px-3 py-2 rounded-lg shadow hover:bg-cyan-200 dark:hover:bg-cyan-800 transition flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        {{ getText(tpl.title) }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getText } from '@/utils/getText'
const templates = [
  { id: 'tpl1', title: { en: 'Meeting Notes', ar: 'ملاحظات اجتماع' }, content: { en: '', ar: '' } },
  { id: 'tpl2', title: { en: 'Learning Summary', ar: 'ملخص تعلم' }, content: { en: '', ar: '' } },
  { id: 'tpl3', title: { en: 'Daily Reflection', ar: 'تأمل يومي' }, content: { en: '', ar: '' } }
]
</script>