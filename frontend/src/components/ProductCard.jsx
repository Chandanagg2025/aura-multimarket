import React from 'react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart, setSelectedProduct } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const getStarRatingHTML = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(full)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
        {half && <i className="fa-solid fa-star-half-stroke"></i>}
      </>
    );
  };

  return (
    <div className="product-card">
      <div className="product-badge-group">
        <span className={`sector-badge ${product.sector}`}>{product.sectorName}</span>
        {product.badge && <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: '700', color: '#FFF' }}>{product.badge}</span>}
      </div>

      <button className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`} onClick={() => toggleWishlist(product.id)}>
        <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart`}></i>
      </button>

      <div className="product-img-wrapper" onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-info">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{product.subCategory}</span>
        <h3 className="product-title" onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>{product.name}</h3>

        <div className="product-rating">
          {getStarRatingHTML(product.rating)}
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({product.reviewsCount})</span>
        </div>

        <div className="product-bottom-row">
          <div>
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>${product.originalPrice.toFixed(2)}</span>}
          </div>

          <button className="btn btn-primary" onClick={() => addToCart(product)} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <i className="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  );
}
