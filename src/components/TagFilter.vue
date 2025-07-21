<template>
  <v-select
    v-model="selected"
    :items="tags"
    :label="$t('tags')"
    multiple
    clearable
    @update:modelValue="$emit('update:modelValue', selected)"
    class="tag-filter"
  />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue: string[], tags: string[] }>();
const emit = defineEmits(['update:modelValue']);
const selected = ref(props.modelValue);
watch(() => props.modelValue, v => selected.value = v);
watch(selected, v => emit('update:modelValue', v));
</script>
<style scoped>
.tag-filter {
  min-width: 180px;
}
</style>