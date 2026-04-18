<template>
  <div class="shop-view">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">SHOP</h1>
        <p class="page-subtitle">Discover the latest drops and timeless classics</p>
      </div>
    </div>
    
    <!-- Product Grid -->
    <ProductGrid />
  </div>
</template>

<script setup>
import ProductGrid from '@/components/sections/ProductGrid.vue'
</script>

<style scoped>
.shop-view {
  background-color: var(--color-bg-primary);
  min-height: calc(100vh - 72px); /* Subtract header height */
}

.page-header {
  padding: var(--space-8) 0;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
  text-transform: uppercase;
}

.page-subtitle {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 600px) {
  .page-header {
    padding: var(--space-6) 0;
  }
  
  .page-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
}
</style>
