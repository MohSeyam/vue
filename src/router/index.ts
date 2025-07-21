import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../pages/DashboardView.vue';
import PhaseView from '../components/phase/PhaseView.vue';
import WeekView from '../components/week/WeekView.vue';
import DayView from '../pages/DayView.vue';

const routes = [
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/plan', name: 'plan', component: PhaseView },
  { path: '/plan/:phaseId', name: 'weeks', component: WeekView, props: true },
  { path: '/plan/:phaseId/week/:weekId', name: 'days', component: DayView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;