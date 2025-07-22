
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router';
import App from './App.vue'
import './assets/tailwind.css'
import { i18n } from './utils/i18n'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vuetify)
app.mount('#app')

