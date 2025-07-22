<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="val => emit('update:modelValue', val)"
    :placeholder="placeholder || $t('search')"
    :label="label || ''"
    density="compact"
    variant="outlined"
    color="primary"
    hide-details
    prepend-inner-icon="mdi-magnify"
    class="search-bar"
  />
</template>
<script setup lang="ts">
defineProps<{ modelValue: string, placeholder?: string, label?: string }>()
const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
.search-bar {
  min-width: 180px;
}
</style>