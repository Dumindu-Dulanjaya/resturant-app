import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="landing-footer">
    {/* CTA Banner */}
    <div className="footer-cta-banner">
      <span className="fcta-dot" aria-hidden="true"></span>
      <div className="landing-container">
        <div className="fcta-inner">
          <div className="fcta-text">
            <h2>Ready to Enhance Your Hospitality Business?</h2>
            <p>
              Contact us today to learn more about Anawuma and how it can revolutionize the way you
              serve your guests.
            </p>
          </div>
          <div className="fcta-btns">
            <a href="/register" className="fcta-btn-primary">
              Register Now <i className="fas fa-arrow-right"></i>
            </a>
            <a href="/about" className="fcta-btn-outline">
              Learn More <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Body */}
    <div className="footer-body">
      <div className="landing-container">
        <div className="footer-grid">
          {/* Col 1: Logo + Social */}
          <div className="footer-col logo-col">
            <a href="/">
              <img
                src="/assets/images/logos/logo-rmbg-2.png"
                alt="Anawuma"
                className="footer-logo"
              />
            </a>
            <p className="footer-logo-desc">
              Anawuma is a smart hospitality platform helping restaurants and hotels streamline orders, menus, and guest experiences.
            </p>
            <div className="footer-social">
              <a href="#facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Col 2: About */}
          <div className="footer-col">
            <h4 className="footer-col-title">About</h4>
            <ul className="footer-links">
              <li><a href="/about">Company</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Get in Touch</h4>
            <ul className="footer-contact-list">
              <li><i className="fas fa-globe"></i> Scandinavian Office</li>
              <li><i className="fas fa-map-marker-alt"></i> 15, Dr Waalers Gata, Hamar 2321</li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+46700236926">+46 700 236 926</a>
              </li>
            </ul>
            <ul className="footer-contact-list" style={{ marginTop: '14px' }}>
              <li><i className="fas fa-globe"></i> Australia Office</li>
              <li><i className="fas fa-map-marker-alt"></i> 15, Manuka Street, Constitution Hill, NSW 2145</li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+61434502385">+61 434 502 385</a>
              </li>
            </ul>
            <ul className="footer-contact-list" style={{ marginTop: '14px' }}>
              <li><i className="fas fa-home"></i> Head Office — Sri Lanka</li>
              <li><i className="fas fa-map-marker-alt"></i> No 16, Wewalwala Road, Bataganwila, Galle</li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+94777547239">+94 777 547 239</a>
              </li>
              <li>
                <i className="fas fa-envelope-open"></i>
                <a href="mailto:info@anawuma.com">info@anawuma.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <a href="http://knowebsolutions.com" target="_blank" rel="noopener noreferrer">
              Knoweb (PVT) LTD.
            </a>{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
