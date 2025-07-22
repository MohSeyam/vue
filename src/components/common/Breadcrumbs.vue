<template>
  <v-breadcrumbs :items="items" class="mb-4">
    <template #item="{ item }">
      <router-link v-if="item.to" :to="item.to" class="text-primary font-weight-bold">
        {{ item.title }}
      </router-link>
      <span v-else class="text-grey font-weight-bold">{{ item.title }}</span>
    </template>
  </v-breadcrumbs>
</template>
<script setup lang="ts">
defineProps<{ items: { title: string, to?: string }[] }>();
</script>