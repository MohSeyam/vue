<template>
  <v-menu>
    <template #activator="{ props }">
      <v-text-field aria-label="تصفية بالتاريخ"
        v-bind="props"
        :label="$t('date')"
        v-model="date"
        prepend-inner-icon="mdi-calendar"
        readonly
        class="date-filter"
      />
    </template>
    <v-date-picker v-model="date" @update:modelValue="$emit('update:modelValue', date)" />
  </v-menu>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);
const date = ref(props.modelValue);
watch(() => props.modelValue, v => date.value = v);
watch(date, v => emit('update:modelValue', v));
</script>
<style scoped>
.date-filter {
  min-width: 160px;
}
</style>