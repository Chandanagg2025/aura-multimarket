import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const { 
    cart, isCartOpen, setIsCartOpen, 
    updateCartQuantity, removeFromCart, 
    appliedCoupon, applyCoupon, 
    setIsCheckoutOpen 
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (appliedCoupon && appliedCoupon.type === 'percent') {
    discount = (subtotal * appliedCoupon.value) / 100;
  }

  const tax = subtotal * 0.08;
  const isFreeShip = subtotal >= 1000 || (appliedCoupon && appliedCoupon.type === 'shipping');
  const shipping = isFreeShip || subtotal === 0 ? 0 : 100.00;
  const grandTotal = Math.max(0, subtotal - discount + tax + shipping);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim().toUpperCase());
      setCouponCode('');
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}></div>
      <aside className="cart-drawer">
        <div className="drawer-header">
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-bag-shopping"></i> Your Shopping Bag ({cart.length} items)
          </div>
          <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div style={{ padding: '20px', flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>
              {subtotal >= 1000 ? '🎉 You unlocked FREE Express Delivery!' : `Add ₹${(1000 - subtotal).toLocaleString('en-IN')} more for FREE Delivery!`}
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #38BDF8, #10B981)', width: `${Math.min(100, (subtotal / 1000) * 100)}%`, transition: '0.3s ease' }}></div>
            </div>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 20px', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-color)', marginBottom: '16px', boxShadow: 'var(--shadow-lg)' }}>
                <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=400&q=80" alt="Empty Shopping Bag" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#FFF', marginBottom: '6px' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '240px', lineHeight: 1.5 }}>Explore our 4 specialized sectors to discover high-fidelity products!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '14px', background: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'relative' }}>
                <button onClick={() => removeFromCart(item.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>

                <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.sector}</span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: '#FFF' }}>{item.name}</h4>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#FFF' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                      <button onClick={() => updateCartQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>-</button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-glass)' }}>
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input 
                type="text" 
                placeholder="Promo code (e.g. SAVE10)" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)} 
                style={{ flexGrow: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px 12px', color: '#FFF', fontSize: '0.85rem', textTransform: 'uppercase' }}
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>Apply</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--color-success)', fontWeight: '700' }}>
                  <span>Promo Discount ({appliedCoupon.code})</span><span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <span>Estimated Tax (8%)</span><span>₹{tax.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <span>Shipping Fee</span><span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: '#FFF', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                <span>Grand Total</span><span style={{ color: 'var(--accent-primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-block" onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>
              Proceed to Checkout Gateway <i className="fa-solid fa-lock"></i>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
