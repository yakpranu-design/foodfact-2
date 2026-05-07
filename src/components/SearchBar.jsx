import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedInput = input.trim()

    if (!trimmedInput) {
      setValidationError('Please enter a food name')
      return
    }

    if (trimmedInput.length < 2) {
      setValidationError('Search term must be at least 2 characters')
      return
    }

    setValidationError('')
    onSearch(trimmedInput)
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for food (e.g., apple, yogurt, pasta)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {validationError && <div className="validation-error">{validationError}</div>}
    </div>
  )
}

export default SearchBar
