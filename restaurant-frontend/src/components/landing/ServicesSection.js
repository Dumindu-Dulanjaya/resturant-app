import React from 'react';
import './ServicesSection.css';

const services = [
  {
    icon: 'fas fa-qrcode',
    img: '/assets/images/services/Qr1.png',
    title: 'Digital QR Menu',
    desc: 'Allow customers to scan a QR code at their table for instant access to your full digital menu on their mobile phones.',
  },
  {
    icon: 'fas fa-tv',
    img: '/assets/images/services/kitchen_dash.png',
    title: 'Direct to Kitchen Dashboard',
    desc: 'Send confirmed orders straight to the kitchen screen with real-time alerts, ensuring chefs start cooking immediately.',
  },
  {
    icon: 'fas fa-edit',
    img: '/assets/images/services/order.png',
    title: 'Advanced Order Customization',
    desc: 'Let diners personalize their meals — adjusting spice levels or adding extra toppings directly within the app.',
  },
  {
    icon: 'fas fa-sync-alt',
    img: '/assets/images/services/status.png',
    title: 'Real-Time Status Updates',
    desc: 'Keep everyone in the loop. The system updates order progress in real-time, visible to both the customer and your staff.',
  },
  {
    icon: 'fas fa-bell',
    img: '/assets/images/services/alerts.png',
    title: 'Waiter Coordination Alerts',
    desc: 'Notify service staff instantly when an order is ready for pickup, minimizing food sitting time and ensuring faster delivery.',
  },
  {
    icon: 'fas fa-tag',
    img: '/assets/images/services/offer.png',
    title: 'Special Offers Management',
    desc: 'Create and manage pop-up special offers or discounts that appear directly on the guest\'s screen to drive upsells.',
  },
  {
    icon: 'fas fa-chart-line',
    img: '/assets/images/services/analytics-1.png',
    title: 'Business Analytics',
    desc: 'Track your restaurant\'s performance with data on daily and monthly sales reports, and popular dishes.',
  },
  {
    icon: 'fas fa-concierge-bell',
    img: '/assets/images/services/room.png',
    title: 'Room Service & Housekeeping',
    desc: 'Enable guests to request housekeeping services or room service orders directly through the specific Room QR code.',
  },
];

const ServicesSection = () => (
  <section className="services-section-landing" id="services">
    <div className="landing-container">
      <div className="services-heading-wrap">
        <span className="section-sub-label">Optimized Services for Your Success</span>
        <h2 className="services-heading">
          Everything you need to run a smarter, faster restaurant.
        </h2>
      </div>

      <div className="services-grid">
        {services.map((svc, i) => (
          <div className="service-card" key={i}>
            {/* Top-right icon badge */}
            <div className="svc-icon-badge">
              <i className={svc.icon}></i>
            </div>
            {/* Background image */}
            <img src={svc.img} alt={svc.title} className="svc-img" />
            {/* Default title overlay */}
            <div className="svc-title-badge">
              <h4>{svc.title}</h4>
            </div>
            {/* Hover description overlay */}
            <div className="svc-desc-overlay">
              <p>{svc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
