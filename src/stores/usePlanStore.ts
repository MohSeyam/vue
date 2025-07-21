import { defineStore } from 'pinia'
import planData from '@/data/PlanData.json'
import type { Week } from '@/types/plan'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    weeks: [] as Week[],
    planLoaded: false
  }),
  actions: {
    async loadPlan() {
      this.weeks = planData as Week[]
      this.planLoaded = true
    }
  }
})