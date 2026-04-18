<template>
  <div class="marquee-container" :class="{ 'paused': isPaused }">
    <div 
      class="marquee-content" 
      :style="animationStyle"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <span class="marquee-text">{{ text }}{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 30
  },
  direction: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  }
})

const isPaused = ref(false)

const animationStyle = computed(() => {
  const duration = props.text.length * 0.1 * (30 / props.speed)
  const direction = props.direction === 'left' ? 'normal' : 'reverse'
  
  return {
    animation: `marquee ${duration}s linear infinite`,
    animationDirection: direction,
    animationPlayState: isPaused.value ? 'paused' : 'running'
  }
})
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  background-color: var(--color-accent);
  color: #080808;
  font-family: 'Bebas Neue', cursive;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}

.marquee-content {
  display: inline-block;
  will-change: transform;
}

.marquee-text {
  display: inline-block;
  padding-left: 50px;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-container.paused .marquee-content {
  animation-play-state: paused;
}
</style>
