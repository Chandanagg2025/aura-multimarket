import React from 'react';
import { useStore } from '../context/StoreContext';

const SECTORS_LIST = [
  {
    id: "water",
    name: "Water & Pure Hydration",
    tag: "PURITY & DISPENSING",
    desc: "Discover 9-stage RO purifiers, natural glacier spring water glass cases, hydrogen generators, and smart thermal bottles.",
    icon: "fa-droplet",
    color: "#0EA5E9",
    bgClass: "card-water",
    stats: "4 Products • RO & Alkaline",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "camera",
    name: "Cameras & Optical Precision",
    tag: "IMAGING & OPTICS",
    desc: "Explore 4K cinema mirrorless DSLRs, 5.3K waterproof action cams, 360° AI solar surveillance, and f/1.2 portrait prime lenses.",
    icon: "fa-camera",
    color: "#F43F5E",
    bgClass: "card-camera",
    stats: "4 Products • 4K & Cinema",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "clothing",
    name: "Urban Apparel & Fashion",
    tag: "LUXE FASHION",
    desc: "Browse 480GSM heavyweight organic cotton hoodies, graphic streetwear tees, 4-way stretch training joggers, and lambskin leather jackets.",
    icon: "fa-shirt",
    color: "#F59E0B",
    bgClass: "card-clothing",
    stats: "4 Products • Streetwear & Active",
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
    stats: "4 Products • Bespoke & Hampers",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
  }
];

export default function SectorLandingPage() {
  const { selectSector } = useStore();

  return (
    <div className="sector-landing-container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '60px 24px 80px', textAlign: 'center' }}>
      
      <div style={{ marginBottom: '50px' }}>
        <div className="sector-tag" style={{ margin: '0 auto 16px' }}>
          <i className="fa-solid fa-layer-group"></i> SELECT A SECTOR TO EXPLORE
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.2rem', fontWeight: '800', color: '#FFF', marginBottom: '16px', lineHeight: 1.15 }}>
          Welcome to <span style={{ background: 'linear-gradient(135deg, #FFF, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AURA Multi-Market</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
          Please select your preferred business sector below to browse dedicated categories, specialized catalog items, and secure checkout.
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
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '800', color: '#FFF', marginBottom: '10px' }}>
                {sector.name}
              </h2>
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

    </div>
  );
}
