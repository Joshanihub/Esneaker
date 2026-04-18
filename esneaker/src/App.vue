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
    
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/sections/CartDrawer.vue'

</script>

<style>
/* Global styles are imported from main.scss */
.main-content {
  min-height: 100vh;
  padding-top: 72px; /* Header height */
}

/* Page transitions are handled in main.scss */
</style>
