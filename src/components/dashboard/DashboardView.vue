<template>
  <v-container fluid class="py-8 dashboard-bg">
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="8" class="d-flex align-center gap-4">
        <span class="dashboard-logo">
          <!-- شعار درع سيبراني SVG -->
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cyber-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.7"/>
                <stop offset="100%" stop-color="#111827" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#cyber-glow)"/>
            <path d="M12 18C12 12 24 6 24 6C24 6 36 12 36 18C36 30 24 42 24 42C24 42 12 30 12 18Z" fill="#1F2937" stroke="#22d3ee" stroke-width="2.5"/>
            <path d="M24 14V24L30 28" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="24" cy="24" r="3" fill="#22d3ee"/>
          </svg>
        </span>
        <div>
          <h1 class="text-h4 font-weight-bold mb-1">{{ $t('dashboard.welcome') }}</h1>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0" divider="/" color="primary"/>
        </div>
        <v-spacer />
        <v-btn icon color="primary" variant="tonal" @click="focusMode = !focusMode" :title="$t('dashboard.focusMode')">
          <v-icon>mdi-target-variant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="stretch" class="gap-4">
      <v-slide-x-transition group>
        <v-col cols="12" sm="6" md="4" v-for="(widget, i) in widgets" :key="i">
          <component :is="widget.component" />
        </v-col>
      </v-slide-x-transition>
    </v-row>
    <v-overlay v-model="focusMode" class="focus-overlay" :opacity="0.85">
      <div class="text-center">
        <h2 class="text-h5 font-weight-bold mb-4">{{ $t('dashboard.focusTitle', 'وضع التركيز') }}</h2>
        <UpcomingTasks />
        <v-btn color="primary" class="mt-6" @click="focusMode = false">{{ $t('dashboard.exitFocus', 'الخروج من وضع التركيز') }}</v-btn>
      </div>
    </v-overlay>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LocalClock from './LocalClock.vue'
import LocalCalendar from './LocalCalendar.vue'
import UpcomingTasks from './UpcomingTasks.vue'
import StatsWidget from './StatsWidget.vue'
import PhaseCard from './PhaseCard.vue'
const focusMode = ref(false)
const widgets = [
  { component: LocalClock },
  { component: LocalCalendar },
  { component: UpcomingTasks },
  { component: StatsWidget },
  { component: PhaseCard }
]
const breadcrumbs = [
  { title: 'الرئيسية', disabled: false, href: '/' },
  { title: 'لوحة القيادة', disabled: true }
]
</script>
<style scoped>
.dashboard-bg {
  background: linear-gradient(120deg, #111827 0%, #1F2937 100%);
  min-height: 100vh;
}
.dashboard-logo {
  display: flex;
  align-items: center;
  margin-inline-end: 18px;
}
.focus-overlay {
  backdrop-filter: blur(4px);
}
</style>