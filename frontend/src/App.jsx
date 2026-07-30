import React from 'react';
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
import { useStore } from './context/StoreContext';

export default function App() {
  const { activeSector } = useStore();

  return (
    <div className="app-container">
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
