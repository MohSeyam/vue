<template>
  <v-card class="pa-6 mb-4 text-center" elevation="8">
    <v-card-title class="font-weight-bold text-primary mb-2">Pomodoro Timer</v-card-title>
    <v-card-text>
      <v-progress-circular :size="120" :width="10" :value="progress" color="primary" class="mb-4">
        <span class="text-2xl font-bold">{{ minutes }}:{{ seconds < 10 ? '0' : '' }}{{ seconds }}</span>
      </v-progress-circular>
      <div class="d-flex justify-center gap-2 mt-2">
        <v-btn color="primary" @click="start" :disabled="running">{{ $t('timer.start', 'بدء') }}</v-btn>
        <v-btn color="error" @click="stop" :disabled="!running">{{ $t('timer.stop', 'إيقاف') }}</v-btn>
        <v-btn color="secondary" @click="reset">{{ $t('timer.reset', 'إعادة') }}</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
const totalSeconds = 25 * 60
const time = ref(totalSeconds)
const running = ref(false)
let interval: any = null
const minutes = computed(() => Math.floor(time.value / 60))
const seconds = computed(() => time.value % 60)
const progress = computed(() => 100 * (1 - time.value / totalSeconds))
function start() {
  if (running.value) return
  running.value = true
  interval = setInterval(() => {
    if (time.value > 0) time.value--
    else stop()
  }, 1000)
}
function stop() {
  running.value = false
  clearInterval(interval)
}
function reset() {
  stop()
  time.value = totalSeconds
}
onBeforeUnmount(() => stop())
</script>