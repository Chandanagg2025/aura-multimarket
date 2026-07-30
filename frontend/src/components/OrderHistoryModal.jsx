import React from 'react';
import { useStore } from '../context/StoreContext';

export default function OrderHistoryModal() {
  const { orders, isOrdersOpen, setIsOrdersOpen } = useStore();

  if (!isOrdersOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOrdersOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-box-archive"></i> My Order History ({orders.length})
          </h3>
          <button className="modal-close-btn" onClick={() => setIsOrdersOpen(false)}><i className="fa-solid fa-xmark"></i></button>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <i className="fa-solid fa-box-open" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '12px' }}></i>
            <h4>No past orders placed yet</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Completed purchases saved in SQLite will show here!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((order, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '8px' }}>
                  <span>{order.orderRef}</span>
                  <span style={{ color: 'var(--color-success)', fontSize: '0.85rem' }}><i className="fa-solid fa-check"></i> {order.status}</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Date: {order.date} | Payment: {order.paymentMethod}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px', fontSize: '0.85rem' }}>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'right', fontWeight: '800', fontSize: '1.05rem', color: 'var(--accent-primary)', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--border-color)' }}>
                  Total Paid: ₹{order.totalPaid.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
