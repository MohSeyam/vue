import { defineStore } from 'pinia'
import planData from '@/data/PlanData.json'
import type { Week, Day, Task, LocalizedString } from '@/types/plan'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

function getText(obj: LocalizedString, locale: string) {
  return obj[locale] || obj['en'] || Object.values(obj)[0] || ''
}

export const usePlanStore = defineStore('plan', () => {
  // الحالة
  const weeks = ref<Week[]>([])
  const planLoaded = ref(false)

  // تحميل الخطة
  function loadPlan() {
    weeks.value = planData as Week[]
    planLoaded.value = true
  }

  // i18n
  const { locale } = useI18n()

  // جميع الأيام
  const allDays = computed(() => weeks.value.flatMap(w => w.days))
  // جميع المهام
  const allTasks = computed(() => allDays.value.flatMap(d => d.tasks))
  // جميع المراحل (phase)
  const allPhases = computed(() => {
    const phases: Record<number, Week[]> = {}
    weeks.value.forEach(w => {
      if (w.phase) {
        if (!phases[w.phase]) phases[w.phase] = []
        phases[w.phase].push(w)
      }
    })
    return phases
  })
  // الأسبوع الحالي (أول أسبوع لم ينتهِ بعد)
  const currentWeek = computed(() => weeks.value[0] || null)
  // اليوم الحالي (حسب التاريخ أو أول يوم)
  const currentDay = computed(() => allDays.value[0] || null)
  // المرحلة الحالية
  const currentPhase = computed(() => currentWeek.value?.phase || 1)
  // المهام القادمة (غير مكتملة)
  const upcomingTasks = computed(() => allTasks.value.filter(t => !t.done))

  // Getters نصية متعددة اللغات
  function getWeekTitle(week: Week) {
    return getText(week.title, locale.value)
  }
  function getDayTopic(day: Day) {
    return day.topic ? getText(day.topic, locale.value) : ''
  }
  function getTaskDesc(task: Task) {
    return getText(task.description, locale.value)
  }

  return {
    weeks,
    planLoaded,
    loadPlan,
    allDays,
    allTasks,
    allPhases,
    currentWeek,
    currentDay,
    currentPhase,
    upcomingTasks,
    getWeekTitle,
    getDayTopic,
    getTaskDesc
  }
})