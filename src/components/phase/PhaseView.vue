<template>
  <v-container fluid class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 mb-4" elevation="8">
          <v-card-title class="font-weight-bold text-primary mb-2">{{ props.phase.title[$i18n.locale] || props.phase.title.en }}</v-card-title>
          <v-card-subtitle class="mb-4">{{ props.phase.objective?.[$i18n.locale] || props.phase.objective?.en }}</v-card-subtitle>
          <v-list dense>
            <v-list-item v-for="w in props.phase.weeks" :key="w.week">
              <v-list-item-title class="font-weight-bold">{{ $t('plan.week', 'الأسبوع') }} {{ w.week }}: {{ w.title[$i18n.locale] || w.title.en }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-card class="pa-3 my-2" elevation="2">
                  <v-list dense>
                    <v-list-item v-for="d in w.days" :key="d.key">
                      <v-list-item-title class="font-weight-bold">{{ d.day[$i18n.locale] || d.day.en }}: {{ d.topic?.[$i18n.locale] || d.topic?.en }}</v-list-item-title>
                      <v-list-item-subtitle>
                        <ul class="pl-4">
                          <li v-for="t in d.tasks" :key="t.id">
                            {{ t.description[$i18n.locale] || t.description.en }} ({{ t.type || '' }}, {{ t.duration }} min)
                          </li>
                        </ul>
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const props = defineProps<{ phase: any }>()
</script>