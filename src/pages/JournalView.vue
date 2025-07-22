<template>
  <v-container fluid class="pa-4 pa-md-8 animate-fade-in">
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <ExportMenu :data="allJournals" filename="journal" />
      </v-col>
      <v-col cols="12" md="6">
        <AdvancedSearch :items="allJournals" :tags="allTags" />
      </v-col>
    </v-row>
    <v-row v-if="filteredJournals.length === 0">
      <v-col cols="12" class="text-center py-16">
        <v-icon size="64" color="grey-lighten-1">mdi-book-open-variant</v-icon>
        <h3 class="mt-4 text-h6 text-grey">{{ t.noJournals }}</h3>
      </v-col>
    </v-row>
    <v-row v-else class="mt-6">
      <v-col v-for="journal in filteredJournals" :key="journal.updatedAt" cols="12" md="6" lg="4">
        <AnimatedCard @click="openJournal(journal)">
          <v-card-text>
            <div class="text-caption text-grey">{{ journal.dayTitle }}</div>
            <p class="text-h6 font-weight-bold text-primary truncate">{{ journal.title }}</p>
            <div class="text-body-2 text-grey-darken-1 mt-2" style="height: 4.5em; overflow: hidden;" v-html="journal.content"></div>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-spacer></v-spacer>
            <div class="text-caption text-grey">{{ formatDate(journal.updatedAt, lang) }}</div>
          </v-card-actions>
        </AnimatedCard>
      </v-col>
    </v-row>
    <JournalDialog
      v-model="journalDialogOpen"
      :journal="activeJournal"
      :lang="lang"
      :t="t"
      :dayTitle="activeJournal?.dayTitle || ''"
      @save="saveJournal"
      @delete="deleteJournal"
      @close="closeDialog"
    />
  </v-container>
</template>
<script setup lang="ts">
import AnimatedCard from '../components/common/AnimatedCard.vue';
import JournalDialog from '../components/dialogs/JournalDialog.vue';
import ExportMenu from '../components/export/ExportMenu.vue';
import AdvancedSearch from '../components/search/AdvancedSearch.vue';
import { ref, computed, inject } from 'vue';
const { lang, t, appState, plan } = inject('app') as any;
const allJournals = computed(() => {
  if (!appState.value || !appState.value.journals) return [];
  const journalsList: any[] = [];
  Object.keys(appState.value.journals).forEach(dayKey => {
    const journal = appState.value.journals[dayKey];
    if (journal) {
      // ابحث عن اليوم في الخطة
      let dayTitle = '';
      for (const week of plan.value) {
        const day = week.days.find((d: any) => d.key === dayKey);
        if (day) {
          dayTitle = day.day[lang.value];
          break;
        }
      }
      journalsList.push({
        ...journal,
        dayTitle,
      });
    }
  });
  return journalsList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
});
const allTags = computed(() => {
  const tags = new Set<string>();
  allJournals.value.forEach(journal => (journal.keywords || '').split(',').forEach((kw: string) => tags.add(kw.trim())));
  return Array.from(tags).filter(Boolean);
});
const filteredJournals = computed(() => allJournals.value); // يمكن ربطها مع AdvancedSearch
const journalDialogOpen = ref(false);
const activeJournal = ref<any>({ title: '', content: '' });
function openJournal(journal: any) {
  activeJournal.value = { ...journal };
  journalDialogOpen.value = true;
}
function saveJournal(_journal: any) { journalDialogOpen.value = false; }
function deleteJournal() { journalDialogOpen.value = false; }
function closeDialog() { journalDialogOpen.value = false; }
function formatDate(date: string, lang: string) {
  return new Date(date).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' });
}
</script>