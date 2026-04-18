<template>
  <div class="not-found-view">
    <div class="container">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">PAGE NOT FOUND</h2>
        <p class="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            GO HOME
          </router-link>
          <router-link to="/shop" class="btn btn-secondary">
            SHOP DROPS
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for 404 page
</script>

<style scoped>
.not-found-view {
  background-color: var(--color-bg-primary);
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 600px;
}

.error-code {
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(6rem, 20vw, 12rem);
  color: var(--color-accent);
  line-height: 1;
  margin: 0;
}

.error-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0;
  text-transform: uppercase;
}

.error-message {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.error-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 600px) {
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .error-actions .btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>
