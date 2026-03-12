import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`landing-header${scrolled ? ' scrolled' : ''}`}>
      <div className="landing-container">
        <nav className="landing-nav">
          {/* Logo */}
          <a href="/" className="landing-logo">
            <img src="/assets/images/logos/logo-rmbg-2.png" alt="Anawuma" />
          </a>

          {/* Desktop Nav Links */}
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
            <li><a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#blog" onClick={() => setMenuOpen(false)}>Blogs</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            <li
              className="dropdown-parent"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <a href="#more" onClick={(e) => e.preventDefault()}>
                More <i className="fas fa-chevron-down"></i>
              </a>
              {moreOpen && (
                <ul className="dropdown-menu-custom">
                  <li><a href="/dashboard">Restaurant Admin</a></li>
                  <li><a href="/super-admin">Super Admin</a></li>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/steward">Steward Login</a></li>
                  <li><a href="/housekeeper">HouseKeeper Login</a></li>
                </ul>
              )}
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className={`nav-cta${menuOpen ? ' open' : ''}`}>
            <a href="/register" className="btn-register">
              Register Restaurant <i className="fas fa-arrow-right"></i>
            </a>
            <a href="/login" className="btn-login">
              Restaurant Login <span>&#128274;</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
