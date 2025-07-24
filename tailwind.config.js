/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    // ألوان الخلفية والنصوص المستخدمة في البطاقات والإحصائيات
    "bg-cyan-500", "bg-violet-500", "bg-amber-500", "bg-emerald-500",
    "bg-cyan-100", "bg-violet-100", "bg-amber-100",
    "text-cyan-600", "text-violet-600", "text-amber-600", "text-emerald-700",
    "text-cyan-700", "text-violet-700", "text-amber-700", "text-gray-700", "text-gray-200", "text-gray-500", "text-gray-800", "text-gray-100",
    "bg-white", "dark:bg-zinc-900", "dark:bg-zinc-800", "dark:bg-gray-700",
    // صناديق وبطاقات
    "rounded-lg", "rounded-xl", "rounded-full", "border", "shadow", "shadow-lg",
    // تخطيط
    "grid", "grid-cols-2", "md:grid-cols-3", "md:grid-cols-2", "gap-4", "mb-2", "mb-4", "mb-6", "mb-8", "p-4", "p-3", "px-2", "px-3", "px-4", "py-1", "py-2", "py-0.5", "mt-1", "mt-2", "mt-4", "mx-auto", "max-w-4xl", "max-w-5xl", "min-h-screen",
    // نصوص
    "text-xs", "text-sm", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "font-bold", "font-semibold", "font-medium", "italic", "line-through",
    // أزرار
    "hover:underline", "hover:bg-cyan-100", "hover:bg-cyan-900", "hover:bg-emerald-700", "hover:bg-violet-700", "hover:bg-amber-700", "hover:bg-gray-700",
    // داكن
    "dark:text-gray-200", "dark:text-gray-300", "dark:text-gray-100", "dark:text-cyan-300",
    // أخرى
    "ring-2", "ring-cyan-400", "ring-violet-400", "ring-amber-400", "border-e", "border-b", "text-center", "text-right", "text-left", "flex", "items-center", "justify-between", "justify-center", "flex-col", "flex-1", "cursor-pointer", "transition", "hidden", "block", "w-full", "min-h-[60vh]", "min-h-[100px]", "prose", "prose-sm", "max-w-none"
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ["Tajawal", "Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        sans: ["Tajawal", "Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFF9C4 100%)',
        'gradient-blue': 'linear-gradient(135deg, #23395d 0%, #7ca7e6 100%)',
        'gradient-dark': 'linear-gradient(135deg, #18181b 0%, #222 100%)',
      },
      transitionProperty: {
        'card': 'box-shadow, transform, background-color, border-color',
        'button': 'background-color, color, border-color, box-shadow, transform',
      },
      colors: {
        amber: {
          400: '#FFD700',
          500: '#FFC107',
          600: '#FFB300',
        },
        emerald: {
          400: '#69F0AE',
          500: '#10B981',
        },
        sky: {
          400: '#40C4FF',
          500: '#0EA5E9',
        },
        pink: {
          400: '#F472B6',
          500: '#EC4899',
        },
      },
    },
  },
  plugins: [],
}