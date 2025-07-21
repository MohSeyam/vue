import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/Home.vue') },
  { path: '/day', name: 'DayView', component: () => import('../pages/DayView.vue') },
  { path: '/notebook', name: 'Notebook', component: () => import('../pages/Notebook.vue') },
  { path: '/achievements', name: 'Achievements', component: () => import('../pages/Achievements.vue') },
  { path: '/analytics', name: 'Analytics', component: () => import('../pages/Analytics.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../pages/Profile.vue') },
  { path: '/settings', name: 'Settings', component: () => import('../pages/Settings.vue') },
  { path: '/search', name: 'Search', component: () => import('../pages/Search.vue') },
  { path: '/login', name: 'Login', component: () => import('../pages/Login.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});