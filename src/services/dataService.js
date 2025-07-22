// dataService.js
// خدمة البيانات الثابتة: استخراج مراحل الخطة، الأسابيع، الأيام، الأهداف، الموارد من PlanData.json عبر fetch

let planDataCache = null;

export async function fetchPlanData() {
  if (planDataCache) return planDataCache;
  const res = await fetch('/data/PlanData.json');
  const data = await res.json();
  planDataCache = Array.isArray(data[0]) ? data.flat() : data;
  return planDataCache;
}

export async function getPhases() {
  const planData = await fetchPlanData();
  const phasesMap = {};
  planData.forEach(item => {
    if (!phasesMap[item.phase]) {
      phasesMap[item.phase] = {
        id: item.phase,
        name: item.title?.ar?.split(":")[0] || `المرحلة ${item.phase}`,
      };
    }
  });
  return Object.values(phasesMap);
}

export async function getWeeksByPhase(phaseId) {
  const planData = await fetchPlanData();
  return planData.filter(item => item.phase === phaseId);
}

export async function getWeeks() {
  return await fetchPlanData();
}

export async function getDaysByWeek(weekNumber) {
  const planData = await fetchPlanData();
  const week = planData.find(item => item.week === weekNumber);
  return week ? week.days : [];
}

export async function getObjectivesByPhase(phaseId) {
  const planData = await fetchPlanData();
  return planData.filter(item => item.phase === phaseId).map(item => item.objective);
}

export async function getResourcesByWeek(weekNumber) {
  const planData = await fetchPlanData();
  const week = planData.find(item => item.week === weekNumber);
  if (!week) return [];
  return week.days.flatMap(day => day.resources || []);
}

export async function getPlanData() {
  return await fetchPlanData();
}

// دوال استخراج متقدمة async (نفس المنطق السابق لكن async)
export async function getAllResources() {
  const planData = await fetchPlanData();
  return planData.flatMap(week => (week.days || []).flatMap(day => day.resources || []));
}
export async function getAllObjectives() {
  const planData = await fetchPlanData();
  return planData.map(week => week.objective);
}
export async function getAllDays() {
  const planData = await fetchPlanData();
  return planData.flatMap(week => week.days || []);
}
export async function getAllWeekTitles(lang = "ar") {
  const planData = await fetchPlanData();
  return planData.map(week => week.title?.[lang] || week.title?.ar || week.title?.en || "");
}
export async function getAllPhaseTitles(lang = "ar") {
  const phases = await getPhases();
  return phases.map(phase => phase.name);
}
export async function getWeeksCountByPhase(phaseId) {
  const planData = await fetchPlanData();
  return planData.filter(item => item.phase === phaseId).length;
}
export async function getResourcesByType(type) {
  const all = await getAllResources();
  return all.filter(r => r.type === type);
}
export async function getAllTasks() {
  const planData = await fetchPlanData();
  return planData.flatMap(week => (week.days || []).flatMap(day => day.tasks || []));
}
