<template>
  <div class="product-card" @click="navigateToProduct">
    <!-- Image Area -->
    <div class="product-image-container">
      <img 
        :src="product.colorways[0].images[0]" 
        :alt="product.name"
        class="product-image"
        loading="lazy"
      >
      
      <!-- Badges -->
      <div class="product-badges">
        <span v-if="product.isNew" class="badge badge-new">NEW</span>
        <span v-if="product.isLimited" class="badge badge-limited">LIMITED</span>
        <span v-if="product.originalPrice" class="badge badge-sale">SALE</span>
      </div>
      
      <!-- Quick Add Button -->
      <div class="quick-add-container">
        <button 
          class="quick-add-btn"
          @click.stop="handleQuickAdd"
          :disabled="!product.inStock"
        >
          QUICK ADD +
        </button>
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="product-info">
      <div class="product-category">{{ product.category }}</div>
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-price-row">
        <span class="product-price">${{ product.price }}</span>
        <span v-if="product.originalPrice" class="product-original-price">
          ${{ product.originalPrice }}
        </span>
      </div>
      <div class="product-rating">
        <div class="rating-stars">
          <v-icon 
            v-for="star in 5" 
            :key="star"
            size="12"
            :color="star <= Math.floor(product.rating) ? 'primary' : 'text-muted'"
          >
            {{ star <= Math.floor(product.rating) ? 'mdi-star' : 'mdi-star-outline' }}
          </v-icon>
        </div>
        <span class="rating-count">({{ product.reviewCount }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()

const navigateToProduct = () => {
  router.push(`/shop/${props.product.id}`)
}

const handleQuickAdd = () => {
  if (!props.product.inStock) return
  
  // Add first available colorway and size
  const firstColorway = props.product.colorways[0]
  const firstSize = props.product.sizes[0]
  
  cartStore.addItem(props.product, firstColorway, firstSize, 1)
  
  // Show cart drawer
  document.dispatchEvent(new CustomEvent('toggle-cart'))
}
</script>

<style scoped>
.product-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
  position: relative;
}

.product-card:hover {
  border-color: var(--color-border-active);
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.product-image-container {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background-color: var(--color-bg-elevated);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-smooth);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-badges {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.badge {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-micro);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  backdrop-filter: blur(10px);
}

.badge-new {
  background-color: var(--color-accent);
  color: #080808;
}

.badge-limited {
  background-color: var(--color-accent-warm);
  color: #080808;
}

.badge-sale {
  background-color: var(--color-accent-warm);
  color: #080808;
}

.quick-add-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(100%);
  transition: transform var(--duration-normal) var(--ease-smooth);
}

.product-card:hover .quick-add-container {
  transform: translateY(0);
}

.quick-add-btn {
  width: 100%;
  padding: var(--space-3);
  background-color: var(--color-accent);
  color: #080808;
  border: none;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.quick-add-btn:hover:not(:disabled) {
  background-color: var(--color-text-primary);
  transform: translateY(-2px);
}

.quick-add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-info {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.product-category {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-micro);
  color: var(--color-text-muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.product-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
  color: var(--color-text-primary);
  margin: 0;
}

.product-price-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.product-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-accent);
}

.product-original-price {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-count {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-micro);
  color: var(--color-text-secondary);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .product-info {
    padding: var(--space-3);
  }
  
  .product-name {
    font-size: 1.125rem;
  }
  
  .product-price {
    font-size: 1rem;
  }
}
</style>
