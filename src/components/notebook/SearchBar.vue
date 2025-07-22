<template>
  <v-text-field aria-label="بحث في الملاحظات"
    :model-value="modelValue"
    @update:model-value="val => emit('update:modelValue', val)"
    :placeholder="$t('notebook.search')"
    density="compact"
    variant="outlined"
    color="primary"
    hide-details
    prepend-inner-icon="mdi-magnify"
    class="search-bar"
  />
</template>
<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
.search-bar {
  min-width: 180px;
}
</style>