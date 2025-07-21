<template>
  <div>
    <div v-for="entry in entries" :key="entry.id" class="mb-3">
      <JournalEntry
        :entry="entry"
        :dayLabel="getDayLabel(entry.week, entry.dayKey)"
        :dayDate="getDayDate(entry.week, entry.dayKey)"
        :expanded="expandedIds.includes(entry.id)"
        @toggle="toggleExpand(entry.id)"
        @edit="$emit('edit', entry)"
        @delete="$emit('delete', entry.id)"
      />
    </div>
    <div v-if="!entries.length" class="text-center text-gray-400 mt-8 text-lg font-bold">{{ $t('journal.noEntries') }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import JournalEntry from './JournalEntry.vue'
import { usePlanStore } from '@/stores/usePlanStore'
defineProps<{ entries: any[] }>()
const expandedIds = ref<string[]>([])
const planStore = usePlanStore()
const daysMap = computed(() => {
  const map: Record<string, { label: string, date?: string }> = {}
  planStore.weeks.forEach(w => {
    w.days.forEach(d => {
      map[`${w.week}|${d.key}`] = { label: d.day.en, date: d.date }
    })
  })
  return map
})
function getDayLabel(week: number, dayKey: string) {
  const d = daysMap.value[`${week}|${dayKey}`]
  return d ? d.label : dayKey
}
function getDayDate(week: number, dayKey: string) {
  const d = daysMap.value[`${week}|${dayKey}`]
  return d?.date
}
function toggleExpand(id: string) {
  if (expandedIds.value.includes(id)) {
    expandedIds.value = expandedIds.value.filter(eid => eid !== id)
  } else {
    expandedIds.value.push(id)
  }
}
</script>