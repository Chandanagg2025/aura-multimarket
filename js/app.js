/* ==========================================================================
   AURA Multi-Market - Application Logic & State Manager
   ========================================================================== */

// Global App State
const state = {
  activeSector: "all",
  activeSubCategory: "all",
  searchQuery: "",
  sortBy: "featured",
  cart: JSON.parse(localStorage.getItem("aura_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("aura_wishlist") || "[]"),
  orders: JSON.parse(localStorage.getItem("aura_orders") || "[]"),
  appliedCoupon: null
};

// Available Coupons Database
const PROMO_CODES = {
  "SAVE10": { type: "percent", value: 10, code: "SAVE10", desc: "10% OFF Total" },
  "AURA20": { type: "percent", value: 20, code: "AURA20", desc: "20% OFF Luxury Offer" },
  "FREESHIP": { type: "shipping", value: 0, code: "FREESHIP", desc: "Free Express Shipping" }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSearch();
  initSorting();
  initCartDrawer();
  initWishlist();
  initOrdersModal();
  renderCatalog();
  updateCartUI();
  updateWishlistBadge();
});

/* --- Navigation & Sector Controls --- */
function initNavigation() {
  const sectorTabs = document.querySelectorAll(".sector-tab");
  const heroMiniCards = document.querySelectorAll(".hero-mini-card");

  sectorTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const sector = tab.dataset.sector;
      setSector(sector);
    });
  });

  heroMiniCards.forEach(card => {
    card.addEventListener("click", () => {
      const sector = card.dataset.sector;
      setSector(sector);
      // Smooth scroll down to catalog section
      document.querySelector(".main-content").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Footer Sector links
  document.querySelectorAll("[data-footer-sector]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sector = link.dataset.footerSector;
      setSector(sector);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Hero CTA explore button
  document.getElementById("exploreSectorBtn")?.addEventListener("click", () => {
    document.querySelector(".main-content").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("paymentInfoBtn")?.addEventListener("click", () => {
    showToast("We accept UPI, Visa/Mastercard, Net Banking, & Cash on Delivery!", "info");
  });
}

function setSector(sector) {
  state.activeSector = sector;
  state.activeSubCategory = "all";
  document.body.dataset.sector = sector;

  // Update nav tabs active class
  document.querySelectorAll(".sector-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.sector === sector);
  });

  // Update hero cards
  document.querySelectorAll(".hero-mini-card").forEach(c => {
    c.classList.toggle("active", c.dataset.sector === sector);
  });

  // Update Hero Section text
  const info = SECTOR_INFO[sector] || SECTOR_INFO.all;
  document.getElementById("heroTag").innerHTML = `<i class="fa-solid fa-sparkles"></i> ${info.tag}`;
  document.getElementById("heroTitle").innerHTML = `${info.title.replace(/^[^a-zA-Z]+/, '')}`;
  document.getElementById("heroDesc").textContent = info.desc;
  document.getElementById("catalogTitle").textContent = info.title;

  renderSubCategories();
  renderCatalog();
}

/* --- Sub-Category Pills --- */
function renderSubCategories() {
  const container = document.getElementById("subCategoryPills");
  if (!container) return;

  let filteredProducts = PRODUCTS_DATA;
  if (state.activeSector !== "all") {
    filteredProducts = PRODUCTS_DATA.filter(p => p.sector === state.activeSector);
  }

  // Extract unique subcategories
  const subCats = Array.from(new Set(filteredProducts.map(p => p.subCategory)));

  container.innerHTML = `
    <button class="pill-btn ${state.activeSubCategory === 'all' ? 'active' : ''}" data-sub="all">All Items</button>
    ${subCats.map(sub => `
      <button class="pill-btn ${state.activeSubCategory === sub ? 'active' : ''}" data-sub="${sub}">
        ${sub.charAt(0).toUpperCase() + sub.slice(1)}
      </button>
    `).join("")}
  `;

  // Attach event listener
  container.querySelectorAll(".pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeSubCategory = btn.dataset.sub;
      container.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog();
    });
  });
}

/* --- Search & Sorting --- */
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    clearBtn.classList.toggle("hidden", state.searchQuery.length === 0);
    renderCatalog();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    clearBtn.classList.add("hidden");
    renderCatalog();
  });

  document.getElementById("emptyResetBtn")?.addEventListener("click", resetAllFilters);
  document.getElementById("resetFiltersBtn")?.addEventListener("click", resetAllFilters);
}

function initSorting() {
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderCatalog();
  });
}

function resetAllFilters() {
  state.activeSector = "all";
  state.activeSubCategory = "all";
  state.searchQuery = "";
  state.sortBy = "featured";
  document.getElementById("searchInput").value = "";
  document.getElementById("clearSearchBtn").classList.add("hidden");
  setSector("all");
}

/* --- Product Catalog Renderer --- */
function renderCatalog() {
  const grid = document.getElementById("productsGrid");
  const emptyState = document.getElementById("emptyState");
  const countBadge = document.getElementById("productCountBadge");
  const activeFiltersBar = document.getElementById("activeFiltersBar");
  const filterTagsContainer = document.getElementById("filterTagsContainer");

  let items = [...PRODUCTS_DATA];

  // 1. Filter by Sector
  if (state.activeSector !== "all") {
    items = items.filter(p => p.sector === state.activeSector);
  }

  // 2. Filter by SubCategory
  if (state.activeSubCategory !== "all") {
    items = items.filter(p => p.subCategory === state.activeSubCategory);
  }

  // 3. Filter by Search Query
  if (state.searchQuery) {
    items = items.filter(p => 
      p.name.toLowerCase().includes(state.searchQuery) ||
      p.description.toLowerCase().includes(state.searchQuery) ||
      p.sectorName.toLowerCase().includes(state.searchQuery) ||
      p.specs.some(s => s.toLowerCase().includes(state.searchQuery))
    );
  }

  // 4. Sort Items
  if (state.sortBy === "price-low") {
    items.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-high") {
    items.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "rating") {
    items.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Active filters bar updating
  const activeTags = [];
  if (state.activeSector !== "all") activeTags.push(`Sector: ${state.activeSector}`);
  if (state.activeSubCategory !== "all") activeTags.push(`Category: ${state.activeSubCategory}`);
  if (state.searchQuery) activeTags.push(`Search: "${state.searchQuery}"`);

  if (activeTags.length > 0) {
    activeFiltersBar.classList.remove("hidden");
    filterTagsContainer.innerHTML = activeTags.map(t => `<span class="filter-chip">${t}</span>`).join("");
  } else {
    activeFiltersBar.classList.add("hidden");
  }

  // Update Count Badge
  countBadge.textContent = `Showing ${items.length} product${items.length === 1 ? '' : 's'}`;

  // Check Empty State
  if (items.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  // Render HTML Cards
  grid.innerHTML = items.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const starHtml = getStarRatingHTML(product.rating);

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-badge-group">
          <span class="sector-badge ${product.sector}">${product.sectorName}</span>
          ${product.badge ? `<span class="tag-badge">${product.badge}</span>` : ""}
        </div>

        <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                onclick="toggleWishlist('${product.id}')" 
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
          <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
        </button>

        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'">
          <div class="product-quick-view-overlay">
            <button class="btn btn-small btn-secondary" onclick="openProductModal('${product.id}')">
              <i class="fa-solid fa-eye"></i> Quick View
            </button>
          </div>
        </div>

        <div class="product-info">
          <span class="product-cat">${product.subCategory}</span>
          <h3 class="product-title">${product.name}</h3>
          
          <div class="product-rating">
            ${starHtml}
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>

          <div class="product-bottom-row">
            <div class="product-price-box">
              <span class="current-price">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
            </div>

            <button class="btn btn-primary add-cart-btn" onclick="addToCart('${product.id}')">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Generate Star Icons
function getStarRatingHTML(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let html = "";
  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalf) {
    html += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  return html;
}

/* --- Cart Management --- */
function initCartDrawer() {
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartStartShoppingBtn = document.getElementById("cartStartShoppingBtn");
  const applyCouponBtn = document.getElementById("applyCouponBtn");

  cartBtn.addEventListener("click", openCartDrawer);
  closeCartBtn.addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);
  cartStartShoppingBtn?.addEventListener("click", closeCartDrawer);

  applyCouponBtn?.addEventListener("click", applyCouponCode);
}

function openCartDrawer() {
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sector: product.sector,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to cart!`, "success");
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart", "warning");
}

function saveCart() {
  localStorage.setItem("aura_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  const cartBadge = document.getElementById("cartBadge");
  const cartDrawerCount = document.getElementById("cartDrawerCount");
  const cartItemsList = document.getElementById("cartItemsList");
  const emptyCartState = document.getElementById("emptyCartState");
  const cartDrawerFooter = document.getElementById("cartDrawerFooter");

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
  cartDrawerCount.textContent = `${totalItems} Item${totalItems === 1 ? '' : 's'}`;

  if (state.cart.length === 0) {
    cartItemsList.innerHTML = "";
    emptyCartState.classList.remove("hidden");
    cartDrawerFooter.classList.add("hidden");
    updateTotals(0);
    return;
  }

  emptyCartState.classList.add("hidden");
  cartDrawerFooter.classList.remove("hidden");

  cartItemsList.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <button class="remove-cart-item" onclick="removeCartItem('${item.id}')" title="Remove"><i class="fa-solid fa-trash-can"></i></button>
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div>
          <span class="cart-item-sector">${item.sector}</span>
          <h4 class="cart-item-title">${item.name}</h4>
        </div>
        <div class="cart-item-bottom">
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  updateTotals(subtotal);
}

function updateTotals(subtotal) {
  let discount = 0;
  if (state.appliedCoupon) {
    if (state.appliedCoupon.type === "percent") {
      discount = (subtotal * state.appliedCoupon.value) / 100;
    }
  }

  const tax = subtotal * 0.08;
  const isFreeShipEligible = subtotal >= 50 || (state.appliedCoupon && state.appliedCoupon.type === "shipping");
  const shipping = isFreeShipEligible || subtotal === 0 ? 0 : 15.00;
  const grandTotal = Math.max(0, subtotal - discount + tax + shipping);

  // Free shipping progress bar
  const shippingProgressText = document.getElementById("shippingProgressText");
  const shippingProgressBar = document.getElementById("shippingProgressBar");
  if (subtotal >= 50) {
    shippingProgressText.innerHTML = "🎉 Congratulations! You unlocked <strong>FREE Express Shipping</strong>";
    shippingProgressBar.style.width = "100%";
  } else {
    const needed = (50 - subtotal).toFixed(2);
    shippingProgressText.innerHTML = `Add <strong>$${needed}</strong> more to unlock FREE Express Shipping!`;
    shippingProgressBar.style.width = `${Math.min(100, (subtotal / 50) * 100)}%`;
  }

  // Update Drawer Summary Values
  document.getElementById("cartSubtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cartTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cartShipping").textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  document.getElementById("cartGrandTotal").textContent = `$${grandTotal.toFixed(2)}`;

  const discountRow = document.getElementById("discountRow");
  if (discount > 0) {
    discountRow.classList.remove("hidden");
    document.getElementById("appliedCouponCode").textContent = state.appliedCoupon.code;
    document.getElementById("cartDiscount").textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow.classList.add("hidden");
  }
}

function applyCouponCode() {
  const input = document.getElementById("couponInput");
  const code = input.value.trim().toUpperCase();
  const msg = document.getElementById("couponMsg");

  if (!code) return;

  if (PROMO_CODES[code]) {
    state.appliedCoupon = PROMO_CODES[code];
    msg.textContent = `Promo code "${code}" applied! (${PROMO_CODES[code].desc})`;
    msg.className = "coupon-msg success";
    showToast(`Applied promo code ${code}!`, "success");
    updateCartUI();
  } else {
    msg.textContent = "Invalid promo code. Try SAVE10 or AURA20";
    msg.className = "coupon-msg error";
    showToast("Invalid promo code", "danger");
  }
  msg.classList.remove("hidden");
}

/* --- Product Details Quick View Modal --- */
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modalOverlay = document.getElementById("productModalOverlay");
  const modalBody = document.getElementById("productModalBody");
  const closeBtn = document.getElementById("closeProductModalBtn");

  modalBody.innerHTML = `
    <div class="modal-img-wrapper">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="modal-details">
      <span class="sector-badge ${product.sector}" style="align-self: flex-start; margin-bottom: 10px;">${product.sectorName}</span>
      <h2 style="font-family: var(--font-heading); font-size: 1.5rem; color: #FFF; margin-bottom: 8px;">${product.name}</h2>
      
      <div class="product-rating" style="margin-bottom: 14px;">
        ${getStarRatingHTML(product.rating)}
        <span class="rating-count">(${product.reviewsCount} customer reviews)</span>
      </div>

      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 16px;">${product.description}</p>

      <ul class="modal-specs-list">
        ${product.specs.map(spec => `<li><i class="fa-solid fa-circle-check"></i> ${spec}</li>`).join("")}
      </ul>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-color);">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Price</span>
          <span style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF;">$${product.price.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary" onclick="addToCart('${product.id}'); closeModal();">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart Now
        </button>
      </div>
    </div>
  `;

  modalOverlay.classList.add("active");

  const closeModal = () => modalOverlay.classList.remove("active");
  closeBtn.onclick = closeModal;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };
}

/* --- Wishlist Management --- */
function initWishlist() {
  document.getElementById("wishlistBtn").addEventListener("click", () => {
    if (state.wishlist.length === 0) {
      showToast("Your wishlist is empty. Click heart icon on products to save!", "info");
    } else {
      showToast(`You have ${state.wishlist.length} item(s) in your wishlist! Filtering catalog...`, "success");
      // Filter catalog to wishlist items
      const items = PRODUCTS_DATA.filter(p => state.wishlist.includes(p.id));
      renderFilteredCustomList("Your Saved Wishlist", items);
    }
  });
}

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast("Removed from wishlist", "warning");
  } else {
    state.wishlist.push(productId);
    showToast("Added to wishlist!", "success");
  }
  localStorage.setItem("aura_wishlist", JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderCatalog();
}

function updateWishlistBadge() {
  document.getElementById("wishlistBadge").textContent = state.wishlist.length;
}

function renderFilteredCustomList(title, items) {
  document.getElementById("catalogTitle").textContent = title;
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = items.map(product => `
    <div class="product-card">
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <span class="current-price">$${product.price.toFixed(2)}</span>
        <button class="btn btn-primary btn-small mt-2" onclick="addToCart('${product.id}')">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

/* --- Order History Modal --- */
function initOrdersModal() {
  const ordersBtn = document.getElementById("ordersBtn");
  const modalOverlay = document.getElementById("ordersModalOverlay");
  const closeBtn = document.getElementById("closeOrdersModalBtn");

  ordersBtn.addEventListener("click", () => {
    renderOrdersList();
    modalOverlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => modalOverlay.classList.remove("active"));
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove("active");
  });
}

function renderOrdersList() {
  const container = document.getElementById("ordersListBody");
  if (state.orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 12px;"></i>
        <h4>No past orders placed yet</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Your completed transactions will appear here!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.orders.map(order => `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-md); margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.95rem; margin-bottom: 8px;">
        <span>Order ${order.orderId}</span>
        <span style="color: var(--color-success);">${order.status}</span>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px;">
        Date: ${order.date} | Payment: ${order.paymentMethod}
      </div>
      <div style="font-size: 0.85rem; border-top: 1px solid var(--border-color); padding-top: 8px;">
        ${order.items.map(i => `<div>${i.quantity}x ${i.name} - $${(i.price * i.quantity).toFixed(2)}</div>`).join("")}
      </div>
      <div style="text-align: right; font-weight: 800; font-size: 1rem; margin-top: 10px; color: var(--accent-primary);">
        Total Paid: $${order.total.toFixed(2)}
      </div>
    </div>
  `).join("");
}

/* --- Toast System --- */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "danger") icon = "fa-circle-exclamation";
  if (type === "warning") icon = "fa-triangle-exclamation";

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
