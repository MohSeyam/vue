<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary" icon>
        <v-icon>mdi-export-variant</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="handleExportData('pdf')">
        <v-list-item-title>PDF</v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleExportData('md')">
        <v-list-item-title>Markdown</v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleExportData('html')">
        <v-list-item-title>HTML</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { exportData as doExportData } from '../../utils/exportUtils';
const props = defineProps<{ data: any, filename?: string }>();
function handleExportData(format: 'pdf' | 'md' | 'html') {
  doExportData(props.data, format, { filename: props.filename || `export.${format}` });
}
</script>