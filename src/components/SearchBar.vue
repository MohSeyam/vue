<template>
  <v-text-field
    v-model="search"
    :label="$t('search')"
    prepend-inner-icon="mdi-magnify"
    clearable
    @input="$emit('update:modelValue', search)"
    class="search-bar"
  />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);
const search = ref(props.modelValue);
watch(() => props.modelValue, v => search.value = v);
watch(search, v => emit('update:modelValue', v));
</script>
<style scoped>
.search-bar {
  min-width: 200px;
}
</style>