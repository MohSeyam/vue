<template>
  <div class="flex flex-col items-center">
    <svg :width="size" :height="size" class="transform -rotate-90">
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        stroke="#e5e7eb"
        stroke-width="8"
        fill="none"
      />
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        :stroke="color"
        stroke-width="8"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        class="transition-all duration-700"
      />
    </svg>
    <div class="absolute text-xl font-bold mt-[-2.5rem]">{{ percent }}%</div>
    <div class="mt-2 text-sm text-gray-500">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  percent: { type: Number, required: true },
  label: { type: String, default: '' },
  color: { type: String, default: '#3b82f6' },
  size: { type: Number, default: 100 }
});
const radius = computed(() => (props.size - 16) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const offset = computed(() => circumference.value * (1 - props.percent / 100));
</script>