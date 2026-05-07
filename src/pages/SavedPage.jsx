import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  const handleViewDetails = (barcode) => {
    navigate(`/product/${barcode}`)
  }

  const handleRemove = (barcode) => {
    dispatch({ type: 'REMOVE', barcode })
  }

  if (saved.length === 0) {
    return (
      <div>
        <div className="empty-state">
          <h2>📋 No Saved Items Yet</h2>
          <p>Browse our food database and save your favorite products here!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ marginBottom: '30px', color: 'white' }}>Your Saved Items ({saved.length})</h2>
      <div className="saved-list">
        {saved.map(product => (
          <div key={product.code} className="saved-item">
            <div className="saved-item-header">
              <h3>{product.product_name}</h3>
              <p>{product.brands || 'Unknown brand'}</p>
            </div>

            {product.nutriments && (
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '10px' }}>Quick Nutrition</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {product.nutriments['energy-kcal'] && (
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Energy: {product.nutriments['energy-kcal'].toFixed(1)} kcal
                    </div>
                  )}
                  {product.nutriments.proteins && (
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Protein: {product.nutriments.proteins.toFixed(1)} g
                    </div>
                  )}
                  {product.nutriments.fat && (
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Fat: {product.nutriments.fat.toFixed(1)} g
                    </div>
                  )}
                  {product.nutriments.carbohydrates && (
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Carbs: {product.nutriments.carbohydrates.toFixed(1)} g
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="saved-actions">
              <button
                className="view-details"
                onClick={() => handleViewDetails(product.code)}
              >
                View Details
              </button>
              <button
                className="remove-btn"
                onClick={() => handleRemove(product.code)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPage
