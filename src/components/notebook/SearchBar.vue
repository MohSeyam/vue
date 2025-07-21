<template>
  <div class="relative">
    <input
      v-model="modelValue"
      :placeholder="$t('notebook.search')"
      class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-600"
      type="text"
    />
    <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
</script>
<script lang="ts">
export default {
  watch: {
    modelValue(val) {
      this.$emit('update:modelValue', val)
    }
  }
}
</script>