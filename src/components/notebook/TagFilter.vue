<template>
  <v-chip-group v-model="selected" column class="mb-2" selected-class="bg-primary text-white">
    <v-chip
      @click="select('')"
      :color="selected === '' ? 'primary' : 'grey-lighten-2'"
      :variant="selected === '' ? 'elevated' : 'outlined'"
      size="small"
      class="me-1 mb-1 font-weight-bold"
    >
      {{ $t('notebook.allTags') }}
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
</template>
<script setup lang="ts">
const props = defineProps<{ tags: string[], selectedTag: string }>()
const emit = defineEmits(['update:selectedTag'])
import { ref, watch } from 'vue'
const selected = ref(props.selectedTag)
watch(() => props.selectedTag, val => selected.value = val)
function select(tag: string) {
  emit('update:selectedTag', tag)
}
</script>