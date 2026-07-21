import React from 'react';
import { useStore } from '../context/StoreContext';

const SECTOR_INFO = {
  water: {
    title: "💧 Water & Pure Hydration Sector",
    tag: "PURITY & DISPENSING",
    desc: "Explore 9-stage RO purifiers, natural glacier spring water, hydrogen generators, and smart thermal bottles."
  },
  camera: {
    title: "📷 Cameras & Optical Precision Sector",
    tag: "IMAGING & OPTICS",
    desc: "4K cinema mirrorless cameras, extreme action shooters, AI solar surveillance, and high-aperture prime lenses."
  },
  clothing: {
    title: "👕 Urban Apparel & Fashion Sector",
    tag: "LUXE FASHION",
    desc: "Heavyweight organic hoodies, oversized designer graphics, high-performance training wear, and lambskin leather."
  },
  gifts: {
    title: "🎁 Gift Gallery & Bespoke Collections",
    tag: "ARTISAN CURATIONS",
    desc: "Royal gourmet hampers, 3D laser engraved crystal keepsakes, aromatherapy soy candles, and gold executive pens."
  }
};

export default function HeroSection() {
  const { activeSector, selectSector } = useStore();
  
  if (!activeSector) return null;

  const info = SECTOR_INFO[activeSector] || SECTOR_INFO.water;

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="sector-tag">
            <i className="fa-solid fa-sparkles"></i> {info.tag}
          </div>
          <h1 className="hero-title">{info.title}</h1>
          <p className="hero-description">{info.desc}</p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={() => document.querySelector('.main-content')?.scrollIntoView({ behavior: 'smooth' })}>
              Browse Category Items <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className={`hero-mini-card card-water ${activeSector === 'water' ? 'active' : ''}`} onClick={() => selectSector('water')}>
              <div className="mini-icon"><i className="fa-solid fa-droplet"></i></div>
              <div><h4>Water Sector</h4><p>Alkaline & RO Purifiers</p></div>
            </div>

            <div className={`hero-mini-card card-camera ${activeSector === 'camera' ? 'active' : ''}`} onClick={() => selectSector('camera')}>
              <div className="mini-icon"><i className="fa-solid fa-camera"></i></div>
              <div><h4>Camera Sector</h4><p>4K Optics & Security</p></div>
            </div>

            <div className={`hero-mini-card card-clothing ${activeSector === 'clothing' ? 'active' : ''}`} onClick={() => selectSector('clothing')}>
              <div className="mini-icon"><i className="fa-solid fa-shirt"></i></div>
              <div><h4>Clothing Sector</h4><p>Urban Fashion & Activewear</p></div>
            </div>

            <div className={`hero-mini-card card-gifts ${activeSector === 'gifts' ? 'active' : ''}`} onClick={() => selectSector('gifts')}>
              <div className="mini-icon"><i className="fa-solid fa-gift"></i></div>
              <div><h4>Gift Gallery</h4><p>Artisan Keepsakes & Sets</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
