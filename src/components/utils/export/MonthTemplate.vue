<template>
  <v-card class="pa-6 mb-4" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">{{ month.title[$i18n.locale] || month.title.en }}</v-card-title>
    <v-list dense>
      <v-list-item v-for="w in month.weeks" :key="w.week">
        <v-list-item-title class="font-weight-bold">{{ $t('plan.week', 'الأسبوع') }} {{ w.week }}: {{ w.title[$i18n.locale] || w.title.en }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-card-actions class="justify-end mt-4">
      <v-btn color="primary" prepend-icon="mdi-file-download" @click="exportMonth">{{ $t('plan.export', 'تصدير الشهر') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps<{ month: any }>()
function exportMonth() {
  // منطق التصدير (PDF/Markdown)
  alert('سيتم تصدير الشهر قريبًا!')
}
</script>