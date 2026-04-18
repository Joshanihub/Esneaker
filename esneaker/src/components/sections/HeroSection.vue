<template>
  <section class="hero-section">
    <!-- Noise Texture Overlay -->
    <div class="noise-overlay"></div>
    
    <div class="container hero-container">
      <div class="hero-content">
        <!-- Left Column -->
        <div class="hero-left">
          <div class="hero-label">{{ HERO_CONTENT.collectionLabel }}</div>
          
          <div class="hero-text">
            <h1 
              v-for="(line, index) in HERO_CONTENT.headlines" 
              :key="index"
              :class="['hero-line', line.class]"
            >
              {{ line.text }}
            </h1>
          </div>
          
          <p class="hero-subtext">
            {{ HERO_CONTENT.subtext }}
          </p>
          
          <div class="hero-actions">
            <router-link 
              v-for="action in HERO_CONTENT.actions" 
              :key="action.text"
              :to="action.path"
              :class="['btn', action.class]"
            >
              {{ action.text }}
            </router-link>
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="hero-right">
          <div class="hero-image-container">
            <img 
              :src="HERO_CONTENT.heroImage.src" 
              :alt="HERO_CONTENT.heroImage.alt"
              class="hero-image"
            >
            
            <!-- Floating Badge -->
            <div class="hero-badge">
              <span class="badge-text">{{ HERO_CONTENT.badge.text }}</span>
            </div>
            
            <!-- Stat Pills -->
            <div class="hero-stats">
              <div 
                v-for="stat in HERO_CONTENT.stats" 
                :key="stat.label"
                class="stat-pill"
              >
                <AnimatedNumber 
                  v-if="stat.animated"
                  :value="stat.value" 
                  :suffix="stat.suffix"
                  class="stat-number"
                />
                <span class="stat-label">{{ stat.label }}</span>
                <span v-if="stat.rating" class="stat-rating">{{ stat.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Diagonal Split Line -->
      <div class="diagonal-line"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import AnimatedNumber from '@/components/ui/AnimatedNumber.vue'
import { HERO_CONTENT, HERO_ANIMATION_CONFIG } from '@/constants/hero'

const initializeHeroAnimations = () => {
  const timeline = gsap.timeline()
  
  animateHeroTextLines(timeline)
  animateHeroSubtext(timeline)
  animateHeroActions(timeline)
  animateHeroImage(timeline)
  animateHeroBadge(timeline)
  animateHeroStats(timeline)
  animateHeroLabel(timeline)
  
  return timeline
}

const animateHeroTextLines = (timeline) => {
  const textLines = ['.hero-line-muted', '.hero-line-primary', '.hero-line-accent']
  
  textLines.forEach((selector, index) => {
    timeline.from(selector, {
      y: HERO_ANIMATION_CONFIG.textLines.yOffset,
      opacity: 0,
      duration: HERO_ANIMATION_CONFIG.textLines.duration,
      ease: HERO_ANIMATION_CONFIG.textLines.ease
    }, index > 0 ? '-=0.7' : '')
  })
}

const animateHeroSubtext = (timeline) => {
  timeline.from('.hero-subtext', {
    y: HERO_ANIMATION_CONFIG.subtext.yOffset,
    opacity: 0,
    duration: HERO_ANIMATION_CONFIG.subtext.duration,
    ease: HERO_ANIMATION_CONFIG.subtext.ease
  }, '-=0.5')
}

const animateHeroActions = (timeline) => {
  timeline.from('.hero-actions .btn', {
    y: HERO_ANIMATION_CONFIG.actions.yOffset,
    opacity: 0,
    duration: HERO_ANIMATION_CONFIG.actions.duration,
    ease: HERO_ANIMATION_CONFIG.actions.ease,
    stagger: HERO_ANIMATION_CONFIG.actions.stagger
  }, '-=0.3')
}

const animateHeroImage = (timeline) => {
  timeline.from('.hero-image-container', {
    x: HERO_ANIMATION_CONFIG.image.xOffset,
    opacity: 0,
    duration: HERO_ANIMATION_CONFIG.image.duration,
    ease: HERO_ANIMATION_CONFIG.image.ease
  }, '-=0.8')
}

const animateHeroBadge = (timeline) => {
  timeline.from('.hero-badge', {
    scale: HERO_ANIMATION_CONFIG.badge.scale,
    rotation: HERO_ANIMATION_CONFIG.badge.rotation,
    opacity: 0,
    duration: HERO_ANIMATION_CONFIG.badge.duration,
    ease: HERO_ANIMATION_CONFIG.badge.ease
  }, '-=0.5')
}

const animateHeroStats = (timeline) => {
  timeline.from('.stat-pill', {
    y: HERO_ANIMATION_CONFIG.stats.yOffset,
    opacity: 0,
    duration: HERO_ANIMATION_CONFIG.stats.duration,
    ease: HERO_ANIMATION_CONFIG.stats.ease,
    stagger: HERO_ANIMATION_CONFIG.stats.stagger
  }, '-=0.3')
}

const animateHeroLabel = (timeline) => {
  timeline.from('.hero-label', {
    y: HERO_ANIMATION_CONFIG.label.yOffset,
    opacity: 0,
    duration: HERO_ANIMATION_CONFIG.label.duration,
    ease: HERO_ANIMATION_CONFIG.label.ease
  }, '-=0.8')
}

onMounted(() => {
  initializeHeroAnimations()
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100dvh;
  background-color: var(--color-bg-primary);
  overflow: hidden;
}

.hero-container {
  position: relative;
  height: 100dvh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: var(--space-8);
  width: 100%;
  align-items: center;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  z-index: 2;
}

.hero-label {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-micro);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  opacity: 0;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.hero-line {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  margin: 0;
  opacity: 0;
}

.hero-line-muted {
  font-size: var(--text-hero);
  color: var(--color-text-muted);
}

.hero-line-primary {
  font-size: var(--text-hero);
  color: var(--color-text-primary);
}

.hero-line-accent {
  font-size: var(--text-hero);
  color: var(--color-accent);
  font-style: italic;
}

.hero-subtext {
  font-family: 'DM Mono', monospace;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero-right {
  position: relative;
  z-index: 2;
}

.hero-image-container {
  position: relative;
  transform: rotate(-8deg);
  transition: transform var(--duration-slow) var(--ease-smooth);
}

.hero-image-container:hover {
  transform: rotate(-5deg);
}

.hero-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.hero-badge {
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: var(--color-accent);
  color: #080808;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-pill);
  animation: pulse 2s infinite;
}

.badge-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-stats {
  position: absolute;
  bottom: -20px;
  left: -20px;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.stat-pill {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  backdrop-filter: blur(10px);
}

.stat-number {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.25rem;
  color: var(--color-accent);
}

.stat-label {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
}

.stat-rating {
  font-family: 'Bebas Neue', cursive;
  font-size: 1rem;
  color: var(--color-accent);
}

.diagonal-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  transform: rotate(-15deg) translateY(-50%);
  z-index: 1;
  opacity: 0.3;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Responsive Design */
@media (max-width: 960px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    text-align: center;
  }
  
  .hero-left {
    order: 2;
    align-items: center;
  }
  
  .hero-right {
    order: 1;
  }
  
  .hero-image-container {
    transform: rotate(-5deg);
    max-width: 400px;
    margin: 0 auto;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-text {
    align-items: center;
  }
  
  .hero-line {
    text-align: center;
  }
}

@media (max-width: 600px) {
  .hero-line-muted,
  .hero-line-primary,
  .hero-line-accent {
    font-size: clamp(3rem, 12vw, 8rem);
  }
  
  .hero-subtext {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
  
  .hero-actions .btn {
    width: 100%;
  }
  
  .hero-image-container {
    transform: rotate(-3deg);
  }
  
  .hero-badge {
    top: -10px;
    right: -10px;
  }
  
  .hero-stats {
    bottom: -10px;
    left: -10px;
  }
}
</style>
