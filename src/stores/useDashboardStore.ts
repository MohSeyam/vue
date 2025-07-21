import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  // الوقت الحالي
  const time = ref<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  // تاريخ اليوم
  const today = ref<string>(new Date().toLocaleDateString())
  // قائمة المهام القادمة
  const upcomingTasks = ref<Array<{ id: number; title: string; due: string }>>([
    // مثال: { id: 1, title: 'مراجعة الدرس 3', due: '2024-06-10' }
  ])
  // عدد الأسابيع (placeholder)
  const weeks = ref<number>(12)
  // اسم المرحلة الحالية (placeholder)
  const currentPhase = ref<string>('الأساسيات')

  // تحديث الوقت كل ثانية
  setInterval(() => {
    time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    today.value = new Date().toLocaleDateString()
  }, 1000)

  // Getters
  const hasUpcomingTasks = computed(() => upcomingTasks.value.length > 0)

  // Actions
  function addTask(title: string, due: string) {
    upcomingTasks.value.push({ id: Date.now(), title, due })
  }
  function setWeeks(n: number) {
    weeks.value = n
  }
  function setCurrentPhase(name: string) {
    currentPhase.value = name
  }

  return {
    time,
    today,
    upcomingTasks,
    weeks,
    currentPhase,
    hasUpcomingTasks,
    addTask,
    setWeeks,
    setCurrentPhase
  }
})