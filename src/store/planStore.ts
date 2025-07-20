import { defineStore } from 'pinia';

export const usePlanStore = defineStore('plan', {
  state: () => ({
    planData: null,
  }),
  actions: {
    setPlanData(data: any) {
      this.planData = data;
    },
  },
});