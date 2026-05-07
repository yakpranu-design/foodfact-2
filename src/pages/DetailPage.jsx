import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isSaved = saved.some(p => p.code === barcode)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (!cancelled) {
          if (response.data.product) {
            setProduct(response.data.product)
          } else {
            setError('Product not found. Please check the barcode.')
            setProduct(null)
          }
        }
      } catch (err) {
        if (!cancelled) {
          if (err.response?.status === 404) {
            setError('Product not found. Please try another barcode.')
          } else if (err.request) {
            setError('Network error. Please check your connection.')
          } else {
            setError('An error occurred while fetching product details.')
          }
          setProduct(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const handleSaveClick = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="detail-container">
        {error && <ErrorMessage message={error} />}
        <div className="button-group">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    )
  }

  const nutrients = [
    { label: 'Energy', key: 'energy-kcal', unit: 'kcal' },
    { label: 'Protein', key: 'proteins', unit: 'g' },
    { label: 'Fat', key: 'fat', unit: 'g' },
    { label: 'Carbohydrates', key: 'carbohydrates', unit: 'g' },
    { label: 'Sugars', key: 'sugars', unit: 'g' },
    { label: 'Salt', key: 'salt', unit: 'g' },
    { label: 'Fiber', key: 'fiber', unit: 'g' },
    { label: 'Saturated Fat', key: 'saturated-fat', unit: 'g' }
  ]

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1>{product.product_name}</h1>
        <p>{product.brands || 'Unknown Brand'}</p>
      </div>

      <div className="nutrition-grid">
        {nutrients.map(nutrient => {
          const value = product.nutriments?.[nutrient.key]
          return (
            <div key={nutrient.key} className="nutrition-item">
              <h4>{nutrient.label}</h4>
              <p>
                {value !== undefined && value !== null ? `${value.toFixed(1)} ${nutrient.unit}` : 'N/A'}
              </p>
            </div>
          )
        })}
      </div>

      {product.categories && (
        <div className="nutrition-item">
          <h4>Categories</h4>
          <p>{product.categories}</p>
        </div>
      )}

      <div className="button-group">
        <button
          className={`btn ${isSaved ? 'btn-danger' : 'btn-primary'}`}
          onClick={handleSaveClick}
        >
          {isSaved ? '❌ Remove from Saved' : '💾 Save Product'}
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  )
}

export default DetailPage
