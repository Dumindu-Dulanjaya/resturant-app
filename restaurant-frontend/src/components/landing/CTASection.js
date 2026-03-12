import React from 'react';
import './CTASection.css';

const CTASection = () => (
  <section className="cta-section" id="contact">
    <div className="landing-container">
      <div className="cta-inner">
        {/* Left */}
        <div className="cta-text">
          <h2 className="cta-heading">Get in Touch with Anawuma</h2>
          <p className="cta-body">
            Whether you're a small café, a busy restaurant, or a multi-floor hotel — we have a plan
            tailored for you. Our team is ready to walk you through everything and get you set up
            fast.
          </p>
          <a href="/contact" className="cta-link-btn">
            For Custom Developments <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        {/* Right */}
        <div className="cta-img-wrap">
          <img
            src="/assets/images/contacts/contact-us.png"
            alt="Contact Anawuma"
            className="cta-img"
          />
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
