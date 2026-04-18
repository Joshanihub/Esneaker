<template>
  <div class="product-view" v-if="product">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <div class="container">
        <nav class="breadcrumb-nav">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/shop" class="breadcrumb-link">Shop</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ product.category }}</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="container">
      <div class="product-container">
        <!-- Left: Image Gallery -->
        <div class="product-gallery">
          <div class="main-image-container" ref="mainImageContainer">
            <img 
              :src="selectedColorway.images[selectedImageIndex]" 
              :alt="product.name"
              class="main-image"
            >
          </div>
          
          <!-- Thumbnail Row -->
          <div class="thumbnail-row">
            <button
              v-for="(image, index) in selectedColorway.images"
              :key="index"
              class="thumbnail-button"
              :class="{ 'active': selectedImageIndex === index }"
              @click="selectedImageIndex = index"
            >
              <img 
                :src="image" 
                :alt="`${product.name} view ${index + 1}`"
                class="thumbnail-image"
              >
            </button>
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="product-info">
          <!-- Badges -->
          <div class="product-badges">
            <span v-if="product.isNew" class="badge badge-new">NEW</span>
            <span v-if="product.isLimited" class="badge badge-limited">LIMITED</span>
            <span v-if="product.originalPrice" class="badge badge-sale">SALE</span>
          </div>

          <!-- Product Name -->
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="product-tagline">{{ product.tagline }}</p>

          <!-- Rating -->
          <div class="product-rating">
            <div class="rating-stars">
              <v-icon 
                v-for="star in 5" 
                :key="star"
                size="16"
                :color="star <= Math.floor(product.rating) ? 'primary' : 'text-muted'"
              >
                {{ star <= Math.floor(product.rating) ? 'mdi-star' : 'mdi-star-outline' }}
              </v-icon>
            </div>
            <span class="rating-text">({{ product.reviewCount }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="product-price">
            <span class="current-price">${{ product.price }}</span>
            <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice }}</span>
          </div>

          <!-- Colorway Selector -->
          <div class="colorway-selector">
            <div class="selector-label">
              COLOR: <span class="selected-color">{{ selectedColorway.name }}</span>
            </div>
            <div class="colorway-swatches">
              <button
                v-for="colorway in product.colorways"
                :key="colorway.name"
                class="colorway-swatch"
                :class="{ 'active': selectedColorway.name === colorway.name }"
                :style="{ backgroundColor: colorway.hex }"
                @click="selectColorway(colorway)"
                :title="colorway.name"
              />
            </div>
          </div>

          <!-- Size Selector -->
          <SizeSelector
            v-model="selectedSize"
            :sizes="product.sizes"
            :available-sizes="product.sizes"
          />

          <!-- Quantity -->
          <QuantityInput
            v-model="quantity"
            :min="1"
            :max="10"
          />

          <!-- Add to Cart Button -->
          <button 
            class="add-to-cart-btn"
            @click="addToCart"
            :disabled="!selectedSize || addingToCart"
          >
            <span v-if="!addingToCart">ADD TO CART</span>
            <span v-else>{{ addToCartText }}</span>
          </button>

          <!-- Features -->
          <div class="product-features">
            <h3 class="features-title">FEATURES</h3>
            <ul class="features-list">
              <li v-for="feature in product.features" :key="feature" class="feature-item">
                <v-icon size="16" color="primary" class="feature-icon">mdi-check</v-icon>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Description -->
          <div class="product-description">
            <h3 class="description-title">DESCRIPTION</h3>
            <p class="description-text">{{ product.description }}</p>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="related-products">
        <h2 class="related-title">RELATED DROPS</h2>
        <div class="related-grid">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="related-item"
          >
            <ProductCard :product="relatedProduct" />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Product Not Found -->
  <div v-else class="not-found">
    <div class="container">
      <div class="not-found-content">
        <h2>PRODUCT NOT FOUND</h2>
        <p>The product you're looking for doesn't exist.</p>
        <router-link to="/shop" class="btn btn-primary">
          CONTINUE SHOPPING
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ui/ProductCard.vue'
import SizeSelector from '@/components/ui/SizeSelector.vue'
import QuantityInput from '@/components/ui/QuantityInput.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const { allProducts } = storeToRefs(productsStore)

// Product data
const product = computed(() => {
  return productsStore.getProductById(route.params.id)
})

// Related products (same category, excluding current)
const relatedProducts = computed(() => {
  if (!product.value) return []
  return allProducts.value
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

// Component state
const selectedColorway = ref(null)
const selectedImageIndex = ref(0)
const selectedSize = ref(null)
const quantity = ref(1)
const addingToCart = ref(false)
const addToCartText = ref('ADDING...')
const mainImageContainer = ref(null)

// Initialize
onMounted(() => {
  if (product.value) {
    selectedColorway.value = product.value.colorways[0]
  }
})

const selectColorway = (colorway) => {
  selectedColorway.value = colorway
  selectedImageIndex.value = 0
}

const addToCart = async () => {
  if (!product.value || !selectedSize.value || !selectedColorway.value) return
  
  addingToCart.value = true
  addToCartText.value = 'ADDING...'
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 800))
  
  cartStore.addItem(product.value, selectedColorway.value, selectedSize.value, quantity.value)
  
  addToCartText.value = 'ADDED!'
  
  setTimeout(() => {
    addingToCart.value = false
    addToCartText.value = 'ADDING...'
    
    // Open cart drawer
    document.dispatchEvent(new CustomEvent('toggle-cart'))
  }, 500)
}

// Image parallax effect
const handleMouseMove = (e) => {
  if (!mainImageContainer.value) return
  
  const rect = mainImageContainer.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  const deltaX = (e.clientX - centerX) / (rect.width / 2)
  const deltaY = (e.clientY - centerY) / (rect.height / 2)
  
  const rotateX = deltaY * 5
  const rotateY = deltaX * 5
  
  mainImageContainer.value.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
}

const handleMouseLeave = () => {
  if (mainImageContainer.value) {
    mainImageContainer.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }
}
</script>

<style scoped>
.product-view {
  background-color: var(--color-bg-primary);
  min-height: calc(100vh - 72px);
}

.breadcrumb {
  padding: var(--space-4) 0;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
}

.breadcrumb-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.breadcrumb-link:hover {
  color: var(--color-accent);
}

.breadcrumb-separator {
  color: var(--color-text-muted);
}

.breadcrumb-current {
  color: var(--color-text-primary);
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  padding: var(--space-8) 0;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.main-image-container {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-elevated);
  transition: transform var(--duration-normal) var(--ease-smooth);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-row {
  display: flex;
  gap: var(--space-2);
}

.thumbnail-button {
  position: relative;
  aspect-ratio: 1/1;
  width: 80px;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.thumbnail-button:hover {
  border-color: var(--color-border-active);
}

.thumbnail-button.active {
  border-color: var(--color-accent);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.product-badges {
  display: flex;
  gap: var(--space-2);
}

.badge {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-micro);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
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

.product-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0;
  text-transform: uppercase;
}

.product-tagline {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  font-style: italic;
  color: var(--color-text-secondary);
  margin: 0;
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

.rating-text {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
}

.product-price {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.current-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  color: var(--color-accent);
}

.original-price {
  font-family: 'DM Mono', monospace;
  font-size: 1.25rem;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.colorway-selector {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.selector-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}

.selected-color {
  color: var(--color-accent);
}

.colorway-swatches {
  display: flex;
  gap: var(--space-3);
}

.colorway-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.colorway-swatch:hover {
  transform: scale(1.1);
}

.colorway-swatch.active {
  border-color: var(--color-accent);
  transform: scale(1.1);
}

.add-to-cart-btn {
  width: 100%;
  padding: var(--space-4);
  background-color: var(--color-accent);
  color: #080808;
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-accent);
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.product-features,
.product-description {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.features-title,
.description-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text-primary);
  text-transform: uppercase;
  margin: 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
}

.feature-icon {
  flex-shrink: 0;
}

.description-text {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.related-products {
  margin-top: var(--space-16);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.related-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-heading);
  color: var(--color-text-primary);
  text-transform: uppercase;
  margin: 0 0 var(--space-6) 0;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background-color: var(--color-bg-primary);
}

.not-found-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.not-found-content h2 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0;
}

.not-found-content p {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 960px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .thumbnail-row {
    justify-content: center;
  }
  
  .thumbnail-button {
    width: 60px;
  }
  
  .related-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 600px) {
  .product-container {
    padding: var(--space-6) 0;
  }
  
  .current-price {
    font-size: 1.5rem;
  }
  
  .original-price {
    font-size: 1rem;
  }
  
  .colorway-swatches {
    gap: var(--space-2);
  }
  
  .colorway-swatch {
    width: 35px;
    height: 35px;
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
