<template>
  <div class="quantity-input">
    <label class="quantity-label">QUANTITY</label>
    <div class="quantity-controls">
      <button 
        class="quantity-btn quantity-btn-minus"
        @click="decrement"
        :disabled="modelValue <= min"
        aria-label="Decrease quantity"
      >
        <v-icon size="16">mdi-minus</v-icon>
      </button>
      
      <div class="quantity-value">
        <input
          type="number"
          :value="modelValue"
          @input="handleInput"
          :min="min"
          :max="max"
          class="quantity-input-field"
        />
      </div>
      
      <button 
        class="quantity-btn quantity-btn-plus"
        @click="increment"
        :disabled="modelValue >= max"
        aria-label="Increase quantity"
      >
        <v-icon size="16">mdi-plus</v-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 99
  }
})

const emit = defineEmits(['update:modelValue'])

const increment = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const handleInput = (event) => {
  const value = parseInt(event.target.value)
  if (!isNaN(value) && value >= props.min && value <= props.max) {
    emit('update:modelValue', value)
  } else {
    // Reset to valid value
    event.target.value = props.modelValue
  }
}
</script>

<style scoped>
.quantity-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.quantity-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg-elevated);
  overflow: hidden;
}

.quantity-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: transparent;
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

.quantity-btn-minus {
  border-right: 1px solid var(--color-border);
}

.quantity-btn-plus {
  border-left: 1px solid var(--color-border);
}

.quantity-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-input-field {
  width: 100%;
  text-align: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  outline: none;
  -moz-appearance: textfield;
}

.quantity-input-field::-webkit-outer-spin-button,
.quantity-input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-input-field:focus {
  color: var(--color-accent);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .quantity-btn {
    width: 40px;
    height: 40px;
  }
  
  .quantity-input-field {
    font-size: 1rem;
  }
}
</style>
