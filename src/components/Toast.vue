<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout">
    {{ message }}
    <template #actions>
      <v-btn icon @click="show = false"><v-icon>mdi-close</v-icon></v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ message: string, color?: string, timeout?: number, modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const show = ref(props.modelValue);
watch(() => props.modelValue, v => show.value = v);
watch(show, v => emit('update:modelValue', v));
const color = props.color || 'primary';
const timeout = props.timeout || 3000;
</script>