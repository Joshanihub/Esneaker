<template>
  <div class="size-selector">
    <div class="size-header">
      <label class="size-label">SIZE (US)</label>
      <button class="size-guide-btn" @click="openSizeGuide">
        SIZE GUIDE
        <v-icon size="16">mdi-chevron-right</v-icon>
      </button>
    </div>
    
    <div class="size-grid">
      <button
        v-for="size in sizes"
        :key="size"
        class="size-button"
        :class="{
          'size-selected': selectedSize === size,
          'size-unavailable': !availableSizes.includes(size)
        }"
        :disabled="!availableSizes.includes(size)"
        @click="selectSize(size)"
      >
        {{ size }}
      </button>
    </div>
    
    <!-- Size Guide Dialog -->
    <v-dialog v-model="sizeGuideOpen" max-width="500">
      <v-card>
        <v-card-title class="text-h6">
          Size Guide
        </v-card-title>
        <v-card-text>
          <div class="size-guide-content">
            <p class="size-guide-intro">
              Find your perfect fit with our comprehensive size guide.
            </p>
            
            <div class="size-chart">
              <h4>US Men's Sizes</h4>
              <table class="size-table">
                <thead>
                  <tr>
                    <th>US</th>
                    <th>UK</th>
                    <th>EU</th>
                    <th>CM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in sizeChart" :key="row.us">
                    <td>{{ row.us }}</td>
                    <td>{{ row.uk }}</td>
                    <td>{{ row.eu }}</td>
                    <td>{{ row.cm }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="size-tips">
              <h4>Fitting Tips</h4>
              <ul>
                <li>For running shoes, consider going up half a size for toe room</li>
                <li>Lifestyle shoes typically fit true to size</li>
                <li>If you're between sizes, size up for comfort</li>
              </ul>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="sizeGuideOpen = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  sizes: {
    type: Array,
    required: true
  },
  availableSizes: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const sizeGuideOpen = ref(false)

const selectedSize = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const sizeChart = [
  { us: 6, uk: 5.5, eu: 38.5, cm: 24 },
  { us: 6.5, uk: 6, eu: 39, cm: 24.5 },
  { us: 7, uk: 6.5, eu: 40, cm: 25 },
  { us: 7.5, uk: 7, eu: 40.5, cm: 25.5 },
  { us: 8, uk: 7.5, eu: 41, cm: 26 },
  { us: 8.5, uk: 8, eu: 42, cm: 26.5 },
  { us: 9, uk: 8.5, eu: 42.5, cm: 27 },
  { us: 9.5, uk: 9, eu: 43, cm: 27.5 },
  { us: 10, uk: 9.5, eu: 44, cm: 28 },
  { us: 10.5, uk: 10, eu: 44.5, cm: 28.5 },
  { us: 11, uk: 10.5, eu: 45, cm: 29 },
  { us: 12, uk: 11.5, eu: 46, cm: 30 }
]

const selectSize = (size) => {
  if (props.availableSizes.includes(size)) {
    selectedSize.value = size
  }
}

const openSizeGuide = () => {
  sizeGuideOpen.value = true
}
</script>

<style scoped>
.size-selector {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.size-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.size-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}

.size-guide-btn {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-accent);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.size-guide-btn:hover {
  color: var(--color-text-primary);
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: var(--space-2);
}

.size-button {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.size-button:hover:not(:disabled) {
  border-color: var(--color-border-active);
  color: var(--color-accent);
}

.size-button.size-selected {
  background-color: var(--color-accent);
  color: #080808;
  border-color: var(--color-accent);
}

.size-button.size-unavailable {
  opacity: 0.4;
  text-decoration: line-through;
  cursor: not-allowed;
}

.size-button.size-unavailable:hover {
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

/* Size Guide Dialog */
.size-guide-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.size-guide-intro {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.size-chart h4,
.size-tips h4 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.size-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
}

.size-table th,
.size-table td {
  padding: var(--space-2);
  text-align: center;
  border: 1px solid var(--color-border);
}

.size-table th {
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
  font-weight: 500;
}

.size-table td {
  color: var(--color-text-secondary);
}

.size-tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.size-tips li {
  font-family: 'DM Mono', monospace;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: 1.5;
  padding-left: var(--space-3);
  position: relative;
}

.size-tips li::before {
  content: '>';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .size-grid {
    grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
    gap: var(--space-1);
  }
  
  .size-button {
    font-size: 0.75rem;
  }
  
  .size-table {
    font-size: var(--text-micro);
  }
  
  .size-table th,
  .size-table td {
    padding: var(--space-1);
  }
}
</style>
