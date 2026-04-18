import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import { strideHausTheme } from './assets/styles/vuetify-theme'
import './assets/styles/main.scss'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  theme: strideHausTheme,
  defaults: {
    VBtn: {
      rounded: false,
      elevation: 0,
      variant: 'flat',
      class: 'text-uppercase',
      style: 'letter-spacing: 0.1em; font-weight: 700;'
    },
    VCard: {
      rounded: false,
      elevation: 0,
      variant: 'outlined'
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      density: 'comfortable'
    },
    VSelect: {
      variant: 'outlined',
      color: 'primary',
      density: 'comfortable'
    },
    VNavigationDrawer: {
      elevation: 8
    },
    VChip: {
      rounded: false,
      variant: 'flat'
    },
    VBadge: {
      color: 'primary'
    }
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
