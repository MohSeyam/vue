// dataService.js
// خدمة البيانات الثابتة: مراحل الخطة، الأسابيع، الأهداف، الموارد

// مثال: مراحل الخطة
export const phases = [
  {
    id: 1,
    name: "المرحلة الأولى: التأسيس",
    description: "بناء الأساسيات وفهم المفاهيم العامة للأمن السيبراني.",
    color: "cyan",
    icon: "shield-check"
  },
  {
    id: 2,
    name: "المرحلة الثانية: التخصص",
    description: "التعمق في مجالات محددة مثل اختبار الاختراق، التحليل الجنائي، إلخ.",
    color: "violet",
    icon: "target"
  },
  {
    id: 3,
    name: "المرحلة الثالثة: التطبيق والمشاريع",
    description: "تطبيق ما تعلمته في مشاريع عملية وتحديات حقيقية.",
    color: "amber",
    icon: "rocket"
  }
];

// مثال: الأسابيع (لكل مرحلة)
export const weeks = [
  { id: 1, phaseId: 1, name: "الأسبوع 1", topics: ["مقدمة الأمن السيبراني", "مفاهيم أساسية"] },
  { id: 2, phaseId: 1, name: "الأسبوع 2", topics: ["الشبكات والبروتوكولات"] },
  { id: 3, phaseId: 2, name: "الأسبوع 3", topics: ["مقدمة اختبار الاختراق"] },
  { id: 4, phaseId: 3, name: "الأسبوع 4", topics: ["مشروع عملي"] }
];

// مثال: أهداف عامة
export const goals = [
  "فهم أساسيات الأمن السيبراني.",
  "تطبيق المهارات في بيئة عملية.",
  "بناء مشاريع حقيقية."
];

// مثال: موارد مقترحة
export const resources = [
  { name: "Cybrary", url: "https://www.cybrary.it/", type: "دورة" },
  { name: "TryHackMe", url: "https://tryhackme.com/", type: "تدريب عملي" },
  { name: "كتاب: The Web Application Hacker's Handbook", url: "https://www.amazon.com/dp/1118026470", type: "كتاب" }
];

// دوال مساعدة لجلب البيانات حسب الحاجة
export function getPhases() {
  return phases;
}
export function getWeeksByPhase(phaseId) {
  return weeks.filter(w => w.phaseId === phaseId);
}
export function getGoals() {
  return goals;
}
export function getResources() {
  return resources;
}
