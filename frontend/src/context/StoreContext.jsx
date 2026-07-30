import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts, validateCoupon, createOrderApi, fetchOrderByRef } from '../api/client';
import { STATIC_PRODUCTS } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSector, setActiveSector] = useState(null); // null = Sector Landing Page
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('shree_pratham_cart') || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('shree_pratham_wishlist') || '[]'));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('shree_pratham_orders') || '[]'));
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Modals & UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [toasts, setToasts] = useState([]);

  const filterStaticProducts = (sector, category, search, sort) => {
    let list = STATIC_PRODUCTS.filter(p => p.sector === sector);
    if (category && category !== 'all') {
      list = list.filter(p => p.subCategory === category);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sectorName.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  };

  // Fetch products from backend Express API when inside a sector, with resilient fallback
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
      if (data && data.products && data.products.length > 0) {
        setProducts(data.products);
      } else {
        const fallback = filterStaticProducts(activeSector, activeSubCategory, searchQuery, sortBy);
        setProducts(fallback);
      }
    } catch (err) {
      console.warn('Backend API unavailable, using fallback products dataset:', err);
      const fallback = filterStaticProducts(activeSector, activeSubCategory, searchQuery, sortBy);
      setProducts(fallback);
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
    localStorage.setItem('shree_pratham_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shree_pratham_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('shree_pratham_orders', JSON.stringify(orders));
  }, [orders]);

  // Read URL query params on initial mount to auto-track orders
  useEffect(() => {
    const handleTracking = async () => {
      const params = new URLSearchParams(window.location.search);
      const trackRef = params.get('track');
      if (trackRef) {
        console.log(`[Tracking] Found track parameter: ${trackRef}. Fetching order...`);
        try {
          const res = await fetchOrderByRef(trackRef);
          if (res.success && res.order) {
            console.log(`[Tracking] Order details loaded successfully. Opening invoice modal...`);
            setActiveReceipt(res.order);
            showToast(`Tracking order: ${res.order.orderRef}`, 'success');
            
            // Clean up the URL query parameter without reloading the page
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          } else {
            showToast('Order not found or invalid reference number', 'danger');
          }
        } catch (error) {
          console.error('[Tracking Error] Failed to fetch tracked order:', error);
          showToast('Failed to fetch tracked order from server', 'danger');
        }
      }
    };

    handleTracking();
  }, []);

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
