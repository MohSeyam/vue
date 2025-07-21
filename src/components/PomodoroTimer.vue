<template>
  <div class="max-w-xs mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow">
    <h2 class="text-xl font-bold mb-2 text-center">Pomodoro Timer</h2>
    <div class="flex flex-col items-center">
      <div class="text-4xl font-mono mb-2">{{ minutes }}:{{ seconds }}</div>
      <div class="mb-2">
        <button v-for="mode in modes" :key="mode" @click="setMode(mode)" :class="['px-2 py-1 mx-1 rounded', mode === currentMode ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700']">
          {{ modeLabels[mode] }}
        </button>
      </div>
      <div class="flex gap-2 mb-2">
        <button @click="toggleTimer" class="px-3 py-1 bg-green-500 text-white rounded">{{ running ? 'Pause' : 'Start' }}</button>
        <button @click="resetTimer" class="px-3 py-1 bg-gray-400 text-white rounded">Reset</button>
      </div>
      <div class="text-sm text-gray-500">Completed: {{ completedSessions }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const modes = ['work', 'short', 'long'] as const;
const modeLabels = { work: 'Work', short: 'Short Break', long: 'Long Break' };
const durations = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };

const currentMode = ref<typeof modes[number]>('work');
const timeLeft = ref(durations[currentMode.value]);
const running = ref(false);
const completedSessions = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const minutes = computed(() => String(Math.floor(timeLeft.value / 60)).padStart(2, '0'));
const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'));

function setMode(mode: typeof modes[number]) {
  currentMode.value = mode;
  resetTimer();
}

function toggleTimer() {
  running.value = !running.value;
}

function resetTimer() {
  running.value = false;
  timeLeft.value = durations[currentMode.value];
}

watch(running, (val) => {
  if (val) {
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        running.value = false;
        if (currentMode.value === 'work') completedSessions.value++;
        resetTimer();
      }
    }, 1000);
  } else if (timer) {
    clearInterval(timer);
    timer = null;
  }
});

watch(currentMode, () => {
  timeLeft.value = durations[currentMode.value];
});
</script>