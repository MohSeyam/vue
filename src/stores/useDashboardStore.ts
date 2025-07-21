import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usePlanStore } from './usePlanStore'
import type { Task, Week } from '@/types/plan'

export const useDashboardStore = defineStore('dashboard', () => {
  // الوقت الحالي
  const time = ref<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  // تاريخ اليوم
  const today = ref<string>(new Date().toLocaleDateString())

  // ربط بيانات الخطة
  const planStore = usePlanStore()

  // عدد الأسابيع
  const weeks = computed(() => planStore.weeks.length)

  // المرحلة الحالية (أول أسبوع غير مكتمل أو الأخيرة)
  const currentPhase = computed(() => {
    const firstIncomplete = planStore.weeks.find(w => w.days.some(d => d.tasks.some(t => !t.done)))
    if (firstIncomplete) return firstIncomplete.title
    // إذا الكل مكتمل، أظهر آخر مرحلة
    return planStore.weeks.length ? planStore.weeks[planStore.weeks.length-1].title : { en: 'N/A', ar: 'غير متوفر' }
  })

  // المهام القادمة (أقرب 3 مهام غير مكتملة)
  const upcomingTasks = computed(() => {
    const tasks: Array<{ id: string; title: string; due: string; week: number; day: string }> = []
    for (const w of planStore.weeks) {
      for (const d of w.days) {
        for (const t of d.tasks) {
          if (!t.done) {
            tasks.push({
              id: t.id || Math.random().toString(),
              title: t.title?.en || t.description?.en || 'Task',
              due: d.day?.en || '',
              week: w.week || 0,
              day: d.day?.en || ''
            })
          }
        }
      }
    }
    return tasks.slice(0, 3)
  })

  // نسبة الإنجاز
  const totalTasks = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((ad, d) => ad + d.tasks.length, 0), 0))
  const completedTasks = computed(() => planStore.weeks.reduce((acc, w) => acc + w.days.reduce((ad, d) => ad + d.tasks.filter(t => t.done).length, 0), 0))
  const progress = computed(() => totalTasks.value ? Math.round((completedTasks.value / totalTasks.value) * 100) : 0)

  // تحديث الوقت كل ثانية
  setInterval(() => {
    time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    today.value = new Date().toLocaleDateString()
  }, 1000)

  return {
    time,
    today,
    weeks,
    currentPhase,
    upcomingTasks,
    totalTasks,
    completedTasks,
    progress
  }
})