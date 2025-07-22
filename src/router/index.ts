import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../pages/DashboardView.vue';
import PhaseView from '../components/phase/PhaseView.vue';
import AchievementsView from '../components/achievements/AchievementsView.vue';
import NotebookView from '../pages/NotebookView.vue';

const routes = [
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/plan', name: 'plan', component: PhaseView },
  { path: '/achievements', name: 'achievements', component: AchievementsView },
  { path: '/notebook', name: 'notebook', component: NotebookView },
  // يمكنك إضافة باقي المسارات هنا
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;