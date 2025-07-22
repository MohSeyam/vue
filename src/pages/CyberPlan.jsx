import { useState } from "react";
import { getPhases, getWeeksByPhase, getDaysByWeek } from "../services/dataService";
import PhaseCard from "../components/plan/PhaseCard";
import WeekCard from "../components/plan/WeekCard";
import DayCard from "../components/plan/DayCard";

export default function CyberPlan() {
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
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">خطة الأمن السيبراني المطور</h1>
      {/* عرض المراحل */}
      {!selectedPhase && (
        <div className="grid md:grid-cols-3 gap-4">
          {phases.map(phase => (
            <div key={phase.id} onClick={() => handlePhase(phase)}>
              <PhaseCard phase={phase} />
            </div>
          ))}
        </div>
      )}
      {/* عرض الأسابيع */}
      {selectedPhase && !selectedWeek && (
        <>
          <button onClick={() => setSelectedPhase(null)} className="mb-4 text-xs text-gray-500 hover:underline">عودة للمراحل</button>
          <h2 className="text-xl font-semibold mb-4">أسابيع {selectedPhase.name}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {getWeeksByPhase(selectedPhase.id).map(week => (
              <div key={week.week} onClick={() => handleWeek(week)}>
                <WeekCard week={week} />
              </div>
            ))}
          </div>
        </>
      )}
      {/* عرض الأيام والمهام */}
      {selectedWeek && (
        <>
          <button onClick={() => setSelectedWeek(null)} className="mb-4 text-xs text-gray-500 hover:underline">عودة للأسابيع</button>
          <h2 className="text-xl font-semibold mb-4">{selectedWeek.title?.ar || selectedWeek.title?.en}</h2>
          <div className="space-y-4">
            {(selectedWeek.days || []).map((day, i) => (
              <DayCard key={i} day={day} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}