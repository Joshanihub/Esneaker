<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    location="right"
    temporary
    class="cart-drawer"
    :width="$vuetify.display.smAndUp ? 400 : '100%'"
  >
    <!-- Header -->
    <div class="cart-header">
      <h2 class="cart-title">YOUR BAG ({{ cartStore.itemCount }})</h2>
      <button class="close-button" @click="closeCart">
        <v-icon size="24">mdi-close</v-icon>
      </button>
    </div>
    
    <!-- Cart Content -->
    <div class="cart-content">
      <!-- Empty State -->
      <div v-if="cartStore.isEmpty" class="cart-empty">
        <div class="empty-icon">
          <v-icon size="64" color="text-muted">mdi-shopping-outline</v-icon>
        </div>
        <h3 class="empty-title">YOUR BAG IS EMPTY</h3>
        <p class="empty-text">Looks like you haven't added anything yet</p>
        <router-link to="/shop" class="btn btn-primary" @click="closeCart">
          START SHOPPING
        </router-link>
      </div>
      
      <!-- Cart Items -->
      <div v-else class="cart-items">
        <div
          v-for="item in cartStore.items"
          :key="`${item.product.id}-${item.colorway.name}-${item.size}`"
          class="cart-item"
        >
          <!-- Product Image -->
          <div class="item-image">
            <img 
              :src="item.colorway.images[0]" 
              :alt="item.product.name"
              class="item-thumbnail"
            >
          </div>
          
          <!-- Product Details -->
          <div class="item-details">
            <h4 class="item-name">{{ item.product.name }}</h4>
            <p class="item-variant">{{ item.colorway.name }} · Size {{ item.size }}</p>
            <p class="item-price">${{ item.product.price }}</p>
          </div>
          
          <!-- Quantity Controls -->
          <div class="item-quantity">
            <div class="quantity-controls">
              <button 
                class="quantity-btn"
                @click="updateQuantity(item, item.quantity - 1)"
                :disabled="item.quantity <= 1"
              >
                <v-icon size="16">mdi-minus</v-icon>
              </button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button 
                class="quantity-btn"
                @click="updateQuantity(item, item.quantity + 1)"
              >
                <v-icon size="16">mdi-plus</v-icon>
              </button>
            </div>
          </div>
          
          <!-- Remove Button -->
          <div class="item-remove">
            <button 
              class="remove-button"
              @click="removeItem(item)"
              aria-label="Remove item"
            >
              <v-icon size="18">mdi-trash-can-outline</v-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div v-if="!cartStore.isEmpty" class="cart-footer">
      <div class="cart-summary">
        <div class="summary-row">
          <span class="summary-label">Subtotal</span>
          <span class="summary-value">${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>
        <p class="shipping-note">Shipping calculated at checkout</p>
      </div>
      
      <div class="cart-actions">
        <router-link to="/checkout" class="btn btn-primary checkout-btn" @click="closeCart">
          CHECKOUT
        </router-link>
        <button class="continue-shopping-btn" @click="closeCart">
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)

const drawerOpen = ref(false)

const openCart = () => {
  drawerOpen.value = true
}

const closeCart = () => {
  drawerOpen.value = false
}

const updateQuantity = (item, newQuantity) => {
  if (newQuantity <= 0) {
    removeItem(item)
  } else {
    cartStore.updateQuantity(
      item.product.id,
      item.colorway.name,
      item.size,
      newQuantity
    )
  }
}

const removeItem = (item) => {
  cartStore.removeItem(
    item.product.id,
    item.colorway.name,
    item.size
  )
}

// Listen for toggle-cart event
onMounted(() => {
  document.addEventListener('toggle-cart', openCart)
})

onUnmounted(() => {
  document.removeEventListener('toggle-cart', openCart)
})
</script>

<style scoped>
.cart-drawer {
  background-color: var(--color-bg-secondary);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.cart-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  margin: 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.close-button:hover {
  color: var(--color-accent);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-8) var(--space-4);
  min-height: 400px;
}

.empty-icon {
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.empty-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.empty-text {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-6) 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.cart-item {
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--duration-normal) var(--ease-smooth);
}

.cart-item:hover {
  border-color: var(--color-border-active);
}

.item-image {
  position: relative;
}

.item-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.item-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
}

.item-variant {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  margin: 0;
}

.item-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-accent);
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-1);
}

.quantity-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.quantity-btn:hover:not(:disabled) {
  background-color: var(--color-accent);
  color: #080808;
}

.quantity-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  min-width: 20px;
  text-align: center;
}

.item-remove {
  display: flex;
  align-items: center;
}

.remove-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
  opacity: 0;
}

.cart-item:hover .remove-button {
  opacity: 1;
}

.remove-button:hover {
  color: var(--color-accent-warm);
}

.cart-footer {
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg-elevated);
}

.cart-summary {
  margin-bottom: var(--space-4);
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.summary-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text-primary);
}

.summary-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.25rem;
  color: var(--color-accent);
}

.shipping-note {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-muted);
  margin: 0;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.checkout-btn {
  width: 100%;
  padding: var(--space-3);
  font-size: 1.125rem;
}

.continue-shopping-btn {
  width: 100%;
  padding: var(--space-2);
  background: transparent;
  border: none;
  color: var(--color-accent);
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.continue-shopping-btn:hover {
  color: var(--color-text-primary);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .cart-item {
    grid-template-columns: 50px 1fr;
    grid-template-rows: auto auto;
    gap: var(--space-2);
  }
  
  .item-image {
    grid-row: 1 / 3;
  }
  
  .item-details {
    grid-column: 2;
  }
  
  .item-quantity {
    grid-column: 2;
    justify-self: start;
  }
  
  .item-remove {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    opacity: 1;
  }
  
  .item-thumbnail {
    width: 50px;
    height: 50px;
  }
}
</style>
