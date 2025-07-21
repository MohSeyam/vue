import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  // LocalClock
  const time = ref<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  const today = ref<string>(new Date().toLocaleDateString())
  const timezone = ref<string>(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const showDate = ref<boolean>(true)
  const clockLang = ref<'ar' | 'en'>('ar')

  // LocalCalendar
  const calendarEvents = ref<Array<{ id: number; title: string; date: string }>>([
    { id: 1, title: 'اختبار قصير', date: today.value },
    { id: 2, title: 'جلسة مذاكرة', date: today.value }
  ])
  const weekDays = ref<Array<string>>(['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'])

  // UpcomingTasks
  const upcomingTasks = ref<Array<{
    id: number;
    title: string;
    due: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'done';
    description?: string;
  }>>([
    { id: 1, title: 'مراجعة الدرس 3', due: today.value, priority: 'high', status: 'pending', description: 'مراجعة مفاهيم الشبكات' },
    { id: 2, title: 'حل واجب', due: today.value, priority: 'medium', status: 'done', description: 'حل تمارين التشفير' }
  ])

  // StatsWidget
  const stats = ref({
    weeks: 12,
    completedTasks: 8,
    notes: 15,
    studyDays: 20
  })
  const selectedStat = ref<'weeks' | 'completedTasks' | 'notes' | 'studyDays'>('weeks')

  // PhaseCard
  const currentPhase = ref<string>('الأساسيات')
  const phaseDescription = ref<string>('تعلم أساسيات الأمن السيبراني.')
  const phaseProgress = ref<number>(40) // نسبة مئوية
  const phaseStart = ref<string>('2024-05-01')
  const phaseEnd = ref<string>('2024-06-01')

  // تحديث الوقت كل ثانية
  setInterval(() => {
    time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    today.value = new Date().toLocaleDateString()
  }, 1000)

  // Getters
  const hasUpcomingTasks = computed(() => upcomingTasks.value.length > 0)
  const todayEvents = computed(() => calendarEvents.value.filter(e => e.date === today.value))
  const pendingTasks = computed(() => upcomingTasks.value.filter(t => t.status === 'pending'))

  // Actions
  function addTask(title: string, due: string, priority: 'low' | 'medium' | 'high', description?: string) {
    upcomingTasks.value.push({ id: Date.now(), title, due, priority, status: 'pending', description })
  }
  function setWeeks(n: number) {
    stats.value.weeks = n
  }
  function setCurrentPhase(name: string, desc?: string) {
    currentPhase.value = name
    if (desc) phaseDescription.value = desc
  }
  function setPhaseProgress(p: number) {
    phaseProgress.value = p
  }
  function setSelectedStat(stat: typeof selectedStat.value) {
    selectedStat.value = stat
  }

  return {
    // Clock
    time, today, timezone, showDate, clockLang,
    // Calendar
    calendarEvents, weekDays, todayEvents,
    // Tasks
    upcomingTasks, hasUpcomingTasks, pendingTasks,
    // Stats
    stats, selectedStat, setSelectedStat,
    // Phase
    currentPhase, phaseDescription, phaseProgress, phaseStart, phaseEnd,
    // Actions
    addTask, setWeeks, setCurrentPhase, setPhaseProgress
  }
})