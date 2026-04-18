<template>
  <div class="checkout-view">
    <div class="container">
      <div class="checkout-container">
        <!-- Checkout Form -->
        <div class="checkout-form">
          <h1 class="checkout-title">CHECKOUT</h1>
          
          <!-- Step Indicator -->
          <div class="step-indicator">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              class="step"
              :class="{ 
                'active': currentStep === index + 1,
                'completed': currentStep > index + 1
              }"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <span class="step-label">{{ step }}</span>
            </div>
          </div>

          <!-- Step 1: Contact + Shipping -->
          <div v-if="currentStep === 1" class="step-content">
            <h2 class="step-title">Contact & Shipping Information</h2>
            
            <div class="form-grid">
              <v-text-field
                v-model="form.firstName"
                label="First Name"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.firstName"
                required
              />
              
              <v-text-field
                v-model="form.lastName"
                label="Last Name"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.lastName"
                required
              />
              
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.email"
                required
              />
              
              <v-text-field
                v-model="form.phone"
                label="Phone"
                type="tel"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.phone"
                required
              />
              
              <v-text-field
                v-model="form.address"
                label="Address"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.address"
                required
              />
              
              <v-text-field
                v-model="form.city"
                label="City"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.city"
                required
              />
              
              <v-select
                v-model="form.country"
                :items="countries"
                label="Country"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.country"
                required
              />
              
              <v-text-field
                v-model="form.zipCode"
                label="ZIP Code"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.zipCode"
                required
              />
            </div>
            
            <v-checkbox
              v-model="form.saveInfo"
              label="Save my information for next time"
              color="primary"
            />
          </div>

          <!-- Step 2: Delivery Method -->
          <div v-if="currentStep === 2" class="step-content">
            <h2 class="step-title">Delivery Method</h2>
            
            <div class="delivery-options">
              <div
                v-for="option in deliveryOptions"
                :key="option.id"
                class="delivery-option"
                :class="{ 'selected': form.deliveryMethod === option.id }"
                @click="form.deliveryMethod = option.id"
              >
                <div class="delivery-radio">
                  <v-radio
                    :model-value="form.deliveryMethod"
                    :value="option.id"
                    color="primary"
                  />
                </div>
                <div class="delivery-info">
                  <h3 class="delivery-name">{{ option.name }}</h3>
                  <p class="delivery-description">{{ option.description }}</p>
                </div>
                <div class="delivery-price">
                  <span class="price">{{ option.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Payment -->
          <div v-if="currentStep === 3" class="step-content">
            <h2 class="step-title">Payment Information</h2>
            
            <div class="payment-form">
              <v-text-field
                v-model="form.cardNumber"
                label="Card Number"
                variant="outlined"
                density="comfortable"
                placeholder="XXXX XXXX XXXX XXXX"
                :error-messages="errors.cardNumber"
                required
              />
              
              <div class="card-row">
                <v-text-field
                  v-model="form.expiry"
                  label="Expiry"
                  variant="outlined"
                  density="comfortable"
                  placeholder="MM/YY"
                  :error-messages="errors.expiry"
                  required
                />
                
                <v-text-field
                  v-model="form.cvv"
                  label="CVV"
                  variant="outlined"
                  density="comfortable"
                  placeholder="123"
                  :error-messages="errors.cvv"
                  required
                />
              </div>
              
              <v-text-field
                v-model="form.nameOnCard"
                label="Name on Card"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.nameOnCard"
                required
              />
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="form-navigation">
            <button 
              v-if="currentStep > 1"
              class="btn btn-secondary"
              @click="previousStep"
            >
              BACK
            </button>
            
            <button 
              class="btn btn-primary"
              @click="nextStep"
              :disabled="!isStepValid || processing"
            >
              <span v-if="currentStep < 3">CONTINUE</span>
              <span v-else>{{ processing ? 'PROCESSING...' : 'PLACE ORDER' }}</span>
            </button>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="order-summary" v-if="$vuetify.display.mdAndUp">
          <h2 class="summary-title">ORDER SUMMARY</h2>
          
          <div class="summary-items">
            <div
              v-for="item in cartStore.items"
              :key="`${item.product.id}-${item.colorway.name}-${item.size}`"
              class="summary-item"
            >
              <img 
                :src="item.colorway.images[0]" 
                :alt="item.product.name"
                class="summary-image"
              >
              <div class="summary-details">
                <h4 class="summary-name">{{ item.product.name }}</h4>
                <p class="summary-variant">{{ item.colorway.name }} · Size {{ item.size }} · Qty {{ item.quantity }}</p>
              </div>
              <div class="summary-price">${{ cartStore.getItemTotal(item).toFixed(2) }}</div>
            </div>
          </div>
          
          <div class="summary-breakdown">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>{{ shippingCost }}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
          
          <!-- Promo Code -->
          <div class="promo-code">
            <v-text-field
              v-model="promoCode"
              label="Promo Code"
              variant="outlined"
              density="comfortable"
              hide-details
            />
            <v-btn
              @click="applyPromoCode"
              variant="outlined"
              color="primary"
              :disabled="!promoCode"
            >
              APPLY
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Success State -->
    <div v-if="orderComplete" class="order-success">
      <div class="success-content">
        <div class="success-icon">
          <v-icon size="80" color="primary">mdi-check-circle</v-icon>
        </div>
        <h2 class="success-title">ORDER CONFIRMED</h2>
        <p class="success-message">Thank you for your order! Your order number is:</p>
        <div class="order-number">#{{ orderNumber }}</div>
        <p class="success-details">You'll receive an email confirmation shortly with tracking information.</p>
        <router-link to="/" class="btn btn-primary" @click="resetCheckout">
          CONTINUE SHOPPING
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { items, subtotal } = storeToRefs(cartStore)

// Redirect if cart is empty
onMounted(() => {
  if (cartStore.isEmpty) {
    window.location.href = '/shop'
  }
})

const currentStep = ref(1)
const processing = ref(false)
const orderComplete = ref(false)
const orderNumber = ref('')
const promoCode = ref('')

const steps = ['Contact', 'Delivery', 'Payment']

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  zipCode: '',
  saveInfo: false,
  deliveryMethod: 'standard',
  cardNumber: '',
  expiry: '',
  cvv: '',
  nameOnCard: ''
})

const errors = ref({})

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Australia',
  'Japan',
  'Other'
]

const deliveryOptions = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 'Free'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: '$9.99'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: '$19.99'
  }
]

const shippingCost = computed(() => {
  const option = deliveryOptions.find(o => o.id === form.value.deliveryMethod)
  return option ? option.price : 'Free'
})

const total = computed(() => {
  const shipping = shippingCost.value === 'Free' ? 0 : parseFloat(shippingCost.value.replace('$', ''))
  return subtotal.value + shipping
})

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return form.value.firstName && 
             form.value.lastName && 
             form.value.email && 
             form.value.phone && 
             form.value.address && 
             form.value.city && 
             form.value.country && 
             form.value.zipCode
    case 2:
      return form.value.deliveryMethod
    case 3:
      return form.value.cardNumber && 
             form.value.expiry && 
             form.value.cvv && 
             form.value.nameOnCard
    default:
      return false
  }
})

const validateStep = () => {
  errors.value = {}
  
  if (currentStep.value === 1) {
    if (!form.value.firstName) errors.value.firstName = 'First name is required'
    if (!form.value.lastName) errors.value.lastName = 'Last name is required'
    if (!form.value.email) errors.value.email = 'Email is required'
    if (!form.value.phone) errors.value.phone = 'Phone is required'
    if (!form.value.address) errors.value.address = 'Address is required'
    if (!form.value.city) errors.value.city = 'City is required'
    if (!form.value.country) errors.value.country = 'Country is required'
    if (!form.value.zipCode) errors.value.zipCode = 'ZIP code is required'
  }
  
  if (currentStep.value === 3) {
    if (!form.value.cardNumber) errors.value.cardNumber = 'Card number is required'
    if (!form.value.expiry) errors.value.expiry = 'Expiry date is required'
    if (!form.value.cvv) errors.value.cvv = 'CVV is required'
    if (!form.value.nameOnCard) errors.value.nameOnCard = 'Name on card is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const nextStep = () => {
  if (!validateStep()) return
  
  if (currentStep.value < 3) {
    currentStep.value++
  } else {
    placeOrder()
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    errors.value = {}
  }
}

const placeOrder = async () => {
  processing.value = true
  
  // Simulate order processing
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Generate order number
  orderNumber.value = 'SH' + Date.now().toString().slice(-8)
  
  // Clear cart
  cartStore.clearCart()
  
  // Show success state
  orderComplete.value = true
  processing.value = false
}

const applyPromoCode = () => {
  if (promoCode.value.trim()) {
    console.log('Applying promo code:', promoCode.value)
    // In a real app, this would validate and apply the promo
    promoCode.value = ''
  }
}

const resetCheckout = () => {
  orderComplete.value = false
  currentStep.value = 1
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    saveInfo: false,
    deliveryMethod: 'standard',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  }
  errors.value = {}
}
</script>

<style scoped>
.checkout-view {
  background-color: var(--color-bg-primary);
  min-height: calc(100vh - 72px);
  padding: var(--space-8) 0;
}

.checkout-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--space-8);
  align-items: start;
}

.checkout-form {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.checkout-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-6) 0;
  text-transform: uppercase;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  position: relative;
}

.step-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-border);
  z-index: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-bg-elevated);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text-secondary);
  transition: all var(--duration-normal) var(--ease-smooth);
}

.step.active .step-number {
  background-color: var(--color-accent);
  color: #080808;
  border-color: var(--color-accent);
}

.step.completed .step-number {
  background-color: var(--color-accent);
  color: #080808;
  border-color: var(--color-accent);
}

.step-label {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.step.active .step-label,
.step.completed .step-label {
  color: var(--color-text-primary);
}

.step-content {
  margin-bottom: var(--space-8);
}

.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-6) 0;
  text-transform: uppercase;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.form-grid > *:nth-child(3n+1),
.form-grid > *:nth-child(3n+2) {
  grid-column: span 1;
}

.form-grid > *:nth-child(3n) {
  grid-column: span 2;
}

.delivery-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.delivery-option {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-4);
  padding: var(--space-4);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.delivery-option:hover {
  border-color: var(--color-border-active);
}

.delivery-option.selected {
  border-color: var(--color-accent);
  background-color: rgba(232, 255, 0, 0.05);
}

.delivery-radio {
  display: flex;
  align-items: center;
}

.delivery-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.delivery-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text-primary);
  margin: 0;
}

.delivery-description {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  margin: 0;
}

.delivery-price {
  display: flex;
  align-items: center;
}

.price {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-accent);
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.card-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.order-summary {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  position: sticky;
  top: 100px;
}

.summary-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
  text-transform: uppercase;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  max-height: 300px;
  overflow-y: auto;
}

.summary-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: var(--space-3);
  align-items: center;
}

.summary-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.summary-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
}

.summary-variant {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-micro);
  color: var(--color-text-secondary);
  margin: 0;
}

.summary-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-accent);
}

.summary-breakdown {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
}

.summary-row.total {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text-primary);
}

.promo-code {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-2);
}

.order-success {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background-color: var(--color-bg-primary);
}

.success-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 500px;
}

.success-icon {
  animation: scaleIn 0.6s ease-out;
}

.success-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: var(--text-display);
  color: var(--color-text-primary);
  margin: 0;
  text-transform: uppercase;
}

.success-message,
.success-details {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin: 0;
}

.order-number {
  font-family: 'Bebas Neue', cursive;
  font-size: 2rem;
  color: var(--color-accent);
  letter-spacing: 0.05em;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 960px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
    margin-top: var(--space-6);
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid > * {
    grid-column: span 1 !important;
  }
}

@media (max-width: 600px) {
  .checkout-view {
    padding: var(--space-4) 0;
  }
  
  .checkout-form {
    padding: var(--space-4);
  }
  
  .checkout-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .step-indicator {
    gap: var(--space-2);
  }
  
  .step-label {
    font-size: var(--text-micro);
  }
  
  .card-row {
    grid-template-columns: 1fr;
  }
  
  .form-navigation {
    flex-direction: column;
  }
  
  .form-navigation .btn {
    width: 100%;
  }
}
</style>
