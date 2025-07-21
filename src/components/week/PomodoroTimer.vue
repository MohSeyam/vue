<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex gap-2 mb-2">
      <button v-for="mode in modes" :key="mode.key" @click="setMode(mode.key)"
        :class="[modeKey === mode.key ? 'bg-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300', 'px-4 py-1 rounded-full font-bold transition']">
        {{ $t(`pomodoro.${mode.key}`) }}
      </button>
    </div>
    <div class="text-5xl font-mono font-bold text-cyan-600 dark:text-cyan-400">
      {{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
    </div>
    <div class="flex gap-3 mt-2">
      <button @click="toggle" class="px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow hover:scale-105 transition">
        <span v-if="!running">{{ $t('pomodoro.start') }}</span>
        <span v-else>{{ $t('pomodoro.pause') }}</span>
      </button>
      <button @click="reset" class="px-4 py-2 rounded-lg font-bold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
        {{ $t('pomodoro.reset') }}
      </button>
    </div>
    <div class="text-xs text-gray-500 mt-2">{{ $t('pomodoro.sessions') }}: {{ sessions }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
useI18n()
const modes = [
  { key: 'work', duration: 25 },
  { key: 'shortBreak', duration: 5 },
  { key: 'longBreak', duration: 15 }
]
const modeKey = ref('work')
const duration = ref(25 * 60)
const timer = ref<number | null>(null)
const running = ref(false)
const timeLeft = ref(duration.value)
const sessions = ref(0)
const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)
function setMode(key: string) {
  modeKey.value = key
  const mode = modes.find(m => m.key === key)
  if (mode) {
    duration.value = mode.duration * 60
    timeLeft.value = duration.value
    running.value = false
    clearTimer()
  }
}
function tick() {
  if (timeLeft.value > 0) {
    timeLeft.value--
  } else {
    running.value = false
    clearTimer()
    sessions.value++
  }
}
function toggle() {
  running.value = !running.value
  if (running.value) {
    timer.value = setInterval(tick, 1000) as unknown as number
  } else {
    clearTimer()
  }
}
function reset() {
  timeLeft.value = duration.value
  running.value = false
  clearTimer()
}
function clearTimer() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}
watch(modeKey, () => reset())
</script>