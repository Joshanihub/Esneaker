import { createVuetify } from 'vuetify'

export const strideHausTheme = {
  defaultTheme: 'stridehaus',
  themes: {
    stridehaus: {
      dark: true,
      colors: {
        background: '#080808',
        surface: '#111111',
        primary: '#E8FF00',
        secondary: '#FF3D00',
        error: '#FF3D00',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      }
    }
  },
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
}

export const vuetify = createVuetify({
  theme: strideHausTheme
})
