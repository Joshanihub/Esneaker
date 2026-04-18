<template>
  <span class="animated-number" :class="{ 'counting': isCounting }">
    {{ formattedValue }}
  </span>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 1500
  },
  delay: {
    type: Number,
    default: 0
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  format: {
    type: Function,
    default: null
  }
})

const currentValue = ref(0)
const isCounting = ref(false)

const formattedValue = computed(() => {
  let value = Math.round(currentValue.value)
  
  if (props.format) {
    value = props.format(value)
  } else {
    // Default formatting: add commas for thousands
    value = value.toLocaleString()
  }
  
  return `${props.prefix}${value}${props.suffix}`
})

const animateValue = (start, end, duration) => {
  isCounting.value = true
  
  const startTime = performance.now()
  const endTime = startTime + duration
  
  const update = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    
    currentValue.value = start + (end - start) * easeOut
    
    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      currentValue.value = end
      isCounting.value = false
    }
  }
  
  requestAnimationFrame(update)
}

const startAnimation = () => {
  setTimeout(() => {
    animateValue(0, props.value, props.duration)
  }, props.delay)
}

// Watch for value changes
watch(() => props.value, (newValue) => {
  animateValue(currentValue.value, newValue, props.duration / 2)
})

// Start animation on mount
onMounted(() => {
  startAnimation()
})
</script>

<style scoped>
.animated-number {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.counting {
  color: var(--color-accent);
}
</style>
