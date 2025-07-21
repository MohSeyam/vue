import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Task {
  id: number
  title: string
  due: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  description?: string
}
export interface CalendarEvent {
  id: number
  title: string
  time: string
  description?: string
}
export interface Phase {
  name: string
  description: string
  progress: number // 0-100
  start: string
  end: string
}

export const useDashboardStore = defineStore('dashboard', () => {
  // الوقت الحالي والمنطقة الزمنية
  const timezone = ref<string>('Asia/Riyadh')
  const time = ref<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: timezone.value }))
  // تاريخ اليوم
  const today = ref<string>(new Date().toLocaleDateString())
  // أحداث اليوم في التقويم
  const events = ref<CalendarEvent[]>([
    { id: 1, title: 'جلسة مذاكرة', time: '18:00', description: 'مراجعة الأمن السيبراني' }
  ])
  // قائمة المهام القادمة
  const upcomingTasks = ref<Task[]>([
    { id: 1, title: 'مراجعة الدرس 3', due: '2024-06-10', completed: false, priority: 'high', description: 'مراجعة مفاهيم الشبكات' },
    { id: 2, title: 'حل اختبار قصير', due: '2024-06-12', completed: false, priority: 'medium' }
  ])
  // إحصائيات متعددة
  const stats = ref({
    weeks: 12,
    completedTasks: 8,
    notes: 15,
    studyDays: 22
  })
  // تفاصيل المرحلة الحالية
  const currentPhase = ref<Phase>({
    name: 'الأساسيات',
    description: 'تعلم أساسيات الأمن السيبراني.',
    progress: 40,
    start: '2024-05-01',
    end: '2024-06-30'
  })

  // تحديث الوقت كل ثانية
  setInterval(() => {
    time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: timezone.value })
    today.value = new Date().toLocaleDateString()
  }, 1000)

  // Getters
  const hasUpcomingTasks = computed(() => upcomingTasks.value.length > 0)
  const todayEvents = computed(() => events.value)

  // Actions
  function addTask(title: string, due: string, priority: 'low'|'medium'|'high' = 'low', description?: string) {
    upcomingTasks.value.push({ id: Date.now(), title, due, completed: false, priority, description })
  }
  function setWeeks(n: number) {
    stats.value.weeks = n
  }
  function setCurrentPhase(phase: Phase) {
    currentPhase.value = phase
  }
  function setTimezone(tz: string) {
    timezone.value = tz
  }
  function addEvent(title: string, time: string, description?: string) {
    events.value.push({ id: Date.now(), title, time, description })
  }

  return {
    time,
    timezone,
    today,
    events,
    todayEvents,
    upcomingTasks,
    stats,
    currentPhase,
    hasUpcomingTasks,
    addTask,
    setWeeks,
    setCurrentPhase,
    setTimezone,
    addEvent
  }
})