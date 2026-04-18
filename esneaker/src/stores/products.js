import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products } from '@/data/products.js'

export const useProductsStore = defineStore('products', () => {
  // State
  const allProducts = ref(products)
  const activeCategory = ref('all')
  const searchQuery = ref('')
  const sortBy = ref('newest')

  // Getters
  const categories = computed(() => {
    const cats = ['all', ...new Set(allProducts.value.map(p => p.category))]
    return cats
  })

  const filteredProducts = computed(() => {
    let filtered = [...allProducts.value]

    // Filter by category
    if (activeCategory.value !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory.value)
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy.value) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        // Sort by new/limited first, then by name
        filtered.sort((a, b) => {
          const aPriority = (a.isNew ? 2 : a.isLimited ? 1 : 0)
          const bPriority = (b.isNew ? 2 : b.isLimited ? 1 : 0)
          if (aPriority !== bPriority) return bPriority - aPriority
          return a.name.localeCompare(b.name)
        })
        break
    }

    return filtered
  })

  const featuredProducts = computed(() => {
    return allProducts.value
      .filter(p => p.isNew || p.isLimited)
      .slice(0, 4)
  })

  const getProductById = (id) => {
    return allProducts.value.find(p => p.id === id)
  }

  const getProductsByCategory = (category) => {
    return allProducts.value.filter(p => p.category === category)
  }

  // Actions
  const setCategory = (category) => {
    activeCategory.value = category
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setSortBy = (option) => {
    sortBy.value = option
  }

  const resetFilters = () => {
    activeCategory.value = 'all'
    searchQuery.value = ''
    sortBy.value = 'newest'
  }

  return {
    // State
    allProducts,
    activeCategory,
    searchQuery,
    sortBy,
    // Getters
    categories,
    filteredProducts,
    featuredProducts,
    // Actions
    setCategory,
    setSearchQuery,
    setSortBy,
    resetFilters,
    getProductById,
    getProductsByCategory
  }
})
