<template>
  <v-dialog v-model="modelValue" max-width="600px" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">{{ isEditing ? t.editResource : t.addResource }}</span>
        <v-btn icon="mdi-close" variant="text" @click="$emit('close')"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field :label="t.resourceTitleLabel" v-model="resource.title" variant="outlined" class="mb-3" />
        <v-text-field :label="t.resourceUrlLabel" v-model="resource.url" variant="outlined" class="mb-3" type="url" />
        <v-select :label="t.resourceTypeLabel" v-model="resource.type" :items="resourceTypesItems" variant="outlined" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn v-if="isEditing" color="error" @click="$emit('delete')">{{ t.delete }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')">{{ t.cancel }}</v-btn>
        <v-btn color="primary" variant="flat" @click="$emit('save', resource)">{{ t.save }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue: boolean, resource: any, isEditing: boolean, t: any, resourceTypesItems: any[] }>();
const emit = defineEmits(['update:modelValue', 'save', 'delete', 'close']);
const resource = ref({ ...props.resource });
watch(() => props.resource, v => resource.value = { ...v });
</script>