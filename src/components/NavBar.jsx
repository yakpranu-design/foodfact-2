import { NavLink } from 'react-router-dom'

function NavBar({ savedCount }) {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/saved">
            Saved Items
            {savedCount > 0 && <span className="badge">{savedCount}</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
