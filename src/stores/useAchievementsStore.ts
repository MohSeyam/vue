import { defineStore } from 'pinia'

// Store لإدارة الإنجازات والإحصائيات
export const useAchievementsStore = defineStore('achievements', {
  state: () => ({
    stats: {},
    badges: [],
    skills: []
  }),
  actions: {
    // دوال تحديث الإحصائيات والإنجازات
  }
})