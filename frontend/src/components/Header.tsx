import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Main">
        <div className="nav-left">
          <NavLink to="/" end className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>
            About
          </NavLink>
          {/* Industries istenmiyor */}
        </div>

        <Link to="/contact" className="contact-cta">
          <span>Contact</span>
          <span className="cta-arrow">↗</span>
        </Link>
      </nav>
    </header>
  )
}
