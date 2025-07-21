import { defineStore } from 'pinia'
import planData from '@/data/PlanData.json'
import type { Phase } from '@/types/plan'

// Store لإدارة بيانات الخطة الدراسية
export const usePlanStore = defineStore('plan', {
  state: () => ({
    // بيانات الخطة (المراحل، الأسابيع، الأيام ...)
    phases: [] as Phase[],
    planLoaded: false
  }),
  actions: {
    // تحميل البيانات من PlanData.json
    async loadPlan() {
      this.phases = planData.phases as Phase[]
      this.planLoaded = true
    },
    // دوال مساعدة (getPhaseById, getWeekById, ...)
  }
})