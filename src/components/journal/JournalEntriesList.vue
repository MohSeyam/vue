<template>
  <div>
    <div v-for="entry in entries" :key="entry.id" class="mb-3">
      <JournalEntry
        :entry="entry"
        :dayLabel="getDayLabel(entry.week, entry.dayKey)"
        :expanded="expandedId === entry.id"
        @toggle="expandedId = expandedId === entry.id ? null : entry.id"
        @edit="$emit('edit', entry)"
        @delete="$emit('delete', entry.id)"
      />
    </div>
    <div v-if="!entries.length" class="text-center text-gray-400 mt-8 text-lg font-bold">{{ $t('journal.noEntries') }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import JournalEntry from './JournalEntry.vue'
import { usePlanStore } from '@/stores/usePlanStore'
const props = defineProps<{ entries: any[] }>()
const expandedId = ref(null)
const planStore = usePlanStore()
function getDayLabel(week, dayKey) {
  const w = planStore.weeks.find(w => String(w.week) === String(week))
  const d = w?.days.find(d => d.key === dayKey)
  return d ? d.day.en : dayKey
}
</script>