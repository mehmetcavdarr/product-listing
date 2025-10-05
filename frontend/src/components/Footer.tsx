import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Sol blok: logo + motto + adresler */}
        <div className="footer-left">
          <div className="brand">renart</div>
          <div className="tagline">Rethink Retail</div>

          <div className="addresses">
            <div className="addr">
              <div className="addr-title">Renart HQ</div>
              <div className="addr-text">Aytar Caddesi Fecri Ebcioğlu Sk. No:4 D:1 Levent İstanbul</div>
            </div>
            <div className="addr">
              <div className="addr-title">Renart Studio & Hub</div>
              <div className="addr-text">Dudullu OSB İmes A/102 Sk. No:1 İstanbul</div>
            </div>
            <div className="addr">
              <div className="addr-title">Renart New York Office</div>
              <div className="addr-text">66 W 47th St, MZ-19, New York NY, 10036 USA</div>
            </div>
          </div>
        </div>

        {/* Orta: menü linkleri */}
        <nav className="footer-nav" aria-label="Footer">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Sağ: sosyal ikonlar */}
        <div className="footer-social">
          <a
            href="https://www.instagram.com/renartglobal"
            target="_blank" rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-btn"
          >
            {/* instagram icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/renartglobal/"
            target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-btn"
          >
            {/* linkedin icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.1c.6-1.1 2.1-2.2 4.3-2.2 4.6 0 5.4 3 5.4 6.8V24h-5V15.9c0-1.9 0-4.4-2.7-4.4s-3.1 2.1-3.1 4.3V24h-5V8z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
