<template>
  <section class="hero-section">
    <!-- Noise Texture Overlay -->
    <div class="noise-overlay"></div>
    
    <div class="container hero-container">
      <div class="hero-content">
        <!-- Left Column -->
        <div class="hero-left">
          <div class="hero-label">SS26 COLLECTION</div>
          
          <div class="hero-text">
            <h1 class="hero-line hero-line-muted">BUILT</h1>
            <h1 class="hero-line hero-line-primary">FOR THE</h1>
            <h1 class="hero-line hero-line-accent">RELENTLESS</h1>
          </div>
          
          <p class="hero-subtext">
            Engineered for those who refuse to compromise. Every stride a statement, every step a revolution.
          </p>
          
          <div class="hero-actions">
            <router-link to="/shop" class="btn btn-primary">
              SHOP NOW
            </router-link>
            <button class="btn btn-secondary">
              VIEW LOOKBOOK
            </button>
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="hero-right">
          <div class="hero-image-container">
            <img 
              src="https://picsum.photos/seed/stridehaus-hero-sneaker/600/600" 
              alt="STRIDEHAUS Hero Sneaker"
              class="hero-image"
            >
            
            <!-- Floating Badge -->
            <div class="hero-badge">
              <span class="badge-text">NEW DROP</span>
            </div>
            
            <!-- Stat Pills -->
            <div class="hero-stats">
              <div class="stat-pill">
                <AnimatedNumber 
                  :value="12000" 
                  suffix="+"
                  class="stat-number"
                />
                <span class="stat-label">Reviews</span>
                <span class="stat-rating">4.9</span>
              </div>
              <div class="stat-pill">
                <span class="stat-label">Free Shipping</span>
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

onMounted(() => {
  // GSAP Hero Animations
  const tl = gsap.timeline()
  
  // Hero text lines - staggered entrance
  tl.from('.hero-line-muted', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.hero-line-primary', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.7')
  .from('.hero-line-accent', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.7')
  
  // Subtext
  .from('.hero-subtext', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  
  // CTA buttons
  .from('.hero-actions .btn', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1
  }, '-=0.3')
  
  // Right image
  .from('.hero-image-container', {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=0.8')
  
  // Floating badge with spring bounce
  .from('.hero-badge', {
    scale: 0,
    rotation: -180,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  
  // Stat pills
  .from('.stat-pill', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1
  }, '-=0.3')
  
  // Hero label
  .from('.hero-label', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.8')
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
