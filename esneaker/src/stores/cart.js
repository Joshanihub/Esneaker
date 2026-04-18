import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { CART_STORAGE_KEY } from '@/constants/storage'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  
  // Use localStorage composable for cart persistence
  const { saveData, loadData, clearData } = useLocalStorage(CART_STORAGE_KEY)
  
  // Initialize cart from localStorage
  const initializeCart = () => {
    const savedCart = loadData()
    if (savedCart) {
      items.value = savedCart
    }
  }
  
  // Initialize on store creation
  initializeCart()

  // Persist cart to localStorage
  watch(
    items,
    (newItems) => {
      saveData(newItems)
    },
    { deep: true }
  )

  // Getters
  const itemCount = computed(() => {
    return calculateTotalItemCount(items.value)
  })

  const subtotal = computed(() => {
    return calculateSubtotal(items.value)
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  // Actions
  const addItem = (product, colorway, size, quantity = 1) => {
    const existingItemIndex = findExistingItemIndex(product.id, colorway.name, size)

    if (existingItemIndex !== -1) {
      incrementItemQuantity(existingItemIndex, quantity)
    } else {
      addNewItem(product, colorway, size, quantity)
    }
  }

  const removeItem = (productId, colorwayName, size) => {
    const itemIndex = findExistingItemIndex(productId, colorwayName, size)

    if (itemIndex !== -1) {
      items.value.splice(itemIndex, 1)
    }
  }

  const updateQuantity = (productId, colorwayName, size, newQuantity) => {
    const item = findExistingItem(productId, colorwayName, size)

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
    clearData()
  }

  const getItemTotal = (item) => {
    return calculateItemTotal(item)
  }
  
  // Helper functions
  const findExistingItemIndex = (productId, colorwayName, size) => {
    return items.value.findIndex(
      item => 
        item.product.id === productId && 
        item.colorway.name === colorwayName && 
        item.size === size
    )
  }
  
  const findExistingItem = (productId, colorwayName, size) => {
    return items.value.find(
      item => 
        item.product.id === productId && 
        item.colorway.name === colorwayName && 
        item.size === size
    )
  }
  
  const incrementItemQuantity = (itemIndex, quantity) => {
    items.value[itemIndex].quantity += quantity
  }
  
  const addNewItem = (product, colorway, size, quantity) => {
    items.value.push({
      product,
      colorway,
      size,
      quantity
    })
  }
  
  const calculateTotalItemCount = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }
  
  const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }
  
  const calculateItemTotal = (item) => {
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
