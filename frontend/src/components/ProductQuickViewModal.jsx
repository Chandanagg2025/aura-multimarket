import React from 'react';
import { useStore } from '../context/StoreContext';

export default function ProductQuickViewModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();

  if (!selectedProduct) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', height: '340px', overflow: 'hidden' }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={`sector-badge ${selectedProduct.sector}`} style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>{selectedProduct.sectorName}</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#FFF', marginBottom: '10px' }}>{selectedProduct.name}</h2>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>{selectedProduct.description}</p>

            {selectedProduct.specs && selectedProduct.specs.length > 0 && (
              <ul style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '20px', listStyle: 'none' }}>
                {selectedProduct.specs.map((spec, i) => (
                  <li key={i} style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-primary)' }}></i> {spec}
                  </li>
                ))}
              </ul>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', color: '#FFF', display: 'block' }}>${selectedProduct.price.toFixed(2)}</span>
              </div>

              <button className="btn btn-primary" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                <i className="fa-solid fa-cart-plus"></i> Add to Cart Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
