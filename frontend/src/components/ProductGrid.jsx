import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { 
    products, loading, 
    activeSubCategory, setActiveSubCategory, 
    sortBy, setSortBy, 
    resetFilters 
  } = useStore();

  const subCategories = ['all', ...new Set(products.map(p => p.subCategory))];

  return (
    <main className="main-content">
      <div className="content-container">
        <div className="catalog-toolbar">
          <div>
            <h2 className="section-title">Catalog Collection</h2>
            <span className="count-badge">Showing {products.length} products</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="sub-category-pills">
              {subCategories.map(sub => (
                <button
                  key={sub}
                  className={`pill-btn ${activeSubCategory === sub ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory(sub)}
                >
                  {sub.charAt(0).toUpperCase() + sub.slice(1)}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><i className="fa-solid fa-arrow-down-short-wide"></i> Sort:</label>
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', marginBottom: '16px' }}></i>
            <p>Loading catalog from SQLite database...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '130px', height: '130px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '18px', boxShadow: 'var(--shadow-lg)' }}>
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80" alt="No Products Found" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', marginBottom: '6px' }}>No Products Found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '360px', lineHeight: 1.5 }}>Try adjusting your search criteria, clearing search keywords, or switching subcategory filters.</p>
            <button className="btn btn-primary" onClick={resetFilters}>
              Reset All Filters <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
