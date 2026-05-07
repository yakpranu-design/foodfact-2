import { useFoodSearch } from '../hooks/useFoodSearch'
import SearchBar from '../components/SearchBar'
import FoodCard from '../components/FoodCard'
import ErrorMessage from '../components/ErrorMessage'

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()

  return (
    <div className="home-page">
      <SearchBar onSearch={searchFood} />

      {error && <ErrorMessage message={error} />}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for foods...</p>
        </div>
      )}

      {!loading && results.length === 0 && !error && (
        <div className="empty-state">
          <h2>🔍 Start Your Search</h2>
          <p>Enter a food name above to see nutrition information</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="food-grid">
          {results.map(product => (
            <FoodCard key={product.code} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
