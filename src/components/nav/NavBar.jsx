import { Link, useNavigate } from "react-router-dom"
import "./nav.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/">All Posts</Link>
      </li>
      {localStorage.getItem("learning_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user")
              navigate("/login", { replace: true })
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </nav>
  )
}