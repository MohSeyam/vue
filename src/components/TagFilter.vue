<template>
  <v-select
    v-if="variant === 'select'"
    v-model="selected"
    :items="tags"
    :label="label || $t('tags')"
    multiple
    clearable
    @update:modelValue="$emit('update:modelValue', selected)"
    class="tag-filter"
  />
  <v-chip-group
    v-else-if="variant === 'chip'"
    v-model="selected"
    column
    class="mb-2"
    selected-class="bg-primary text-white"
  >
    <v-chip
      @click="select('')"
      :color="selected === '' ? 'primary' : 'grey-lighten-2'"
      :variant="selected === '' ? 'elevated' : 'outlined'"
      size="small"
      class="me-1 mb-1 font-weight-bold"
    >
      {{ allLabel || $t('notebook.allTags') }}
    </v-chip>
    <v-chip
      v-for="tag in tags"
      :key="tag"
      @click="select(tag === selected ? '' : tag)"
      :color="selected === tag ? 'primary' : 'grey-lighten-2'"
      :variant="selected === tag ? 'elevated' : 'outlined'"
      size="small"
      class="me-1 mb-1 font-weight-bold"
    >
      #{{ tag }}
    </v-chip>
  </v-chip-group>
  <div v-else class="flex gap-2 flex-wrap">
    <button
      @click="select('')"
      :class="[selected === '' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-3 py-1 rounded-full text-xs font-bold transition hover:bg-cyan-400']"
    >
      {{ allLabel || $t('journal.allTags') }}
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      @click="select(tag === selected ? '' : tag)"
      :class="[selected === tag ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-3 py-1 rounded-full text-xs font-bold transition hover:bg-cyan-400']"
    >
      #{{ tag }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{
  modelValue?: string[] | string,
  tags: string[],
  variant?: 'select' | 'chip' | 'button',
  label?: string,
  allLabel?: string
}>()
const emit = defineEmits(['update:modelValue', 'update:selectedTag'])
const selected = ref(props.modelValue ?? (props.variant === 'select' ? [] : ''))
watch(() => props.modelValue, v => selected.value = v ?? (props.variant === 'select' ? [] : ''))
function select(tag: string) {
  selected.value = tag
  emit('update:modelValue', tag)
  emit('update:selectedTag', tag)
}
</script>
<style scoped>
.tag-filter {
  min-width: 180px;
}
</style>