import { useState, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import SavedPage from './pages/SavedPage'
import './App.css'

// Reducer for managing saved items
function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // Don't add duplicates
      if (state.some(p => p.code === action.product.code)) {
        return state
      }
      return [...state, action.product]
    case 'REMOVE':
      return state.filter(p => p.code !== action.barcode)
    default:
      return state
  }
}

function App() {
  const [saved, dispatch] = useReducer(savedReducer, [])

  return (
    <div className="app">
      <NavBar savedCount={saved.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:barcode" element={<DetailPage saved={saved} dispatch={dispatch} />} />
          <Route path="/saved" element={<SavedPage saved={saved} dispatch={dispatch} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
