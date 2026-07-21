/* ==========================================================================
   AURA Multi-Market - Interactive Payment Gateway Engine
   Methods Supported: UPI (QR Scan) | Credit/Debit Card | Net Banking | COD
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initCheckoutGateway();
});

let currentPaymentMethod = "upi";
let qrTimerInterval = null;
let currentCheckoutData = null;

function initCheckoutGateway() {
  const checkoutModal = document.getElementById("checkoutModalOverlay");
  const closeBtn = document.getElementById("closeCheckoutModalBtn");
  const proceedBtn = document.getElementById("proceedToCheckoutBtn");
  const goToStep2Btn = document.getElementById("goToStep2Btn");
  const backToStep1Btn = document.getElementById("backToStep1Btn");

  proceedBtn?.addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Your cart is empty!", "warning");
      return;
    }
    closeCartDrawer();
    openCheckoutModal();
  });

  closeBtn?.addEventListener("click", closeCheckoutModal);
  checkoutModal?.addEventListener("click", (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  // Navigation Steps
  goToStep2Btn?.addEventListener("click", validateStep1AndProceed);
  backToStep1Btn?.addEventListener("click", showStep1);

  // Payment Method Tabs
  const methodTabs = document.querySelectorAll(".pay-method-tab");
  methodTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      methodTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const method = tab.dataset.method;
      switchPaymentMethodPanel(method);
    });
  });

  // Action Buttons
  document.getElementById("simulateUpiApproveBtn")?.addEventListener("click", () => processPayment("UPI (Verified Mobile)"));
  document.getElementById("cardPaymentForm")?.addEventListener("submit", handleCardPaymentSubmit);
  document.getElementById("submitNetbankingBtn")?.addEventListener("click", handleNetbankingSubmit);
  document.getElementById("submitCodBtn")?.addEventListener("click", handleCodSubmit);
  document.getElementById("submitOtpBtn")?.addEventListener("click", verifyOtpAndComplete);
  
  // Card input formatters
  initCardFormatters();

  // Receipt modal buttons
  document.getElementById("printReceiptBtn")?.addEventListener("click", () => window.print());
  document.getElementById("continueShoppingBtn")?.addEventListener("click", () => {
    document.getElementById("receiptModalOverlay").classList.remove("active");
    resetAllFilters();
  });
}

function openCheckoutModal() {
  const modal = document.getElementById("checkoutModalOverlay");
  modal.classList.add("active");
  showStep1();
  renderCheckoutOrderSummary();
}

function closeCheckoutModal() {
  document.getElementById("checkoutModalOverlay").classList.remove("active");
  if (qrTimerInterval) clearInterval(qrTimerInterval);
}

function renderCheckoutOrderSummary() {
  const container = document.getElementById("checkoutItemsPreview");
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (state.appliedCoupon && state.appliedCoupon.type === "percent") {
    discount = (subtotal * state.appliedCoupon.value) / 100;
  }

  const tax = subtotal * 0.08;
  const isFreeShip = subtotal >= 50 || (state.appliedCoupon && state.appliedCoupon.type === "shipping");
  const shipping = isFreeShip || subtotal === 0 ? 0 : 15.00;
  const total = Math.max(0, subtotal - discount + tax + shipping);

  container.innerHTML = state.cart.map(item => `
    <div class="co-item-row">
      <span>${item.quantity}x ${item.name}</span>
      <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
    </div>
  `).join("");

  document.getElementById("coSubtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("coTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("coShipping").textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  document.getElementById("coGrandTotal").textContent = `$${total.toFixed(2)}`;

  const discountRow = document.getElementById("coDiscountRow");
  if (discount > 0) {
    discountRow.classList.remove("hidden");
    document.getElementById("coDiscount").textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow.classList.add("hidden");
  }

  // Update Pay Button labels
  document.querySelectorAll(".pay-btn-amount").forEach(el => el.textContent = `$${total.toFixed(2)}`);
  document.getElementById("upiAmountText").textContent = `$${total.toFixed(2)}`;

  // Store active checkout figures
  currentCheckoutData = { subtotal, discount, tax, shipping, total };

  // Update UPI QR Code URL
  const qrImg = document.getElementById("upiQrImg");
  const upiUrl = `upi://pay?pa=auramarket@expressbank&pn=AURA%20Multi-Market&am=${total.toFixed(2)}&cu=USD`;
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;
}

/* --- Checkout Steps Control --- */
function showStep1() {
  document.getElementById("checkoutStep1").classList.remove("hidden");
  document.getElementById("checkoutStep2").classList.add("hidden");
  document.getElementById("checkoutStep3").classList.add("hidden");

  document.getElementById("stepIndicator1").className = "step-item active";
  document.getElementById("stepIndicator2").className = "step-item";
  document.getElementById("stepIndicator3").className = "step-item";
}

function validateStep1AndProceed() {
  const name = document.getElementById("shipFullName").value.trim();
  const email = document.getElementById("shipEmail").value.trim();
  const phone = document.getElementById("shipPhone").value.trim();
  const pincode = document.getElementById("shipPincode").value.trim();
  const address = document.getElementById("shipAddress").value.trim();

  if (!name || !email || !phone || !pincode || !address) {
    showToast("Please fill in all required delivery fields!", "warning");
    return;
  }

  // Proceed to Step 2 (Payment method choice)
  document.getElementById("checkoutStep1").classList.add("hidden");
  document.getElementById("checkoutStep2").classList.remove("hidden");

  document.getElementById("stepIndicator1").className = "step-item completed";
  document.getElementById("stepIndicator2").className = "step-item active";

  startQrTimer();
}

function switchPaymentMethodPanel(method) {
  currentPaymentMethod = method;
  document.querySelectorAll(".payment-panel").forEach(p => p.classList.add("hidden"));

  if (method === "upi") {
    document.getElementById("panelUpi").classList.remove("hidden");
    startQrTimer();
  } else if (method === "card") {
    document.getElementById("panelCard").classList.remove("hidden");
  } else if (method === "netbanking") {
    document.getElementById("panelNetbanking").classList.remove("hidden");
  } else if (method === "cod") {
    document.getElementById("panelCod").classList.remove("hidden");
  }
}

/* --- Card Formatters --- */
function initCardFormatters() {
  const cardInput = document.getElementById("cardNumber");
  const expiryInput = document.getElementById("cardExpiry");
  const cardBrandIcon = document.getElementById("cardBrandIcon");

  cardInput?.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(" ") || "";
    e.target.value = formatted;

    // Detect brand
    if (val.startsWith("4")) {
      cardBrandIcon.innerHTML = '<i class="fa-brands fa-cc-visa text-primary"></i>';
    } else if (val.startsWith("5") || val.startsWith("2")) {
      cardBrandIcon.innerHTML = '<i class="fa-brands fa-cc-mastercard text-warning"></i>';
    } else if (val.startsWith("3")) {
      cardBrandIcon.innerHTML = '<i class="fa-brands fa-cc-amex text-info"></i>';
    } else {
      cardBrandIcon.innerHTML = '<i class="fa-solid fa-credit-card"></i>';
    }
  });

  expiryInput?.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (val.length >= 3) {
      e.target.value = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
    } else {
      e.target.value = val;
    }
  });
}

/* --- UPI QR Timer --- */
function startQrTimer() {
  if (qrTimerInterval) clearInterval(qrTimerInterval);
  let duration = 299; // 5 mins
  const timerDisplay = document.getElementById("qrTimer");

  qrTimerInterval = setInterval(() => {
    const mins = String(Math.floor(duration / 60)).padStart(2, '0');
    const secs = String(duration % 60).padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;

    if (--duration < 0) {
      clearInterval(qrTimerInterval);
      if (timerDisplay) timerDisplay.textContent = "Expired";
    }
  }, 1000);
}

/* --- Payment Handlers --- */
function handleCardPaymentSubmit(e) {
  e.preventDefault();
  const cardNum = document.getElementById("cardNumber").value.replace(/\s/g, "");
  const expiry = document.getElementById("cardExpiry").value;
  const cvv = document.getElementById("cardCvv").value;
  const holder = document.getElementById("cardHolder").value;

  if (cardNum.length < 15 || !expiry.includes("/") || cvv.length < 3 || !holder) {
    showToast("Please enter valid card details!", "warning");
    return;
  }

  // Trigger 3D Secure OTP verification overlay
  showProcessingAndOtp("Credit/Debit Card");
}

function handleNetbankingSubmit() {
  const selectedBankRadio = document.querySelector('input[name="bankSelect"]:checked');
  const otherBank = document.getElementById("otherBankSelect").value;
  const bankName = otherBank || (selectedBankRadio ? selectedBankRadio.value : "HDFC Bank");

  processPayment(`Net Banking (${bankName})`);
}

function handleCodSubmit() {
  processPayment("Cash on Delivery (COD Verified)");
}

function showProcessingAndOtp(methodName) {
  document.getElementById("checkoutStep2").classList.add("hidden");
  document.getElementById("checkoutStep3").classList.remove("hidden");
  document.getElementById("stepIndicator2").className = "step-item completed";
  document.getElementById("stepIndicator3").className = "step-item active";

  const statusTitle = document.getElementById("processingStatusTitle");
  const statusDesc = document.getElementById("processingStatusDesc");
  const spinner = document.getElementById("processingSpinnerBox");
  const otpBox = document.getElementById("otpDialogBox");

  statusTitle.textContent = "Connecting with 3D-Secure Bank Server...";
  statusDesc.textContent = "Sending 6-digit verification code to your registered mobile device.";
  spinner.classList.remove("hidden");
  otpBox.classList.add("hidden");

  // Simulate 1.5 second authentication network latency
  setTimeout(() => {
    spinner.classList.add("hidden");
    otpBox.classList.remove("hidden");
    document.getElementById("otpInput").focus();
  }, 1500);
}

function verifyOtpAndComplete() {
  const otp = document.getElementById("otpInput").value.trim();
  if (otp === "123456" || otp.length === 6) {
    processPayment("Credit/Debit Card (3D-Secure Verified)");
  } else {
    showToast("Invalid OTP! Try default test code: 123456", "danger");
  }
}

/* --- Core Payment Execution --- */
function processPayment(methodLabel) {
  document.getElementById("checkoutStep2").classList.add("hidden");
  document.getElementById("checkoutStep3").classList.remove("hidden");
  document.getElementById("stepIndicator2").className = "step-item completed";
  document.getElementById("stepIndicator3").className = "step-item active";

  const statusTitle = document.getElementById("processingStatusTitle");
  const statusDesc = document.getElementById("processingStatusDesc");
  const spinner = document.getElementById("processingSpinnerBox");
  const otpBox = document.getElementById("otpDialogBox");

  otpBox.classList.add("hidden");
  spinner.classList.remove("hidden");

  statusTitle.textContent = "Encrypting & Authorizing Payment...";
  statusDesc.textContent = `Processing transaction with ${methodLabel}. Please wait...`;

  setTimeout(() => {
    statusTitle.textContent = "Payment Verified & Approved!";
    statusDesc.textContent = "Generating invoice and order confirmation receipt...";

    setTimeout(() => {
      completeOrder(methodLabel);
    }, 1000);
  }, 1800);
}

function completeOrder(methodLabel) {
  const orderId = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleString();
  const customerName = document.getElementById("shipFullName").value || "Valued Customer";
  const customerCity = document.getElementById("shipCity").value || "New York";

  const newOrder = {
    orderId: orderId,
    date: dateStr,
    items: [...state.cart],
    subtotal: currentCheckoutData.subtotal,
    discount: currentCheckoutData.discount,
    tax: currentCheckoutData.tax,
    shipping: currentCheckoutData.shipping,
    total: currentCheckoutData.total,
    paymentMethod: methodLabel,
    customerName: customerName,
    address: `${customerName}, ${customerCity}`,
    status: "Payment Confirmed"
  };

  // Save to State & LocalStorage
  state.orders.unshift(newOrder);
  localStorage.setItem("aura_orders", JSON.stringify(state.orders));

  // Reset Cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartUI();

  // Close Checkout Modal & Open Receipt
  closeCheckoutModal();
  renderReceiptModal(newOrder);
  showToast(`Payment successful! Order ${orderId} placed.`, "success");
}

function renderReceiptModal(order) {
  const modal = document.getElementById("receiptModalOverlay");
  
  document.getElementById("receiptOrderId").textContent = order.orderId;
  document.getElementById("receiptDate").textContent = order.date;
  document.getElementById("receiptMethod").textContent = order.paymentMethod;
  document.getElementById("receiptAddress").textContent = order.address;

  const tableContainer = document.getElementById("receiptItemsTable");
  tableContainer.innerHTML = order.items.map(item => `
    <div class="receipt-item-row">
      <div>
        <strong>${item.name}</strong>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${item.sector.toUpperCase()} x ${item.quantity}</div>
      </div>
      <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
    </div>
  `).join("");

  document.getElementById("rcSubtotal").textContent = `$${order.subtotal.toFixed(2)}`;
  document.getElementById("rcTax").textContent = `$${order.tax.toFixed(2)}`;
  document.getElementById("rcShipping").textContent = order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`;
  document.getElementById("rcGrandTotal").textContent = `$${order.total.toFixed(2)}`;

  const discountRow = document.getElementById("rcDiscountRow");
  if (order.discount > 0) {
    discountRow.classList.remove("hidden");
    document.getElementById("rcDiscount").textContent = `-$${order.discount.toFixed(2)}`;
  } else {
    discountRow.classList.add("hidden");
  }

  modal.classList.add("active");
}
