import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SectorLandingPage from './components/SectorLandingPage';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CartDrawer from './components/CartDrawer';
import PaymentGatewayModal from './components/PaymentGatewayModal';
import OrderReceiptModal from './components/OrderReceiptModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import ToastContainer from './components/ToastContainer';
import MaintenancePage from './components/MaintenancePage';
import { useStore } from './context/StoreContext';

export default function App() {
  const { activeSector } = useStore();
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(true);

  // Check URL query parameters for auto admin bypass (?admin=true or ?preview=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('preview') === 'true') {
      setIsMaintenanceMode(false);
    }
  }, []);

  if (isMaintenanceMode) {
    return <MaintenancePage onBypass={() => setIsMaintenanceMode(false)} />;
  }

  return (
    <div className="app-container">
      {/* Admin Preview Floating Bar */}
      <div style={{ background: '#F59E0B', color: '#000', padding: '6px 16px', fontSize: '0.8rem', fontWeight: '700', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <span>⚠️ MAINTENANCE MODE IS LIVE (You are currently in Admin Store Preview Mode)</span>
        <button 
          onClick={() => setIsMaintenanceMode(true)}
          style={{ background: '#000', color: '#FFF', border: 'none', padding: '3px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
        >
          View Maintenance Screen
        </button>
      </div>

      <div className="announcement-bar">
        <span>🎉 <strong>SPECIAL LAUNCH OFFER:</strong> Use code <code className="code-badge">SAVE10</code> for 10% OFF across all 4 sectors! Free express shipping over ₹1,000.</span>
      </div>

      <Header />

      {activeSector === null ? (
        <SectorLandingPage />
      ) : (
        <>
          <HeroSection />
          <ProductGrid />
        </>
      )}

      <footer className="main-footer" style={{ background: 'var(--bg-glass)', borderTop: '1px solid var(--border-color)', padding: '40px 24px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          &copy; 2026 Shree Pratham Multi-Market Inc. Dedicated Quad-Sector Commerce Architecture.
        </p>
      </footer>

      <ProductQuickViewModal />
      <CartDrawer />
      <PaymentGatewayModal />
      <OrderReceiptModal />
      <OrderHistoryModal />
      <ToastContainer />
    </div>
  );
}

