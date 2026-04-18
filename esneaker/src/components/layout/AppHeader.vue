<template>
  <header class="app-header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <span class="logo-text">STRIDEHAUS</span>
        </router-link>

        <!-- Navigation (Desktop) -->
        <nav class="nav-desktop" v-if="$vuetify.display.mdAndUp">
          <router-link 
            v-for="link in NAVIGATION_LINKS" 
            :key="link.name"
            :to="link.path"
            class="nav-link"
            :class="{ 'active': route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </nav>

        <!-- Right Side -->
        <div class="header-right">
          <!-- Cart Icon -->
          <button 
            class="cart-button"
            @click="openCartDrawer"
            aria-label="Shopping Cart"
          >
            <v-icon size="20">mdi-shopping</v-icon>
            <v-badge 
              v-if="cartStore.itemCount > 0"
              :content="cartStore.itemCount"
              color="primary"
              class="cart-badge"
            />
          </button>

          <!-- Mobile Menu Toggle -->
          <button 
            v-if="$vuetify.display.smAndDown"
            class="menu-toggle"
            @click="toggleMobileMenu"
            aria-label="Menu"
          >
            <v-icon size="24">mdi-menu</v-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="mobileMenuOpen"
      temporary
      location="right"
      class="mobile-nav-drawer"
    >
      <div class="mobile-nav-header">
        <button class="close-button" @click="closeMobileMenu">
          <v-icon size="24">mdi-close</v-icon>
        </button>
        <div class="mobile-logo">STRIDEHAUS</div>
      </div>
      
      <nav class="mobile-nav">
        <router-link
          v-for="link in NAVIGATION_LINKS"
          :key="link.name"
          :to="link.path"
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <div class="mobile-nav-footer">
        <button class="cart-button-mobile" @click="openCartDrawer">
          <v-icon size="20">mdi-shopping</v-icon>
          <span>Cart ({{ cartStore.itemCount }})</span>
        </button>
      </div>
    </v-navigation-drawer>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { NAVIGATION_LINKS, SCROLL_THRESHOLD } from '@/constants/navigation'

const route = useRoute()
const cartStore = useCartStore()

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const checkScrollPosition = () => {
  isScrolled.value = window.scrollY > SCROLL_THRESHOLD
}

const openCartDrawer = () => {
  document.dispatchEvent(new CustomEvent('toggle-cart'))
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', checkScrollPosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition)
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(8, 8, 8, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--duration-normal) var(--ease-smooth);
}

.app-header.scrolled {
  border-bottom-color: var(--color-border);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: var(--space-4);
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--color-accent);
  letter-spacing: 0.05em;
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.nav-link {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-2) 0;
  position: relative;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width var(--duration-normal) var(--ease-smooth);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-accent);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.cart-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.cart-button:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.menu-toggle:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Mobile Navigation Drawer */
.mobile-nav-drawer {
  background-color: var(--color-bg-secondary);
}

.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
}

.mobile-logo {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.5rem;
  color: var(--color-accent);
}

.mobile-nav {
  padding: var(--space-4);
}

.mobile-nav-link {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  text-decoration: none;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border);
  transition: color var(--duration-normal) var(--ease-smooth);
}

.mobile-nav-link:hover {
  color: var(--color-accent);
}

.mobile-nav-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.cart-button-mobile {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3);
  background-color: var(--color-accent);
  color: #080808;
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.cart-button-mobile:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-accent);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .header-content {
    height: 64px;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
}
</style>
