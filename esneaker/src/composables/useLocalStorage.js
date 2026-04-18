import { ref } from 'vue'

export function useLocalStorage(storageKey) {
  const saveData = (data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data))
    } catch (error) {
      console.error(`Failed to save data to localStorage for key ${storageKey}:`, error)
    }
  }

  const loadData = () => {
    try {
      const savedData = localStorage.getItem(storageKey)
      return savedData ? JSON.parse(savedData) : null
    } catch (error) {
      console.error(`Failed to load data from localStorage for key ${storageKey}:`, error)
      return null
    }
  }

  const clearData = () => {
    try {
      localStorage.removeItem(storageKey)
    } catch (error) {
      console.error(`Failed to clear data from localStorage for key ${storageKey}:`, error)
    }
  }

  return {
    saveData,
    loadData,
    clearData
  }
}
