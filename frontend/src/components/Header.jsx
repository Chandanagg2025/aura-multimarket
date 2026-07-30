import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const {
    activeSector, selectSector, goToHome,
    searchQuery, setSearchQuery,
    cart, wishlist,
    setIsCartOpen, setIsOrdersOpen
  } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="main-header">
      <div className="header-container">
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); goToHome(); }} title="Go to Sector Selection Home">
          <div className="logo-icon" style={{ background: 'white' }}>
            <img src="/logo.png" alt="Shree Pratham Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          <div className="logo-text">
            <span className="logo-name" style={{ fontSize: '1.25rem' }}>Shree Pratham</span>
          </div>
        </a>

        <nav className="sector-nav" aria-label="Sector Categories">
          <button className={`sector-tab ${activeSector === null ? 'active' : ''}`} onClick={goToHome}>
            <i className="fa-solid fa-house"></i> Home
          </button>
          <button className={`sector-tab ${activeSector === 'water' ? 'active' : ''}`} onClick={() => selectSector('water')}>
            <i className="fa-solid fa-droplet"></i> Water
          </button>
          <button className={`sector-tab ${activeSector === 'camera' ? 'active' : ''}`} onClick={() => selectSector('camera')}>
            <i className="fa-solid fa-camera"></i> Camera
          </button>
          <button className={`sector-tab ${activeSector === 'clothing' ? 'active' : ''}`} onClick={() => selectSector('clothing')}>
            <i className="fa-solid fa-shirt"></i> Clothing
          </button>
          <button className={`sector-tab ${activeSector === 'gifts' ? 'active' : ''}`} onClick={() => selectSector('gifts')}>
            <i className="fa-solid fa-gift"></i> Gift Gallery
          </button>
        </nav>

        <div className="header-actions">
          {activeSector && (
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                placeholder={`Search in ${activeSector}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', position: 'absolute', right: '12px' }}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          )}

          <button className="action-btn" title="My Orders" onClick={() => setIsOrdersOpen(true)}>
            <i className="fa-solid fa-box-archive"></i>
          </button>

          <button className="action-btn cart-btn-primary" onClick={() => setIsCartOpen(true)}>
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="cart-btn-label">Cart</span>
            <span className="badge cart-badge-highlight">{totalCartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
