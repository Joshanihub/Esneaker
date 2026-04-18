<template>
  <div class="home-view">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Featured Marquee -->
    <MarqueeText 
      text="FREE SHIPPING OVER $100 · NEW DROPS EVERY FRIDAY · LIMITED STOCK · JOIN THE WAITLIST · "
      :speed="25"
      direction="left"
    />
    
    <!-- Featured Products -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header" v-scroll-reveal>
          <h2 class="section-title">FEATURED DROPS</h2>
          <p class="section-subtitle">This week's most wanted</p>
        </div>
        
        <div class="featured-grid">
          <div
            v-for="(product, index) in featuredProducts"
            :key="product.id"
            class="featured-item"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <ProductCard :product="product" />
          </div>
        </div>
        
        <div class="section-cta" v-scroll-reveal>
          <router-link to="/shop" class="btn btn-primary">
            VIEW ALL DROPS
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" v-scroll-reveal="0.1">
            <AnimatedNumber 
              :value="50000" 
              suffix="+"
              class="stat-number"
            />
            <p class="stat-label">Happy Customers</p>
          </div>
          <div class="stat-item" v-scroll-reveal="0.2">
            <AnimatedNumber 
              :value="12" 
              suffix=" Countries"
              class="stat-number"
            />
            <p class="stat-label">Global Reach</p>
          </div>
          <div class="stat-item" v-scroll-reveal="0.3">
            <AnimatedNumber 
              :value="4.9" 
              suffix="/5.0"
              class="stat-number"
            />
            <p class="stat-label">Average Rating</p>
          </div>
          <div class="stat-item" v-scroll-reveal="0.4">
            <AnimatedNumber 
              :value="98" 
              suffix="%"
              class="stat-number"
            />
            <p class="stat-label">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content" v-scroll-reveal>
          <h2 class="newsletter-title">JOIN THE MOVEMENT</h2>
          <p class="newsletter-text">Get exclusive drops and early access to limited editions.</p>
          <form class="newsletter-form" @submit.prevent="handleNewsletterSubmit">
            <v-text-field
              v-model="email"
              placeholder="Enter your email"
              variant="outlined"
              density="comfortable"
              hide-details
              class="newsletter-input"
            />
            <v-btn
              type="submit"
              color="primary"
              variant="flat"
              size="large"
              class="newsletter-btn"
              :disabled="!email"
            >
              SUBSCRIBE
            </v-btn>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import HeroSection from '@/components/sections/HeroSection.vue'
import MarqueeText from '@/components/ui/MarqueeText.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import AnimatedNumber from '@/components/ui/AnimatedNumber.vue'

const productsStore = useProductsStore()
const { featuredProducts } = storeToRefs(productsStore)

const email = ref('')

const handleNewsletterSubmit = () => {
  if (email.value.trim()) {
    console.log('Newsletter subscription:', email.value)
    email.value = ''
  }
}

onMounted(() => {
  // Initialize any needed data
  productsStore.resetFilters()
})
</script>

<style scoped>
.home-view {
  background-color: var(--color-bg-primary);
}

.featured-section {
  padding: var(--space-16) 0;
  background-color: var(--color-bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
  text-transform: uppercase;
}

.section-subtitle {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin: 0;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.featured-item {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.section-cta {
  text-align: center;
}

.stats-section {
  padding: var(--space-16) 0;
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-8);
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.stat-number {
  font-family: 'Bebas Neue', cursive;
  font-size: 3rem;
  color: var(--color-accent);
  line-height: 1;
}

.stat-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.newsletter-section {
  padding: var(--space-16) 0;
  background-color: var(--color-bg-primary);
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
  text-transform: uppercase;
}

.newsletter-text {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-6) 0;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  gap: var(--space-4);
  align-items: stretch;
}

.newsletter-input {
  flex: 1;
  max-width: 400px;
}

.newsletter-btn {
  min-width: 150px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 960px) {
  .featured-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .newsletter-form {
    flex-direction: column;
    align-items: center;
  }
  
  .newsletter-input {
    max-width: 100%;
  }
  
  .newsletter-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 600px) {
  .featured-section,
  .stats-section,
  .newsletter-section {
    padding: var(--space-12) 0;
  }
  
  .section-title,
  .newsletter-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .featured-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
