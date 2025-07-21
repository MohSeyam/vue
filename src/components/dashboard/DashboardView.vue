<template>
  <v-container fluid class="py-8">
    <v-row justify="center" align="center" class="mb-6">
      <v-col cols="12" md="8" class="text-center">
        <v-icon size="64" color="primary" class="mb-2">mdi-shield-home</v-icon>
        <h1 class="text-h4 font-weight-bold mb-2">{{ $t('dashboard.welcome') }}</h1>
        <p class="text-subtitle-1 mb-2">{{ $t('dashboard.simple') }}</p>
        <p class="text-body-1 text-primary font-weight-medium">{{ $t('dashboard.motivation', 'ابدأ رحلتك في الأمن السيبراني بثقة!') }}</p>
      </v-col>
    </v-row>
    <v-row justify="center" align="stretch" class="gap-4">
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="8">
          <LocalClock />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="8">
          <LocalCalendar />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="8">
          <UpcomingTasks />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="8">
          <StatsWidget />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="8">
          <PhaseCard />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import LocalClock from './LocalClock.vue'
import LocalCalendar from './LocalCalendar.vue'
import UpcomingTasks from './UpcomingTasks.vue'
import StatsWidget from './StatsWidget.vue'
import PhaseCard from './PhaseCard.vue'
</script>