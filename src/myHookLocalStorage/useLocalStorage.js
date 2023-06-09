import React from 'react'

export default function useLocalStorage (key, initialValue) {
  const [storedValue, setSoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log('error', error)
      return initialValue
    }
  })
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setSoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log('error', error)
    }
  }
  return [storedValue, setValue]
}
