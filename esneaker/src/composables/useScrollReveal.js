import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export function useScrollReveal() {
  let observer = null
  const elements = new Set()

  const revealElement = (element) => {
    const delay = element.dataset.delay ? parseFloat(element.dataset.delay) : 0
    
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power2.out',
        onComplete: () => {
          element.classList.add('revealed')
        }
      }
    )
  }

  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            revealElement(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
  }

  const observe = (element) => {
    if (!element) return
    
    elements.add(element)
    
    if (observer) {
      observer.observe(element)
    }
  }

  const unobserve = (element) => {
    if (element && observer) {
      observer.unobserve(element)
      elements.delete(element)
    }
  }

  const refresh = () => {
    if (observer) {
      elements.forEach(element => {
        observer.unobserve(element)
        observer.observe(element)
      })
    }
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    observe,
    unobserve,
    refresh
  }
}

// Vue directive for easy usage
export const vScrollReveal = {
  mounted(el, binding) {
    // Store the delay value if provided
    if (binding.value && typeof binding.value === 'number') {
      el.dataset.delay = binding.value.toString()
    }
    
    // Add initial state
    el.classList.add('scroll-reveal')
    
    // Use the composable
    const { observe } = useScrollReveal()
    observe(el)
  },
  unmounted(el) {
    const { unobserve } = useScrollReveal()
    unobserve(el)
  }
}
