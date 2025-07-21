import 'vuetify/dist/vuetify.min.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ar, en } from 'vuetify/locale'
import { h } from 'vue'

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
          primary: '#06b6d4',
          secondary: '#9333ea',
          background: '#f9fafb',
          surface: '#fff',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#06b6d4',
          secondary: '#9333ea',
          background: '#18181b',
          surface: '#23272f',
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi: {
        component: (props) => h('i', { ...props, class: 'mdi ' + props.icon })
      }
    }
  }
})