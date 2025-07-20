import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/Home.vue') },
  { path: '/day', name: 'DayView', component: () => import('../pages/DayView.vue') },
  { path: '/notebook', name: 'Notebook', component: () => import('../pages/Notebook.vue') },
  { path: '/achievements', name: 'Achievements', component: () => import('../pages/Achievements.vue') },
  { path: '/calendar', name: 'CalendarView', component: () => import('../pages/CalendarView.vue') },
  { path: '/skills', name: 'SkillMatrix', component: () => import('../pages/SkillMatrix.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});