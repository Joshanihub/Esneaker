import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])

  // Load cart from localStorage on init
  const savedCart = localStorage.getItem('stridehaus-cart')
  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart)
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
  }

  // Persist cart to localStorage
  watch(
    items,
    (newItems) => {
      localStorage.setItem('stridehaus-cart', JSON.stringify(newItems))
    },
    { deep: true }
  )

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  // Actions
  const addItem = (product, colorway, size, quantity = 1) => {
    const existingItemIndex = items.value.findIndex(
      item => 
        item.product.id === product.id && 
        item.colorway.name === colorway.name && 
        item.size === size
    )

    if (existingItemIndex !== -1) {
      // Increment quantity if item already exists
      items.value[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      items.value.push({
        product,
        colorway,
        size,
        quantity
      })
    }
  }

  const removeItem = (productId, colorwayName, size) => {
    const itemIndex = items.value.findIndex(
      item => 
        item.product.id === productId && 
        item.colorway.name === colorwayName && 
        item.size === size
    )

    if (itemIndex !== -1) {
      items.value.splice(itemIndex, 1)
    }
  }

  const updateQuantity = (productId, colorwayName, size, newQuantity) => {
    const item = items.value.find(
      item => 
        item.product.id === productId && 
        item.colorway.name === colorwayName && 
        item.size === size
    )

    if (item) {
      if (newQuantity <= 0) {
        removeItem(productId, colorwayName, size)
      } else {
        item.quantity = newQuantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const getItemTotal = (item) => {
    return item.product.price * item.quantity
  }

  return {
    // State
    items,
    // Getters
    itemCount,
    subtotal,
    isEmpty,
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemTotal
  }
})
