import { useState } from 'react'
import axios from 'axios'

export function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([])
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
        params: {
          search_terms: query,
          page_size: 20,
          json: 1
        }
      })

      const products = response.data.products || []
      
      // Filter products to only those with required fields
      const filteredProducts = products.filter(p => p.code && p.product_name)
      
      setResults(filteredProducts)
      
      if (filteredProducts.length === 0) {
        setError('No products found. Try a different search.')
      }
    } catch (err) {
      // Handle CORS errors gracefully with demo data
      if (err.message.includes('CORS') || err.message.includes('blocked')) {
        // For demo purposes, show user-friendly message
        setError('Search service temporarily unavailable. This is a CORS issue with the API. In production, use a backend proxy.')
      } else if (err.response) {
        setError(`Server error: ${err.response.status}. Please try again.`)
      } else if (err.request) {
        setError('No internet connection. Please check your network.')
      } else {
        setError('An error occurred. Please try again.')
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood }
}
