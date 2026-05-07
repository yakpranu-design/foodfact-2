import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/product/${product.code}`)
  }

  const getNumericValue = (value) => {
    if (!value) return 'N/A'
    return typeof value === 'number' ? value.toFixed(1) : value
  }

  const nutrients = [
    { label: 'Energy', key: 'energy-kcal', unit: 'kcal' },
    { label: 'Protein', key: 'proteins', unit: 'g' },
    { label: 'Fat', key: 'fat', unit: 'g' },
    { label: 'Carbs', key: 'carbohydrates', unit: 'g' }
  ]

  return (
    <div className="food-card" onClick={handleClick}>
      <div className="food-card-header">
        <div className="food-card-name">{product.product_name}</div>
        <div className="food-card-brand">{product.brands || 'Unknown brand'}</div>
      </div>
      <div className="food-card-body">
        <div className="nutrition-preview">
          {nutrients.map(nutrient => (
            <div key={nutrient.key} className="nutrient">
              <div className="nutrient-value">
                {getNumericValue(product.nutriments?.[nutrient.key])}
              </div>
              <div className="nutrient-label">{nutrient.label}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}>
          View Details
        </button>
      </div>
    </div>
  )
}

export default FoodCard
