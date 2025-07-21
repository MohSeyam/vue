import { createRouter, createWebHistory } from 'vue-router'

// تعريف المسارات الرئيسية للتطبيق
const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: () => import('@/components/dashboard/DashboardView.vue') },
  { path: '/phase/:id', component: () => import('@/components/phase/PhaseView.vue') },
  { path: '/week/:id', component: () => import('@/components/week/WeekView.vue') },
  { path: '/notebook', component: () => import('@/components/notebook/NotebookView.vue') },
  { path: '/journal', component: () => import('@/components/journal/JournalView.vue') },
  { path: '/achievements', component: () => import('@/components/achievements/AchievementsView.vue') },
  { path: '/settings', component: () => import('@/components/settings/SettingsView.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})