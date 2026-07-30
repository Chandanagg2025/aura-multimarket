import React from 'react';
import { useStore } from '../context/StoreContext';

const SECTOR_INFO = {
  water: {
    title: "💧 Water & Pure Hydration Sector",
    tag: "PURITY & DISPENSING",
    desc: "Explore 9-stage RO purifiers, natural glacier spring water, hydrogen generators, and smart thermal bottles.",
    bannerImage: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80",
    featuredImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    badge: "9-Stage RO & Mineralization"
  },
  camera: {
    title: "📷 Cameras & Optical Precision Sector",
    tag: "IMAGING & OPTICS",
    desc: "4K cinema mirrorless cameras, extreme action shooters, AI solar surveillance, and high-aperture prime lenses.",
    bannerImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    featuredImage: "https://images.unsplash.com/photo-1557597774-9d2736f5dfa7?auto=format&fit=crop&w=600&q=80",
    badge: "8K Cinema & 360° PTZ CCTV"
  },
  clothing: {
    title: "👕 Urban Apparel & Fashion Sector",
    tag: "LUXE FASHION",
    desc: "Heavyweight organic hoodies, oversized designer graphics, high-performance training wear, and lambskin leather.",
    bannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    featuredImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    badge: "480 GSM Cotton & Lambskin"
  },
  gifts: {
    title: "🎁 Gift Gallery & Bespoke Collections",
    tag: "ARTISAN CURATIONS",
    desc: "Royal gourmet hampers, 3D laser engraved crystal keepsakes, aromatherapy soy candles, and gold executive pens.",
    bannerImage: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=80",
    featuredImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    badge: "Bespoke Hampers & Crystal Orbs"
  }
};

export default function HeroSection() {
  const { activeSector, selectSector } = useStore();
  
  if (!activeSector) return null;

  const info = SECTOR_INFO[activeSector] || SECTOR_INFO.water;

  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '360px', display: 'flex', alignItems: 'center' }}>
      {/* Background Banner Image with Overlay */}
      <img 
        src={info.bannerImage} 
        alt={info.title} 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)', zIndex: 0 }} 
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,15,25,0.95) 30%, rgba(11,15,25,0.7) 100%)', zIndex: 1 }}></div>

      <div className="hero-container" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '40px 24px' }}>
        <div className="hero-content">
          <div className="sector-tag" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.2)' }}>
            <i className="fa-solid fa-sparkles"></i> {info.tag}
          </div>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)', marginTop: '8px' }}>{info.title}</h1>
          <p className="hero-description" style={{ color: '#E2E8F0', fontSize: '1.02rem', maxWidth: '650px', marginTop: '10px' }}>{info.desc}</p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={() => document.querySelector('.main-content')?.scrollIntoView({ behavior: 'smooth' })}>
              Browse Sector Items <i className="fa-solid fa-arrow-down"></i>
            </button>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.85rem', color: '#FFF', fontWeight: 600 }}>
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-primary)' }}></i> {info.badge}
            </span>
          </div>
        </div>

        <div className="hero-visual" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* Featured Spotlight Card */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '340px', height: '210px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'var(--shadow-lg)' }}>
            <img src={info.featuredImage} alt={info.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,15,25,0.92) 0%, transparent 60%)' }}></div>
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sector Spotlight</span>
                <h4 style={{ color: '#FFF', fontSize: '1rem', fontWeight: 800 }}>{info.tag}</h4>
              </div>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justify: 'center', color: '#FFF' }}>
                <i className="fa-solid fa-arrow-down" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
