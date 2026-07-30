import React from 'react';
import { useStore } from '../context/StoreContext';

export default function OrderReceiptModal() {
  const { activeReceipt, setActiveReceipt, resetFilters } = useStore();

  if (!activeReceipt) return null;

  return (
    <div className="modal-overlay" onClick={() => setActiveReceipt(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 14px' }}>
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)' }}>Payment Successful!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Order saved to SQLite database.</p>
          <div style={{ background: 'rgba(255,255,255,0.06)', display: 'inline-block', padding: '4px 14px', borderRadius: 'var(--radius-full)', marginTop: '8px', fontSize: '0.85rem' }}>
            Order Ref: <strong>{activeReceipt.orderRef}</strong>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', marginBottom: '16px' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Date:</span> <strong>{activeReceipt.date}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Payment:</span> <strong>{activeReceipt.paymentMethod}</strong></div>
            <div style={{ gridColumn: '1 / -1' }}><span style={{ color: 'var(--text-muted)' }}>Shipping To:</span> <strong>{activeReceipt.customerName} ({activeReceipt.shippingAddress})</strong></div>
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>Purchased Items</h4>
          {activeReceipt.items?.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span>{item.quantity}x {item.name} ({item.sector})</span>
              <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span><span>₹{activeReceipt.subtotal.toLocaleString('en-IN')}</span></div>
            {activeReceipt.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}><span>Discount:</span><span>-₹{activeReceipt.discount.toLocaleString('en-IN')}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tax (8%):</span><span>₹{activeReceipt.tax.toLocaleString('en-IN')}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping:</span><span>{activeReceipt.shippingFee === 0 ? 'FREE' : `₹${activeReceipt.shippingFee.toLocaleString('en-IN')}`}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', color: '#FFF', marginTop: '6px' }}>
              <span>Total Paid:</span><span style={{ color: 'var(--accent-primary)' }}>₹{activeReceipt.totalPaid.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px' }}>
          <button className="btn btn-secondary" onClick={() => window.print()} style={{ flexGrow: 1 }}>
            <i className="fa-solid fa-print"></i> Print Invoice
          </button>
          <button className="btn btn-primary" onClick={() => { setActiveReceipt(null); resetFilters(); }} style={{ flexGrow: 1 }}>
            Continue Shopping <i className="fa-solid fa-bag-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
