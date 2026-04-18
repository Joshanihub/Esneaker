<template>
  <v-app id="app">
    <AppHeader />
    
    <v-main>
      <main class="main-content">
        <Transition name="page" mode="out-in">
          <RouterView />
        </Transition>
      </main>
    </v-main>
    
    <AppFooter />
    <CartDrawer />
    
    <!-- Custom Cursor (desktop only) -->
    <div v-if="$vuetify.display.lgAndUp" class="custom-cursor"></div>
    <div v-if="$vuetify.display.lgAndUp" class="cursor-follower"></div>
  </v-app>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/sections/CartDrawer.vue'

const handleMouseMove = (e) => {
  if (window.innerWidth >= 1280) {
    const cursor = document.querySelector('.custom-cursor')
    const follower = document.querySelector('.cursor-follower')
    
    if (cursor && follower) {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
      
      // Add slight delay to follower for smooth effect
      setTimeout(() => {
        follower.style.left = e.clientX + 'px'
        follower.style.top = e.clientY + 'px'
      }, 50)
    }
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style>
/* Global styles are imported from main.scss */
.main-content {
  min-height: 100vh;
  padding-top: 72px; /* Header height */
}

/* Page transitions are handled in main.scss */
</style>
