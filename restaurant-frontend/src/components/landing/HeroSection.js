import React, { useEffect, useRef } from 'react';
import './HeroSection.css';
import HeroImageShowcase from './HeroImageShowcase';

const HeroSection = () => {
  const orb1Ref = useRef(null);

  // Subtle parallax for background orb on mousemove
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orb1Ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orb1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section" id="home">
      {/* Background orb */}
      <div className="hero-bg-orb" ref={orb1Ref}></div>
      <div className="hero-bg-orb orb-2"></div>

      <div className="landing-container">
        <div className="hero-inner">
          {/* Left: Text Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨</span> QR-Powered Restaurant &amp; Hotel Solution
            </div>

            <h1 className="hero-title">
              <span className="brand-name">Anawuma</span>
              <br />
              The All in One QR Ordering &amp; Hospitality Management Platform
            </h1>

            <p className="hero-description">
              Transform guest experiences with lightning-fast QR code ordering, real-time menu
              updates, and intuitive operations — all in one system.
            </p>

            <div className="hero-ctas">
              <a href="/register" className="cta-primary">
                Start Free Trial <span className="cta-arrow">→</span>
                <span className="cta-ripple"></span>
              </a>
              <a href="#contact" className="cta-secondary">
                <i className="fas fa-play-circle"></i> Request a Demo
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Restaurants</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Orders</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right: Animated Hero Image */}
          <HeroImageShowcase />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
