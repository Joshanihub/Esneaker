import { vScrollReveal } from '@/composables/useScrollReveal.js'

export default {
  install(app) {
    app.directive('scroll-reveal', vScrollReveal)
  }
}
