<template>
  <div class="min-h-screen flex bg-gradient-to-tr from-cyan-900 via-blue-900 to-purple-900 font-[Tajawal]">
    <!-- Sidebar -->
    <aside class="hidden md:flex flex-col w-20 bg-white/10 backdrop-blur-lg shadow-2xl rounded-r-3xl py-8 items-center space-y-8">
      <router-link to="/" class="mb-8">
        <div class="bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-2xl p-3 shadow-lg">
          <i class="ph ph-shield-check text-3xl text-white"></i>
        </div>
      </router-link>
      <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="group flex flex-col items-center">
        <span class="text-2xl group-hover:text-cyan-400 transition">{{ item.icon }}</span>
        <span class="text-xs text-white/60 group-hover:text-cyan-300 mt-1">{{ item.short }}</span>
      </router-link>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center px-4 md:px-16 py-10">
      <!-- Hero Section -->
      <section class="w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 mb-10 relative overflow-hidden animate-fade-in">
        <div class="absolute -top-10 -right-10 opacity-20">
          <svg width="160" height="160"><circle cx="80" cy="80" r="80" fill="#fff"/></svg>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-4">مرحبًا بك في خطتك السيبرانية</h1>
            <p class="text-lg text-white/80 mb-6">ابدأ رحلتك في تعلم الأمن السيبراني مع لوحة تحكم تفاعلية، إحصائيات متقدمة، ومهام يومية مصممة خصيصًا لك.</p>
            <router-link to="/day" class="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg">ابدأ الآن 🚀</router-link>
          </div>
          <div class="flex items-center justify-center">
            <img src="/cyber-hero.svg" alt="Cyber Hero" class="w-48 md:w-64 drop-shadow-2xl animate-bounce-slow" />
          </div>
        </div>
      </section>

      <!-- Stats & Progress -->
      <section class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div class="bg-gradient-to-tr from-cyan-700 to-blue-800 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden animate-fade-in-up flex flex-col items-center">
          <i class="ph ph-list-check text-4xl mb-4 text-cyan-200 animate-pulse"></i>
          <div class="text-3xl font-bold">8</div>
          <div class="text-lg mt-2">مهام اليوم</div>
        </div>
        <div class="bg-gradient-to-tr from-purple-700 to-cyan-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden animate-fade-in-up flex flex-col items-center">
          <i class="ph ph-timer text-4xl mb-4 text-purple-200 animate-pulse"></i>
          <div class="text-3xl font-bold">2.5</div>
          <div class="text-lg mt-2">ساعات دراسة</div>
        </div>
        <div class="bg-gradient-to-tr from-pink-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden animate-fade-in-up flex flex-col items-center">
          <i class="ph ph-fire text-4xl mb-4 text-pink-200 animate-pulse"></i>
          <div class="text-3xl font-bold">7 أيام</div>
          <div class="text-lg mt-2">سلسلة الإنجاز</div>
        </div>
      </section>

      <!-- Animated Progress & Achievements -->
      <section class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div class="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fade-in-up">
          <h2 class="text-xl font-bold text-white mb-4">تقدمك العام</h2>
          <ProgressCircle :percent="72" label="تقدم الخطة" color="#10b981" :size="140" />
          <p class="text-white/80 mt-4">أنت على الطريق الصحيح! 🚀</p>
        </div>
        <div class="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fade-in-up">
          <h2 class="text-xl font-bold text-white mb-4">مهاراتك</h2>
          <SkillBarChart :skills="skills" />
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fade-in-up">
        <h2 class="text-xl font-bold text-white mb-6">إجراءات سريعة</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          <router-link to="/day" class="flex flex-col items-center p-4 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg ring-2 ring-cyan-300/30">
            <i class="ph ph-calendar-check text-3xl mb-2"></i>
            المهام اليومية
          </router-link>
          <router-link to="/notebook" class="flex flex-col items-center p-4 rounded-xl bg-gradient-to-tr from-green-400 to-cyan-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg ring-2 ring-green-300/30">
            <i class="ph ph-note-pencil text-3xl mb-2"></i>
            إضافة ملاحظة
          </router-link>
          <router-link to="/achievements" class="flex flex-col items-center p-4 rounded-xl bg-gradient-to-tr from-pink-400 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg ring-2 ring-pink-300/30">
            <i class="ph ph-trophy text-3xl mb-2"></i>
            الإنجازات
          </router-link>
          <router-link to="/analytics" class="flex flex-col items-center p-4 rounded-xl bg-gradient-to-tr from-yellow-400 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg ring-2 ring-yellow-300/30">
            <i class="ph ph-chart-bar text-3xl mb-2"></i>
            التحليلات
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import ProgressCircle from '@/components/ProgressCircle.vue';
import SkillBarChart from '@/components/SkillBarChart.vue';

const navItems = [
  { path: '/day', icon: '📅', short: 'اليومي' },
  { path: '/notebook', icon: '📝', short: 'ملاحظات' },
  { path: '/achievements', icon: '🏆', short: 'إنجازات' },
  { path: '/analytics', icon: '📊', short: 'تحليل' },
  { path: '/profile', icon: '👤', short: 'حساب' },
  { path: '/settings', icon: '⚙️', short: 'إعدادات' }
];

const skills = [
  { name: 'أمن الشبكات', value: 80, color: '#3b82f6' },
  { name: 'أمن الويب', value: 65, color: '#f59e0b' },
  { name: 'التحليل الجنائي', value: 45, color: '#10b981' },
  { name: 'التشفير', value: 30, color: '#8b5cf6' }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');

.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(.4,0,.2,1) both;
}
.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.font-\[Tajawal\] {
  font-family: 'Tajawal', sans-serif;
}

/* Custom slow bounce for hero image */
.animate-bounce-slow {
  animation: bounceSlow 2.5s infinite alternate;
}
@keyframes bounceSlow {
  0% { transform: translateY(0); }
  100% { transform: translateY(-16px); }
}
</style>