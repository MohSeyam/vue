import 'vuetify/dist/vuetify.min.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ar, en } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
  components,
  directives,
  locale: {
    locale: 'ar',
    fallback: 'en',
    messages: { ar, en },
    rtl: { ar: true, en: false }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#2563eb', // blue-600
          secondary: '#a21caf', // purple-800
          accent: '#f59e42', // orange accent
          background: '#f3f4f6', // gray-100
          surface: '#fff',
          info: '#0ea5e9',
          success: '#22c55e',
          warning: '#f59e42',
          error: '#ef4444',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#60a5fa', // blue-400
          secondary: '#c084fc', // purple-400
          accent: '#fbbf24', // yellow accent
          background: '#0f172a', // slate-900
          surface: '#1e293b', // slate-800
          info: '#38bdf8',
          success: '#4ade80',
          warning: '#fbbf24',
          error: '#f87171',
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})