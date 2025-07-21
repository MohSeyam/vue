import { ref, computed, watch, reactive, onMounted } from 'vue';
import planData from '../data/planData.json';
import phases from '../data/phases.json';
import translations from '../data/translations.json';

export function useCyberPlan() {
  const lang = ref('ar');
  const theme = ref('dark');
  const view = reactive({ page: 'dashboard', params: {} });
  const appState = ref<any>(null);
  const t = computed(() => translations[lang.value]);
  const plan = ref(planData);
  const phaseList = ref(phases);
  const translationData = ref(translations);

  const setView = (newView: { page: string, params?: any }) => {
    view.page = newView.page;
    view.params = newView.params || {};
  };
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('cyberPlanTheme', theme.value);
  };
  const toggleLang = () => {
    lang.value = lang.value === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = lang.value;
    document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('cyberPlanLang', lang.value);
  };
  onMounted(() => {
    const savedLang = localStorage.getItem('cyberPlanLang') || 'ar';
    const savedTheme = localStorage.getItem('cyberPlanTheme') || 'dark';
    lang.value = savedLang;
    theme.value = savedTheme;
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  });
  watch(appState, (newState) => {
    if (newState) {
      localStorage.setItem('cyberPlanProgress', JSON.stringify(newState));
    }
  }, { deep: true });

  return { lang, theme, view, appState, t, setView, toggleTheme, toggleLang, plan, phaseList, translationData };
}