import { defineStore } from 'pinia'

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
      // ...
    },
    // دوال مساعدة (getPhaseById, getWeekById, ...)
  }
})