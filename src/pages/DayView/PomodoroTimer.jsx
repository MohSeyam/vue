import React from "react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function PomodoroTimer() {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  function start() {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
  }
  function pause() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }
  function reset() {
    setRunning(false);
    clearInterval(intervalRef.current);
    setSeconds(25 * 60);
  }

  // Cleanup
  React.useEffect(() => {
    if (seconds === 0) {
      pause();
    }
    return () => clearInterval(intervalRef.current);
  }, [seconds]);

  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-slate-800 shadow p-4 flex flex-col items-center">
      <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400 mb-2">{t("pomodoro", "مؤقت بومودورو")}</span>
      <span className="text-3xl font-extrabold text-blue-700 dark:text-sky-400 tabular-nums">{min}:{sec}</span>
      <div className="mt-3 flex gap-2">
        <button onClick={start} disabled={running} className="px-4 py-1 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50">{t("start", "ابدأ")}</button>
        <button onClick={pause} disabled={!running} className="px-4 py-1 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition disabled:opacity-50">{t("pause", "إيقاف")}</button>
        <button onClick={reset} className="px-4 py-1 rounded-full bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-zinc-600 transition">{t("reset", "إعادة")}</button>
      </div>
    </div>
  );
}