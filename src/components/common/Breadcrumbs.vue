<template>
  <v-breadcrumbs :items="items" class="mb-4">
    <template #item="{ item, index }">
      <router-link v-if="item.to" :to="item.to" class="text-primary font-weight-bold">
        {{ item.text }}
      </router-link>
      <span v-else class="text-grey font-weight-bold">{{ item.text }}</span>
    </template>
  </v-breadcrumbs>
</template>
<script setup lang="ts">
defineProps<{ items: { text: string, to?: string }[] }>();
</script>