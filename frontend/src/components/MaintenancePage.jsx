import React, { useState, useEffect } from 'react';

export default function MaintenancePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="maintenance-wrapper">
      {/* Background Animated Glow Spheres */}
      <div className="maintenance-glow glow-1"></div>
      <div className="maintenance-glow glow-2"></div>
      <div className="maintenance-glow glow-3"></div>

      {/* Top Banner Bar */}
      <div className="maintenance-topbar">
        <div className="brand-badge">
          <div className="logo-icon-small">
            <i className="fa-solid fa-gem"></i>
          </div>
          <span className="brand-title">SHREE PRATHAM MULTI-MARKET</span>
        </div>
      </div>

      <div className="maintenance-container">
        {/* Status Badge */}
        <div className="status-pill">
          <span className="pulse-dot"></span>
          <span className="status-text">SCHEDULED SYSTEM UPGRADE IN PROGRESS</span>
        </div>

        {/* Hero Title */}
        <h1 className="maintenance-title">
          We’re Upgrading Your <br />
          <span className="gradient-text">Quad-Sector Shopping Experience</span>
        </h1>

        <p className="maintenance-subtitle">
          Shree Pratham Multi-Market is currently undergoing scheduled platform maintenance and security enhancements. We’ll be back online with enhanced speeds and new inventory very soon!
        </p>

        {/* Live Countdown Clock */}
        <div className="countdown-box">
          <div className="countdown-header">
            <i className="fa-solid fa-clock"></i> ESTIMATED TIME TO GO LIVE
          </div>
          <div className="countdown-grid">
            <div className="count-unit">
              <span className="count-num">00</span>
              <span className="count-label">DAYS</span>
            </div>
            <div className="count-colon">:</div>
            <div className="count-unit">
              <span className="count-num">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="count-label">HOURS</span>
            </div>
            <div className="count-colon">:</div>
            <div className="count-unit">
              <span className="count-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="count-label">MINUTES</span>
            </div>
            <div className="count-colon">:</div>
            <div className="count-unit count-accent">
              <span className="count-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="count-label">SECONDS</span>
            </div>
          </div>
        </div>

        {/* Progress Breakdown Cards */}
        <div className="progress-section">
          <h3 className="section-heading"><i className="fa-solid fa-bars-progress"></i> Upgrade Status Breakdown</h3>
          <div className="progress-grid">
            <div className="progress-card">
              <div className="progress-info">
                <span className="progress-title"><i className="fa-solid fa-server"></i> Server Infrastructure Optimization</span>
                <span className="progress-pct">92%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-fill" style={{ width: '92%', background: 'linear-gradient(90deg, #6366F1, #818CF8)' }}></div>
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-info">
                <span className="progress-title"><i className="fa-solid fa-shield-halved"></i> Payment Gateway Security Patching</span>
                <span className="progress-pct">85%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-fill" style={{ width: '85%', background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)' }}></div>
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-info">
                <span className="progress-title"><i className="fa-solid fa-boxes-packing"></i> Multi-Sector Catalog Refresh</span>
                <span className="progress-pct">96%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-fill" style={{ width: '96%', background: 'linear-gradient(90deg, #10B981, #34D399)' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sector Previews Bar */}
        <div className="sectors-preview">
          <div className="sector-tag water"><i className="fa-solid fa-droplet"></i> Premium Water</div>
          <div className="sector-tag camera"><i className="fa-solid fa-camera"></i> Camera Gear</div>
          <div className="sector-tag clothing"><i className="fa-solid fa-shirt"></i> Urban Clothing</div>
          <div className="sector-tag gifts"><i className="fa-solid fa-gift"></i> Bespoke Gifts</div>
        </div>

        {/* Notify Me Form */}
        <div className="notify-card">
          {subscribed ? (
            <div className="notify-success">
              <i className="fa-solid fa-circle-check success-icon"></i>
              <div>
                <h4>You're on the priority list!</h4>
                <p>We will send an immediate alert to your email the moment servers are live.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="notify-form">
              <div className="notify-input-group">
                <i className="fa-solid fa-envelope input-icon"></i>
                <input 
                  type="email" 
                  placeholder="Enter your email for instant launch notification..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="notify-input"
                />
                <button type="submit" className="notify-btn">
                  Notify Me <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact & Support Footer */}
        <div className="maintenance-footer">
          <p>Need urgent assistance with an existing order?</p>
          <div className="contact-links">
            <a href="mailto:support@shreepratham.com" className="contact-item">
              <i className="fa-solid fa-envelope"></i> support@shreepratham.com
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="contact-item">
              <i className="fa-brands fa-whatsapp"></i> Live Support Chat
            </a>
            <a href="tel:+919876543210" className="contact-item">
              <i className="fa-solid fa-phone"></i> +91 98765 43210
            </a>
          </div>
          <div className="copyright-line">
            &copy; 2026 Shree Pratham Multi-Market Inc. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
