import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPhases, getWeeksByPhase } from "../services/dataService";
import PhaseCard from "../components/plan/PhaseCard";
import WeekCard from "../components/plan/WeekCard";
import DayCard from "../components/plan/DayCard";
import { motion, AnimatePresence } from "framer-motion";

export default function CyberPlan() {
  const { t, i18n } = useTranslation();
  const phases = getPhases();
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  // عند اختيار مرحلة
  const handlePhase = (phase) => {
    setSelectedPhase(phase);
    setSelectedWeek(null);
  };
  // عند اختيار أسبوع
  const handleWeek = (week) => {
    setSelectedWeek(week);
  };

  return (
    <div className="max-w-5xl mx-auto py-8" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-6 text-center text-cyan-700">{t("cyberPlanTitle", "خطة الأمن السيبراني المطور")}</h1>
      {/* عرض المراحل */}
      <AnimatePresence mode="wait">
        {!selectedPhase && (
          <motion.div
            key="phases"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {phases.map(phase => (
              <motion.div
                key={phase.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePhase(phase)}
                className="cursor-pointer"
              >
                <PhaseCard phase={phase} selected={false} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* عرض الأسابيع */}
      <AnimatePresence mode="wait">
        {selectedPhase && !selectedWeek && (
          <motion.div
            key="weeks"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setSelectedPhase(null)}
              className="mb-4 text-xs text-gray-500 hover:underline px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800"
            >{t("backToPhases", "عودة للمراحل")}</button>
            <h2 className="text-xl font-semibold mb-4 text-violet-700">{t("weeksOfPhase", { phase: selectedPhase.name, defaultValue: `أسابيع ${selectedPhase.name}` })}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {getWeeksByPhase(selectedPhase.id).map(week => (
                <motion.div
                  key={week.week}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleWeek(week)}
                  className="cursor-pointer"
                >
                  <WeekCard week={week} selected={false} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* عرض الأيام والمهام */}
      <AnimatePresence mode="wait">
        {selectedWeek && (
          <motion.div
            key="days"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setSelectedWeek(null)}
              className="mb-4 text-xs text-gray-500 hover:underline px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800"
            >{t("backToWeeks", "عودة للأسابيع")}</button>
            <h2 className="text-xl font-semibold mb-4 text-amber-700">{selectedWeek.title?.[i18n.language] || selectedWeek.title?.ar || selectedWeek.title?.en}</h2>
            <div className="space-y-4">
              {(selectedWeek.days || []).map((day, i) => (
                <DayCard key={i} day={day} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}