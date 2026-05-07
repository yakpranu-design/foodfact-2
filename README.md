# FoodFacts - Part 2: Routing, Forms & Async Patterns

A React application that searches for nutrition information by food name using the Open Food Facts API. This is Part 2 of the FoodFacts project, featuring multi-page routing, detailed product views, saved items management, and custom hooks.

## Features ✨

- **Multi-page Navigation** - React Router v6 with Home, Detail, and Saved Items pages
- **Product Search** - Real-time search with loading and error states
- **Product Details** - Full nutrition information with 8+ nutrients per product
- **Save Products** - Add/remove products from saved items with useReducer state management
- **Form Validation** - Client-side validation with user-friendly error messages
- **Custom Hooks** - `useFoodSearch` hook for reusable async logic
- **Error Handling** - Comprehensive error handling with user-facing messages
- **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
src/
├── pages/
│   ├── HomePage.jsx          # Search interface
│   ├── DetailPage.jsx        # Product details with save button
│   └── SavedPage.jsx         # View and manage saved products
├── components/
│   ├── NavBar.jsx            # Navigation with active links and badge
│   ├── SearchBar.jsx         # Search form with validation
│   ├── FoodCard.jsx          # Product card component
│   └── ErrorMessage.jsx      # Reusable error display
├── hooks/
│   └── useFoodSearch.js      # Custom hook for API calls
├── App.jsx                   # Router setup and useReducer state
├── App.css                   # All styling
└── main.jsx                  # React DOM entry point
```

## Installation

```bash
npm install
```

This will install:
- React 18.2.0
- React Router DOM 6.21.0
- Axios 1.6.2
- Vite 5.0.8

## Running the App

**Development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Key Concepts Implemented

### 1. **React Router v6**
- `<BrowserRouter>` wraps the app in `main.jsx`
- `<Routes>` and `<Route>` define pages
- `<NavLink>` for navigation with active state styling
- Dynamic route parameters: `/product/:barcode`

### 2. **useParams Hook**
```jsx
const { barcode } = useParams()  // Reads from URL
```
Used in DetailPage to fetch specific product data.

### 3. **useNavigate Hook**
```jsx
const navigate = useNavigate()
navigate(`/product/${code}`)  // Navigate to detail page
navigate(-1)                  // Go back one page
```

### 4. **Custom Hook: useFoodSearch**
```jsx
const { results, loading, error, searchFood } = useFoodSearch()
await searchFood('apple')
```
Encapsulates API logic with Axios, loading state, and error handling.

### 5. **useReducer for State Management**
```jsx
function savedReducer(state, action) {
  switch(action.type) {
    case 'ADD': return [...state, action.product]
    case 'REMOVE': return state.filter(p => p.code !== action.barcode)
  }
}
```
Manages saved items array in App.jsx, passed to Detail and Saved pages.

### 6. **useEffect Cleanup**
```jsx
useEffect(() => {
  let cancelled = false
  const fetch = async () => {
    const data = await axios.get(...)
    if (!cancelled) setData(data)
  }
  return () => { cancelled = true }
}, [barcode])
```
Prevents state updates on unmounted components.

### 7. **Axios for HTTP Requests**
- Automatic JSON parsing
- Better error handling than Fetch
- Cleaner API for query parameters

## Components Breakdown

### HomePage.jsx
- Uses `useFoodSearch` hook
- Renders SearchBar and displays results in a grid
- Shows loading spinner and error messages

### DetailPage.jsx
- Reads barcode from URL with `useParams`
- Fetches full product data on mount with `useEffect`
- Displays 8 nutrition values
- Save/Remove button toggles product in saved items
- Back button uses `navigate(-1)`

### SavedPage.jsx
- Displays all saved products in a grid
- Each item shows quick nutrition info
- View Details button navigates to detail page
- Remove button dispatches REMOVE action

### NavBar.jsx
- Shows Home and Saved Items links
- Active link highlighted with NavLink's `.active` class
- Badge shows count of saved items (hidden if 0)

## API Integration

### Open Food Facts API
The app uses the Open Food Facts API (free, public database):

**Search endpoint:**
```
GET https://world.openfoodfacts.org/cgi/search.pl
?search_terms=apple&page_size=20&json=1
```

**Product detail endpoint:**
```
GET https://world.openfoodfacts.org/api/v0/product/{barcode}.json
```

### ⚠️ CORS Issue in Browser

The Open Food Facts API doesn't allow direct browser requests (CORS policy). To work around this in development:

**Option 1: Use a CORS Proxy (Development Only)**
Update `useFoodSearch.js`:
```javascript
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
const response = await axios.get(CORS_PROXY + 'https://world.openfoodfacts.org/cgi/search.pl', ...)
```

**Option 2: Use a Backend Server (Recommended)**
Create a Node/Express backend that proxies requests:
```javascript
// backend/routes/search.js
app.get('/api/search', async (req, res) => {
  const data = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', ...)
  res.json(data)
})
```

**Option 3: Configure Vite Proxy**
In `vite.config.js`:
```javascript
export default {
  server: {
    proxy: {
      '/api/food': {
        target: 'https://world.openfoodfacts.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/food/, '/cgi/search.pl')
      }
    }
  }
}
```

## Form Validation

The SearchBar component includes validation:
- Minimum 2 characters required
- Trimmed input (no leading/trailing spaces)
- User-facing error messages
- Error cleared when valid input is submitted

## Styling

All styles are in `src/App.css`:
- Purple gradient background
- Responsive grid layout
- Smooth transitions and hover effects
- Mobile-friendly breakpoints
- Badge for saved count indicator

## Testing the App Flow

1. ✅ Navigate to `/` - see search page
2. ✅ Type "yogurt" - validation shows
3. ❌ Search fails due to CORS (see API section for fix)
4. ✅ Navigate to `/saved` - empty state shows
5. ✅ NavBar links work without page reload
6. ✅ URL changes when navigating

## Commits

```bash
git log --oneline
```

- `feat: setup project structure and dependencies`
- `feat: implement React Router with NavBar`
- `feat: add custom useFoodSearch hook and Axios`
- `feat: build DetailPage with useParams and cleanup`
- `feat: implement useReducer for saved items`
- `feat: add form validation and error handling`

## Git Branch

This work is on the `main` branch. To create Part 2 branch:
```bash
git checkout -b part2/routing-and-async
```

## Next Steps (Part 3)

- Redux Toolkit for global state
- Material UI for professional styling
- localStorage for persistence
- Deploy to Vercel/Netlify

## Resources

- [React Router Docs](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [Open Food Facts API](https://wiki.openfoodfacts.org/API)
- [React Hooks Documentation](https://react.dev/reference/react)

---

**Status**: ✅ Complete - All routing, components, and state management implemented. API integration needs CORS proxy solution.