<template>
  <section class="product-grid-section">
    <div class="container">
      <!-- Filter Bar -->
      <div class="filter-bar" :class="{ 'sticky': isSticky }">
        <div class="filter-row">
          <!-- Category Pills -->
          <div class="category-filters">
            <button
              v-for="category in categories"
              :key="category"
              class="category-pill"
              :class="{ 'active': activeCategory === category }"
              @click="setCategory(category)"
            >
              {{ category.charAt(0).toUpperCase() + category.slice(1) }}
            </button>
          </div>
          
          <!-- Sort Dropdown -->
          <div class="sort-controls">
            <v-select
              v-model="sortBy"
              :items="sortOptions"
              item-title="label"
              item-value="value"
              variant="outlined"
              density="comfortable"
              hide-details
              class="sort-select"
            />
          </div>
        </div>
        
        <!-- Search Input -->
        <div class="search-row">
          <v-text-field
            v-model="searchQuery"
            placeholder="Search products..."
            variant="outlined"
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="search-input"
          />
        </div>
      </div>
      
      <!-- Products Grid -->
      <div class="products-grid" v-if="filteredProducts.length > 0">
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="product-grid-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <ProductCard :product="product" />
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <v-icon size="64" color="text-muted">mdi-shoe-heel</v-icon>
        </div>
        <h2 class="empty-title">NO DROPS MATCH YOUR VIBE</h2>
        <p class="empty-text">Try adjusting your filters or search terms</p>
        <button class="btn btn-secondary" @click="resetFilters">
          RESET FILTERS
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ui/ProductCard.vue'

const productsStore = useProductsStore()
const { categories, filteredProducts } = storeToRefs(productsStore)

const { activeCategory, searchQuery, sortBy } = storeToRefs(productsStore)

const isSticky = ref(false)

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name' }
]

const handleScroll = () => {
  isSticky.value = window.scrollY > 200
}

const setCategory = (category) => {
  productsStore.setCategory(category)
}

const resetFilters = () => {
  productsStore.resetFilters()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.product-grid-section {
  padding: var(--space-12) 0;
  background-color: var(--color-bg-primary);
}

.filter-bar {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-8);
  transition: all var(--duration-normal) var(--ease-smooth);
}

.filter-bar.sticky {
  position: sticky;
  top: 88px; /* Header height + some padding */
  z-index: 100;
  backdrop-filter: blur(20px);
  background-color: rgba(17, 17, 17, 0.95);
}

.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.category-filters {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.category-pill {
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.category-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.category-pill.active {
  background-color: var(--color-accent);
  color: #080808;
  border-color: var(--color-accent);
}

.sort-controls {
  min-width: 200px;
}

.sort-select {
  max-width: 200px;
}

.search-row {
  display: flex;
  gap: var(--space-4);
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  animation: fadeInUp 0.6s ease-out;
}

.product-grid-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-4);
  text-align: center;
}

.empty-icon {
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.empty-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.empty-text {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-6) 0;
  max-width: 400px;
}

/* Responsive Design */
@media (max-width: 960px) {
  .filter-row {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-3);
  }
  
  .category-filters {
    justify-content: center;
  }
  
  .sort-controls {
    align-self: center;
  }
  
  .search-row {
    justify-content: center;
  }
  
  .search-input {
    max-width: 100%;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
  }
}

@media (max-width: 600px) {
  .product-grid-section {
    padding: var(--space-8) 0;
  }
  
  .filter-bar {
    padding: var(--space-3);
    margin-bottom: var(--space-6);
  }
  
  .filter-bar.sticky {
    top: 80px; /* Adjusted for smaller header */
  }
  
  .category-filters {
    gap: var(--space-1);
  }
  
  .category-pill {
    padding: var(--space-1) var(--space-2);
    font-size: 0.75rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  
  .empty-title {
    font-size: 1.5rem;
  }
  
  .empty-text {
    font-size: var(--text-small);
  }
}
</style>
