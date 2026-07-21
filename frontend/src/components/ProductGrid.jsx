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
          <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
            <i className="fa-solid fa-magnifying-glass-minus" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '14px' }}></i>
            <h3>No products found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Try resetting your sector filters or search keywords.</p>
            <button className="btn btn-primary" onClick={resetFilters}>Reset All Filters</button>
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
