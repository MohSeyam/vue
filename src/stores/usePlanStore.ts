import { defineStore } from 'pinia'
import planData from '@/data/PlanData.json'

// Store لإدارة بيانات الخطة الدراسية
export const usePlanStore = defineStore('plan', {
  state: () => ({
    // بيانات الخطة (المراحل، الأسابيع، الأيام ...)
    phases: [],
    planLoaded: false
  }),
  actions: {
    // تحميل البيانات من PlanData.json
    async loadPlan() {
      this.phases = planData.phases
      this.planLoaded = true
    },
    // دوال مساعدة (getPhaseById, getWeekById, ...)
  }
})