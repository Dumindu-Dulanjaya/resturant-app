import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="landing-footer">
    {/* CTA Banner */}
    <div className="footer-cta-banner">
      <img className="cta-shape-circle" src="/assets/images/shapes/white-circle.png" alt="shape" />
      <img className="cta-shape-dots" src="/assets/images/shapes/white-dots.png" alt="shape" />
      <img className="cta-shape-striped" src="/assets/images/shapes/white-dots-circle.png" alt="shape" />
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
            <Link to="/register" className="fcta-btn-primary">
              Register Now <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to="/about" className="fcta-btn-outline">
              Learn More <i className="fas fa-arrow-right"></i>
            </Link>
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
            <Link to="/">
              <img
                src="/assets/images/logos/logo-rmbg-2.png"
                alt="Anawuma"
                className="footer-logo"
              />
            </Link>

            <div className="footer-social">
              <a href="#facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
            
            {/* White dots grid behind logo area */}
            <img className="footer-shape shape-dots-white" src="/assets/images/shapes/white-dots.png" alt="" />
          </div>

          {/* Col 2: About */}
          <div className="footer-col">
            <h4 className="footer-col-title">About</h4>
            <ul className="footer-links">
              <li><Link to="/about">Company</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          {/* Col 4: Empty Title for alignment */}
          <div className="footer-col" style={{ paddingTop: '42px' }}>
            <ul className="footer-links">
              <li><Link to="/register">Register</Link></li>
            </ul>
            {/* Purple X shape above register */}
            <img className="footer-shape shape-purple-x" src="/assets/images/shapes/close.png" alt="" />
          </div>

          {/* Col 5: Contact info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Get in Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <i className="fas fa-map-marker-alt" style={{ color: '#2D7C7E' }}></i>
                No 16, Wewalwala Road, Bataganwila, Galle.
              </li>
              <li>
                <i className="fas fa-envelope" style={{ color: '#2D7C7E' }}></i>
                <a href="mailto:info@anawuma.com">info@anawuma.com</a>
              </li>
              <li>
                <i className="fas fa-phone-alt" style={{ color: '#2D7C7E' }}></i>
                Call : <a href="tel:+94777547239">(+94)777 547 239</a>
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

    {/* Background Decorative Shapes */}
    <div className="footer-bg-decor">
      <img className="footer-shape shape-striped-blue" src="/assets/images/shapes/dots-circle-half.png" alt="" />
      <img className="footer-shape shape-purple-triangle" src="/assets/images/shapes/tringle.png" alt="" />
      <img className="footer-shape shape-yellow-ring" src="/assets/images/shapes/circle.png" alt="" />
      <div className="footer-green-glow"></div>
    </div>
  </footer>
);

export default Footer;
