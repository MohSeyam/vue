import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useApp } from '../../context/AppContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * PhaseProgressChart
 * Props:
 *   planData: Array of week objects (see planData structure)
 *   lang: 'en' | 'ar' (optional, defaults to context)
 *   className: string (optional)
 */
export default function PhaseProgressChart({ planData, lang: propLang, className = '' }) {
  const { lang: contextLang } = useApp();
  const lang = propLang || contextLang || 'en';
  // Prepare chart data: x = week number, y = number of tasks in that week
  const chartData = useMemo(() => {
    const labels = planData.map(week =>
      lang === 'ar' ? `الأسبوع ${week.week}` : `Week ${week.week}`
    );
    const data = planData.map(week =>
      (week.days || []).reduce((sum, day) => sum + (day.tasks?.length || 0), 0)
    );
    return {
      labels,
      datasets: [
        {
          label: lang === 'ar' ? 'عدد المهام' : 'Number of Tasks',
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500
          borderRadius: 6,
        },
      ],
    };
  }, [planData, lang]);

  const options = useMemo(() => ({
    responsive: true,
    indexAxis: 'x',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: lang === 'ar' ? 'تقدم الخطة الأسبوعي' : 'Weekly Plan Progress',
        font: { size: 18, weight: 'bold' },
        color: '#0f172a',
        align: 'start',
      },
      tooltip: {
        rtl: lang === 'ar',
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 14, weight: 'bold' },
          color: '#334155',
          callback: function(val, idx) {
            return chartData.labels[idx];
          },
        },
        reverse: lang === 'ar',
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: {
          font: { size: 13 },
          color: '#64748b',
        },
      },
    },
    layout: {
      padding: { top: 20, left: 10, right: 10, bottom: 10 },
    },
    locale: lang,
    direction: lang === 'ar' ? 'rtl' : 'ltr',
  }), [lang, chartData.labels]);

  return (
    <div className={`w-full max-w-2xl mx-auto bg-white/80 dark:bg-zinc-900 rounded-xl shadow p-4 ${className}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Bar data={chartData} options={options} />
    </div>
  );
}