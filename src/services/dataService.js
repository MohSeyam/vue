// dataService.js
// خدمة البيانات الثابتة: استخراج مراحل الخطة، الأسابيع، الأيام، الأهداف، الموارد من PlanData.json
import planDataRaw from "../data/PlanData.json";

// معالجة البيانات: flatten إذا كان هناك nested arrays
const planData = Array.isArray(planDataRaw[0])
  ? planDataRaw.flat()
  : planDataRaw;

// استخراج المراحل (phases) الفريدة
export function getPhases() {
  const phasesMap = {};
  planData.forEach(item => {
    if (!phasesMap[item.phase]) {
      phasesMap[item.phase] = {
        id: item.phase,
        name: item.title.ar.split(":")[0] || `المرحلة ${item.phase}`,
        // يمكن تحسين الوصف أو اللون حسب الحاجة
      };
    }
  });
  return Object.values(phasesMap);
}

// استخراج الأسابيع حسب المرحلة
export function getWeeksByPhase(phaseId) {
  return planData.filter(item => item.phase === phaseId);
}

// استخراج كل الأسابيع
export function getWeeks() {
  return planData;
}

// استخراج أيام الأسبوع لرقم أسبوع معين
export function getDaysByWeek(weekNumber) {
  const week = planData.find(item => item.week === weekNumber);
  return week ? week.days : [];
}

// استخراج الأهداف (objective) لكل أسبوع أو لكل مرحلة
export function getObjectivesByPhase(phaseId) {
  return planData.filter(item => item.phase === phaseId).map(item => item.objective);
}

// استخراج الموارد لكل أسبوع أو مرحلة
export function getResourcesByWeek(weekNumber) {
  const week = planData.find(item => item.week === weekNumber);
  if (!week) return [];
  // جمع كل الموارد من الأيام
  return week.days.flatMap(day => day.resources || []);
}

// دوال عامة
export function getPlanData() {
  return planData;
}
