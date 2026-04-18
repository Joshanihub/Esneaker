<template>
  <footer class="app-footer">
    <!-- Marquee Text -->
    <div class="footer-marquee">
      <MarqueeText 
        text="FREE SHIPPING OVER $100 · NEW DROPS EVERY FRIDAY · LIMITED STOCK · JOIN THE WAITLIST · "
        :speed="30"
        direction="left"
      />
    </div>

    <div class="container">
      <div class="footer-content">
        <!-- Column 1: Logo & Social -->
        <div class="footer-column">
          <div class="footer-logo">STRIDEHAUS</div>
          <p class="footer-tagline">Cinematic footwear for the relentless.</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Instagram">
              <v-icon size="20">mdi-instagram</v-icon>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <v-icon size="20">mdi-twitter</v-icon>
            </a>
            <a href="#" class="social-link" aria-label="TikTok">
              <v-icon size="20">mdi-music-note</v-icon>
            </a>
          </div>
        </div>

        <!-- Column 2: Shop Links -->
        <div class="footer-column">
          <h3 class="footer-heading">Shop</h3>
          <ul class="footer-links">
            <li><router-link to="/shop">All Products</router-link></li>
            <li><router-link to="/shop?category=running">Running</router-link></li>
            <li><router-link to="/shop?category=lifestyle">Lifestyle</router-link></li>
            <li><router-link to="/shop?category=training">Training</router-link></li>
            <li><router-link to="/shop?category=limited">Limited Edition</router-link></li>
            <li><a href="#">Sale</a></li>
          </ul>
        </div>

        <!-- Column 3: Help Links -->
        <div class="footer-column">
          <h3 class="footer-heading">Help</h3>
          <ul class="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div class="footer-column">
          <h3 class="footer-heading">Stay Connected</h3>
          <p class="footer-text">Get exclusive drops and early access.</p>
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
              class="newsletter-btn"
              :disabled="!email"
            >
              Subscribe
            </v-btn>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">© 2026 STRIDEHAUS. All rights reserved.</p>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import MarqueeText from '@/components/ui/MarqueeText.vue'

const email = ref('')

const handleNewsletterSubmit = () => {
  if (email.value.trim()) {
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email.value)
    email.value = ''
  }
}
</script>

<style scoped>
.app-footer {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-24);
}

.footer-marquee {
  border-bottom: 1px solid var(--color-border);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--space-8);
  padding: var(--space-8) 0;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer-logo {
  font-family: 'Bebas Neue', cursive;
  font-size: 2rem;
  color: var(--color-accent);
  letter-spacing: 0.05em;
}

.footer-tagline {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: 1.5;
  max-width: 250px;
}

.social-links {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.social-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.footer-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-links a {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.footer-links a:hover {
  color: var(--color-accent);
}

.footer-text {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-3);
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.newsletter-input {
  flex: 1;
}

.newsletter-btn {
  align-self: flex-start;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) 0;
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-8);
}

.copyright {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-muted);
  margin: 0;
}

.legal-links {
  display: flex;
  gap: var(--space-6);
}

.legal-links a {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.legal-links a:hover {
  color: var(--color-accent);
}

/* Responsive Design */
@media (max-width: 960px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }
  
  .footer-column:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: var(--space-4);
    align-items: flex-start;
  }
  
  .legal-links {
    flex-wrap: wrap;
    gap: var(--space-4);
  }
  
  .footer-logo {
    font-size: 1.5rem;
  }
}
</style>
