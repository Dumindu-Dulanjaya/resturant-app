import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user } = useAuthStore();

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
          <Link to="/" className="landing-logo">
            <img src="/assets/images/logos/logo-rmbg-2.png" alt="Anawuma" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            <li><a href="/#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/#features" onClick={() => setMenuOpen(false)}>Features</a></li>
            <li><Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)} style={{ borderBottom: scrolled ? 'none' : '2px solid #2D7C7E' }}>Contact</Link></li>
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
                  <li><Link to="/dashboard">Restaurant Admin</Link></li>
                  <li><Link to="/super-admin/login">Super Admin</Link></li>
                  <li><Link to="/kitchen-login">Kitchen Login</Link></li>
                  <li><Link to="/cashier-login">Cashier Login</Link></li>
                  <li><Link to="/accountant-login">Accountant Login</Link></li>
                  <li><Link to="/housekeeper">HouseKeeper Login</Link></li>
                </ul>
              )}
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className={`nav-cta${menuOpen ? ' open' : ''}`}>
            {user ? (
              <div className="nav-user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/my-hotel" className="nav-restaurant-name" style={{ fontWeight: 600, color: '#2d7c7e' }}>
                  {user.restaurantName || 'My Hotel'}
                </Link>
                <div className="nav-user-avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-user" style={{ fontSize: '14px', color: '#666' }}></i>
                </div>
              </div>
            ) : (
              <>
                <Link to="/register" className="nav-link-register">
                  Register Restaurant <i className="fas fa-arrow-right"></i>
                </Link>
                <Link to="/login" className="nav-btn-login">
                  Restaurant Login <i className="fas fa-lock" style={{ marginLeft: '6px', fontSize: '12px' }}></i>
                </Link>
              </>
            )}
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
