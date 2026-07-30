import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { sendContactInquiry } from '../api/client';

const SECTORS_LIST = [
  {
    id: "water",
    name: "Water & Pure Hydration",
    tag: "PURITY & DISPENSING",
    desc: "Discover 9-stage RO purifiers, natural glacier spring water glass cases, hydrogen generators, and smart thermal bottles.",
    icon: "fa-droplet",
    color: "#0EA5E9",
    bgClass: "card-water",
    stats: "9 Products • RO & Alkaline",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "camera",
    name: "Cameras & CCTV Protection",
    tag: "CCTV SURVEILLANCE",
    desc: "Explore motorized PTZ 360 dome cameras, smart AI bullet systems, compact indoor cameras, and panoramic dual-screen CCTV setups.",
    icon: "fa-camera",
    color: "#F43F5E",
    bgClass: "card-camera",
    stats: "4 Products • CCTV Security",
    image: "https://images.unsplash.com/photo-1557597774-9d2736f5dfa7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "clothing",
    name: "Urban Apparel & Fashion",
    tag: "LUXE FASHION",
    desc: "Browse 480GSM heavyweight organic cotton hoodies, graphic streetwear tees, 4-way stretch training joggers, and lambskin leather jackets.",
    icon: "fa-shirt",
    color: "#F59E0B",
    bgClass: "card-clothing",
    stats: "8 Products • Streetwear & Active",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "gifts",
    name: "Gift Gallery & Curations",
    tag: "ARTISAN KEEPSAKES",
    desc: "Find royal champagne gourmet hampers, 3D laser engraved crystal memory orbs, botanical soy candle sets, and 24K gold executive pens.",
    icon: "fa-gift",
    color: "#10B981",
    bgClass: "card-gifts",
    stats: "8 Products • Bespoke & Hampers",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
  }
];

const BANNERS_LIST = [
  {
    id: "water_1",
    sectorId: "water",
    title: "Hydro-Pure 9S Smart RO",
    subtitle: "Advanced 9-stage alkaline purification providing pristine, mineral-rich drinking water for modern households.",
    image: "https://images.unsplash.com/photo-1585832770485-e386d4000911?auto=format&fit=crop&w=1200&q=80",
    color: "#0EA5E9",
    tag: "PURITY & DISPENSING"
  },
  {
    id: "water_2",
    sectorId: "water",
    title: "Glacier-Spring Cases",
    subtitle: "Naturally structured pure glacier spring water delivered in reusable eco-friendly hand-blown glass cases.",
    image: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=1200&q=80",
    color: "#0EA5E9",
    tag: "PURE HYDRATION"
  },
  {
    id: "camera_1",
    sectorId: "camera",
    title: "Shree Pratham PTZ Dome 360",
    subtitle: "High-security motorized pan & tilt dome camera with 1080p live streams, intercom, and active warning light sirens.",
    image: "https://images.unsplash.com/photo-1557597774-9d2736f5dfa7?auto=format&fit=crop&w=1200&q=80",
    color: "#F43F5E",
    tag: "CCTV & PTZ SURVEILLANCE"
  },
  {
    id: "camera_2",
    sectorId: "camera",
    title: "Smart AI Bullet CCTV Systems",
    subtitle: "Rugged weatherproof bullet cameras with smart human/vehicle alert filters and color night spotlight tracking.",
    image: "https://images.unsplash.com/photo-1524338198850-8a2ff63a6b5f?auto=format&fit=crop&w=1200&q=80",
    color: "#F43F5E",
    tag: "AI BULLET CAMERAS"
  },
  {
    id: "clothing_1",
    sectorId: "clothing",
    title: "Heavyweight 480GSM Hoodies",
    subtitle: "Luxurious organic cotton fabrics and drop-shoulder silhouettes designed for comfort, longevity, and streetwear statement.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
    color: "#F59E0B",
    tag: "URBAN STREETWEAR"
  },
  {
    id: "clothing_2",
    sectorId: "clothing",
    title: "Nero Biker Leather Jackets",
    subtitle: "Handcrafted top-grain lambskin leather jackets tailored with precision utility pockets and premium zippers.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
    color: "#F59E0B",
    tag: "LUXE FASHION"
  },
  {
    id: "gifts_1",
    sectorId: "gifts",
    title: "Royal Champagne Hampers",
    subtitle: "Curated selections of fine vintage champagne, organic caviar, and artisan delicacies for executive celebrations.",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=80",
    color: "#10B981",
    tag: "ARTISAN KEEPSAKES"
  },
  {
    id: "gifts_2",
    sectorId: "gifts",
    title: "Laser-Engraved Crystal Orbs",
    subtitle: "Exquisite sub-surface micro-laser etched crystal memory orbs that refract light into beautiful memories.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80",
    color: "#10B981",
    tag: "GIFT CURATIONS"
  }
];

export default function SectorLandingPage() {
  const { selectSector, showToast } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    sector: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Carousel Auto-slide logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BANNERS_LIST.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % BANNERS_LIST.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + BANNERS_LIST.length) % BANNERS_LIST.length);
  };

  // Contact Form Handlers
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message content is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please correct the form errors.", "danger");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await sendContactInquiry(formData);
      if (res.success) {
        setIsSuccess(true);
        showToast("Support transmission successful!", "success");
        setFormData({
          name: '',
          email: '',
          subject: '',
          sector: '',
          message: ''
        });
      } else {
        showToast(res.error || "Inquiry transmission failed", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Network failure connecting to support server", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <div className="sector-landing-container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 24px 80px' }}>
      
      {/* SECTION 1: SECTOR BANNERS CAROUSEL */}
      <section 
        className="banners-carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {BANNERS_LIST.map((banner, index) => (
          <div 
            key={banner.id}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={banner.image} alt={banner.title} className="banner-image-bg" />
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <div 
                className="sector-tag" 
                style={{ 
                  color: banner.color, 
                  borderColor: banner.color,
                  alignSelf: 'flex-start',
                  background: 'rgba(15, 23, 42, 0.65)'
                }}
              >
                <i className={`fa-solid ${
                  banner.sectorId === 'water' ? 'fa-droplet' :
                  banner.sectorId === 'camera' ? 'fa-camera' :
                  banner.sectorId === 'clothing' ? 'fa-shirt' : 'fa-gift'
                }`}></i> {banner.tag}
              </div>
              <h1 className="banner-title">{banner.title}</h1>
              <p className="banner-description">{banner.subtitle}</p>
              <button 
                className="btn btn-primary" 
                style={{ background: banner.color, border: 'none', alignSelf: 'flex-start' }}
                onClick={() => selectSector(banner.sectorId)}
              >
                Explore Sector <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <div className="carousel-arrows">
          <button className="carousel-arrow" onClick={prevSlide} aria-label="Previous Slide">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow" onClick={nextSlide} aria-label="Next Slide">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        
        {/* Navigation Dots */}
        <div className="carousel-dots">
          {BANNERS_LIST.map((_, index) => (
            <button 
              key={index} 
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* SECTION 2: EXPLORE SECTORS */}
      <section style={{ marginBottom: '80px', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <div className="sector-tag" style={{ margin: '0 auto 16px' }}>
            <i className="fa-solid fa-layer-group"></i> OUR ACTIVE DEPARTMENTS
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: '#FFF', marginBottom: '16px' }}>
            Explore Curated Markets
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto' }}>
            Select one of Shree Pratham's core business departments below to browse targeted collections, specialized filter criteria, and secure payment processing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {SECTORS_LIST.map(sector => (
            <div 
              key={sector.id} 
              className={`product-card ${sector.bgClass}`} 
              onClick={() => selectSector(sector.id)}
              style={{ 
                cursor: 'pointer', 
                textAlign: 'left', 
                padding: '24px', 
                background: 'var(--bg-card)', 
                border: `1px solid var(--border-color)`,
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ position: 'relative', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px' }}>
                <img src={sector.image} alt={sector.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '700', color: sector.color }}>
                  <i className={`fa-solid ${sector.icon}`}></i> {sector.tag}
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '800', color: '#FFF', marginBottom: '10px' }}>
                  {sector.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: 1.5 }}>
                  {sector.desc}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>{sector.stats}</span>
                <button className="btn btn-primary" style={{ background: sector.color, border: 'none', padding: '10px 20px', fontSize: '0.88rem' }}>
                  Explore Sector <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: BRAND HIGHLIGHTS BANNER BAR */}
      <section style={{ margin: '60px 0 20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '30px 24px', backdropFilter: 'blur(16px)', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontSize: '1.4rem', flexShrink: 0 }}>
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h4 style={{ color: '#FFF', fontSize: '0.98rem', fontWeight: 800 }}>Express 24-Hr Logistics</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Priority dispatch across all sectors</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '1.4rem', flexShrink: 0 }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h4 style={{ color: '#FFF', fontSize: '0.98rem', fontWeight: 800 }}>Authentic Guarantee</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>100% verified serials & warranty</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '1.4rem', flexShrink: 0 }}>
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <h4 style={{ color: '#FFF', fontSize: '0.98rem', fontWeight: 800 }}>Concierge Support</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Dedicated 24/7 sector assistance</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-md)', background: 'rgba(14, 165, 233, 0.12)', border: '1px solid rgba(14, 165, 233, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0EA5E9', fontSize: '1.4rem', flexShrink: 0 }}>
              <i className="fa-solid fa-lock"></i>
            </div>
            <div>
              <h4 style={{ color: '#FFF', fontSize: '0.98rem', fontWeight: 800 }}>Encrypted Gateway</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Secure UPI, Card & Bank checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT US */}
      <section className="about-section">
        <div className="about-grid">
          <div>
            <div className="about-tagline">
              <i className="fa-solid fa-gem"></i> THE SHREE PRATHAM MISSION
            </div>
            <h2 className="about-title">
              Crafting Premium Commerce Across Quad Sectors
            </h2>
            <p className="about-desc">
              Established in 2026, Shree Pratham Multi-Market is built on a custom, high-fidelity quad-sector commerce architecture designed to bridge different aspects of premium consumer lifestyles. We focus on providing highly specialized product selections under a single integrated checkout experience.
            </p>
            <p className="about-desc" style={{ marginTop: '-15px' }}>
              Whether you are looking for advanced molecular water purifiers, studio-grade imaging equipment, organic streetwear garments, or highly personalized luxury gifts, Shree Pratham guarantees strict quality benchmarks, global express logistics, and an unmatched digital interface.
            </p>
            
            <div className="about-metrics">
              <div className="metric-card">
                <div className="metric-number">99.9%</div>
                <div className="metric-label">Water Filtration Purity</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">f/1.2</div>
                <div className="metric-label">Optical Aperture Standard</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">480g</div>
                <div className="metric-label">Organic Cotton GSM</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">100%</div>
                <div className="metric-label">Bespoke Gift Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
              alt="Shree Pratham Headquarters Architecture" 
            />
            <div className="about-image-overlay"></div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT US */}
      <section className="contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="about-tagline">
              <i className="fa-solid fa-envelope"></i> CONTACT SUPPORT
            </div>
            <h2 className="about-title">Get In Touch With Shree Pratham</h2>
            <p className="about-desc">
              Have questions about our quad-sector catalog, order logistics, custom dimensions, or retail operations? Drop us a line. Our dedicated support team is available 24/7.
            </p>
            
            <div className="contact-card-list">
              <div className="contact-info-card">
                <i className="fa-solid fa-location-dot"></i>
                <div className="contact-info-detail">
                  <h4>Global Headquarters</h4>
                  <p>750 Neon Boulevard, Sector 9, Cyber District</p>
                </div>
              </div>
              <div className="contact-info-card">
                <i className="fa-solid fa-phone"></i>
                <div className="contact-info-detail">
                  <h4>Concierge Phone</h4>
                  <p>+91 1800-120-74733</p>
                </div>
              </div>
              <div className="contact-info-card">
                <i className="fa-solid fa-envelope-open-text"></i>
                <div className="contact-info-detail">
                  <h4>Support Mail</h4>
                  <p>concierge@shreepratham.in</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-card">
            {isSuccess ? (
              <div className="contact-success-card">
                <div className="success-icon-circle">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#FFF', marginBottom: '10px' }}>
                  Message Transmitted!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '320px' }}>
                  Your secure support ticket has been registered. A Shree Pratham sector specialist will reach out within 4 hours.
                </p>
                <button className="btn btn-secondary" onClick={resetForm}>
                  Send Another Message <i className="fa-solid fa-arrow-rotate-left"></i>
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      className="form-input" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    {errors.name && <span className="contact-error-msg">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      className="form-input" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                    {errors.email && <span className="contact-error-msg">{errors.email}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <input 
                      type="text" 
                      id="contact-subject" 
                      className="form-input" 
                      placeholder="Order Inquiry / Support"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    />
                    {errors.subject && <span className="contact-error-msg">{errors.subject}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contact-sector">Sector Interest</label>
                    <select 
                      id="contact-sector" 
                      className="form-input"
                      value={formData.sector}
                      onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
                      style={{ height: '45px', WebkitAppearance: 'none', appearance: 'none', paddingRight: '36px' }}
                    >
                      <option value="">General Support / Inquiry</option>
                      <option value="water">Water & Pure Hydration</option>
                      <option value="camera">Cameras & Optical Precision</option>
                      <option value="clothing">Urban Apparel & Fashion</option>
                      <option value="gifts">Gift Gallery & Curations</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea 
                    id="contact-message" 
                    className="form-input form-textarea" 
                    placeholder="Describe your inquiry in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  ></textarea>
                  {errors.message && <span className="contact-error-msg">{errors.message}</span>}
                </div>
                
                <button 
                  type="submit" 
                  className="btn contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i> Transmission...
                    </>
                  ) : (
                    <>
                      Send Message <i className="fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
