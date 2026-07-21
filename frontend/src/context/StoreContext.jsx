import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts, validateCoupon, createOrderApi } from '../api/client';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSector, setActiveSector] = useState(null); // null = Sector Landing Page
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('aura_cart') || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('aura_wishlist') || '[]'));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('aura_orders') || '[]'));
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Modals & UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Fetch products from backend Express API when inside a sector
  const loadProducts = async () => {
    if (!activeSector) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchProducts({
        sector: activeSector,
        category: activeSubCategory,
        search: searchQuery,
        sort: sortBy
      });
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to load products from API:', err);
      showToast('Error loading products from server', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    if (activeSector) {
      document.body.dataset.sector = activeSector;
    } else {
      delete document.body.dataset.sector;
    }
  }, [activeSector, activeSubCategory, searchQuery, sortBy]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sector Selection Handler
  const selectSector = (sectorId) => {
    setActiveSector(sectorId);
    setActiveSubCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const goToHome = () => {
    setActiveSector(null);
    setActiveSubCategory('all');
    setSearchQuery('');
  };

  // Toast System
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Cart Methods
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, sector: product.sector, quantity }];
    });
    showToast(`Added "${product.name}" to cart!`, 'success');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'warning');
  };

  const applyCoupon = async (code) => {
    try {
      const res = await validateCoupon(code);
      if (res.success) {
        setAppliedCoupon(res.coupon);
        showToast(`Applied promo code ${res.coupon.code}!`, 'success');
      } else {
        showToast(res.error || 'Invalid promo code', 'danger');
      }
    } catch (err) {
      showToast('Error validating coupon', 'danger');
    }
  };

  // Wishlist Methods
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'warning');
        return prev.filter(id => id !== productId);
      }
      showToast('Added to wishlist!', 'success');
      return [...prev, productId];
    });
  };

  // Reset Filters
  const resetFilters = () => {
    setActiveSubCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  // Submit Order to backend API
  const placeOrder = async (orderPayload) => {
    try {
      const res = await createOrderApi(orderPayload);
      if (res.success) {
        const createdOrder = res.order;
        setOrders(prev => [createdOrder, ...prev]);
        setCart([]);
        setAppliedCoupon(null);
        setIsCheckoutOpen(false);
        setActiveReceipt(createdOrder);
        showToast(`Order ${createdOrder.orderRef} placed successfully!`, 'success');
        return createdOrder;
      }
    } catch (err) {
      console.error('Order creation error:', err);
      showToast('Failed to save order to database', 'danger');
    }
  };

  return (
    <StoreContext.Provider value={{
      products, loading, activeSector, selectSector, goToHome,
      activeSubCategory, setActiveSubCategory,
      searchQuery, setSearchQuery, sortBy, setSortBy,
      cart, addToCart, updateCartQuantity, removeFromCart,
      wishlist, toggleWishlist,
      appliedCoupon, applyCoupon,
      isCartOpen, setIsCartOpen,
      isCheckoutOpen, setIsCheckoutOpen,
      isOrdersOpen, setIsOrdersOpen,
      selectedProduct, setSelectedProduct,
      activeReceipt, setActiveReceipt,
      orders, placeOrder,
      toasts, showToast, resetFilters
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
