import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products } from '@/data/products.js'
import { DEFAULT_CATEGORY, DEFAULT_SORT, FEATURED_PRODUCTS_LIMIT } from '@/constants/products'

export const useProductsStore = defineStore('products', () => {
  // State
  const allProducts = ref(products)
  const activeCategory = ref(DEFAULT_CATEGORY)
  const searchQuery = ref('')
  const sortBy = ref(DEFAULT_SORT)

  // Getters
  const categories = computed(() => {
    return extractUniqueCategories()
  })

  const filteredProducts = computed(() => {
    let products = [...allProducts.value]
    
    products = applyCategoryFilter(products)
    products = applySearchFilter(products)
    products = applySorting(products)
    
    return products
  })

  const featuredProducts = computed(() => {
    return getFeaturedProducts()
  })

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
    activeCategory.value = DEFAULT_CATEGORY
    searchQuery.value = ''
    sortBy.value = DEFAULT_SORT
  }

  const getProductById = (id) => {
    return findProductById(id)
  }

  const getProductsByCategory = (category) => {
    return findProductsByCategory(category)
  }
  
  // Helper functions
  const extractUniqueCategories = () => {
    const uniqueCategories = new Set(allProducts.value.map(product => product.category))
    return [DEFAULT_CATEGORY, ...uniqueCategories]
  }
  
  const applyCategoryFilter = (products) => {
    if (activeCategory.value === DEFAULT_CATEGORY) {
      return products
    }
    
    return products.filter(product => product.category === activeCategory.value)
  }
  
  const applySearchFilter = (products) => {
    if (!searchQuery.value.trim()) {
      return products
    }
    
    const query = searchQuery.value.toLowerCase()
    return products.filter(product => matchesSearchQuery(product, query))
  }
  
  const matchesSearchQuery = (product, query) => {
    const searchableFields = [
      product.name,
      product.tagline,
      product.category,
      product.description
    ]
    
    return searchableFields.some(field => 
      field.toLowerCase().includes(query)
    )
  }
  
  const applySorting = (products) => {
    switch (sortBy.value) {
      case 'price-asc':
        return sortProductsByPrice(products, 'asc')
      case 'price-desc':
        return sortProductsByPrice(products, 'desc')
      case 'name':
        return sortProductsByName(products)
      case 'newest':
      default:
        return sortProductsByPriority(products)
    }
  }
  
  const sortProductsByPrice = (products, order) => {
    return products.sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price
    })
  }
  
  const sortProductsByName = (products) => {
    return products.sort((a, b) => a.name.localeCompare(b.name))
  }
  
  const sortProductsByPriority = (products) => {
    return products.sort((a, b) => {
      const aPriority = calculateProductPriority(a)
      const bPriority = calculateProductPriority(b)
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority
      }
      
      return a.name.localeCompare(b.name)
    })
  }
  
  const calculateProductPriority = (product) => {
    if (product.isNew) return 2
    if (product.isLimited) return 1
    return 0
  }
  
  const getFeaturedProducts = () => {
    return allProducts.value
      .filter(product => product.isNew || product.isLimited)
      .slice(0, FEATURED_PRODUCTS_LIMIT)
  }
  
  const findProductById = (id) => {
    return allProducts.value.find(product => product.id === id)
  }
  
  const findProductsByCategory = (category) => {
    return allProducts.value.filter(product => product.category === category)
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
