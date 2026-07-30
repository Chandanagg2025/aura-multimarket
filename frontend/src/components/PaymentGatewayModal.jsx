import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { processPaymentApi, verifyOtpApi } from '../api/client';

export default function PaymentGatewayModal() {
  const { cart, appliedCoupon, isCheckoutOpen, setIsCheckoutOpen, placeOrder, showToast } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Processing & OTP
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Form State
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });

  const [cardData, setCardData] = useState({ number: '', holder: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [otpInput, setOtpInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('Authenticating Gateway...');
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (appliedCoupon && appliedCoupon.type === 'percent') {
    discount = (subtotal * appliedCoupon.value) / 100;
  }
  const tax = subtotal * 0.08;
  const isFreeShip = subtotal >= 1000 || (appliedCoupon && appliedCoupon.type === 'shipping');
  const shipping = isFreeShip || subtotal === 0 ? 0 : 100.00;
  const total = Math.max(0, subtotal - discount + tax + shipping);

  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const proceedToPaymentMethod = (e) => {
    e.preventDefault();
    if (!shippingData.fullName || !shippingData.phone || !shippingData.address || !shippingData.city) {
      showToast('Please complete all required delivery details!', 'warning');
      return;
    }
    setStep(2);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (cardData.number.replace(/\s/g, '').length < 15 || !cardData.expiry || !cardData.cvv) {
      showToast('Please enter valid card credentials!', 'warning');
      return;
    }
    // Open 3D Secure OTP Step
    setStep(3);
    setIsProcessing(true);
    setProcessingMsg('Connecting with 3D-Secure Bank Server...');
    setTimeout(() => {
      setIsProcessing(false);
      setShowOtpDialog(true);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtpApi(otpInput);
      if (res.verified) {
        executePayment('Credit/Debit Card (3D-Secure Verified)');
      } else {
        showToast(res.error || 'Invalid OTP code!', 'danger');
      }
    } catch (err) {
      showToast('Error verifying OTP code', 'danger');
    }
  };

  const executePayment = async (methodLabel) => {
    setStep(3);
    setShowOtpDialog(false);
    setIsProcessing(true);
    setProcessingMsg(`Encrypting & Authorizing Payment via ${methodLabel}...`);

    try {
      const paymentResult = await processPaymentApi({ method: methodLabel, amount: total, customerInfo: shippingData });
      
      if (paymentResult.success) {
        setProcessingMsg('Payment Verified! Saving order into SQLite Database...');
        setTimeout(() => {
          placeOrder({
            customerName: shippingData.fullName,
            customerEmail: shippingData.email,
            customerPhone: shippingData.phone,
            shippingAddress: `${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.pincode}`,
            paymentMethod: methodLabel,
            subtotal,
            discount,
            tax,
            shippingFee: shipping,
            totalPaid: total,
            items: cart
          });
        }, 1000);
      }
    } catch (err) {
      setIsProcessing(false);
      showToast('Payment processing error', 'danger');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '950px' }}>
        
        {/* Header */}
        <div className="checkout-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <i className="fa-solid fa-shield-halved text-success" style={{ fontSize: '2rem', color: '#10B981' }}></i>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Shree Pratham Secure Checkout Gateway</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="fa-solid fa-lock"></i> 256-Bit SSL Encrypted Node/Express + SQLite Portal</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setIsCheckoutOpen(false)}><i className="fa-solid fa-xmark"></i></button>
        </div>

        {/* Step Tracker */}
        <div className="checkout-steps">
          <div className={`step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
            <span className="step-num">1</span><span>Shipping Details</span>
          </div>
          <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
            <span className="step-num">2</span><span>Payment Method</span>
          </div>
          <div className={`step-item ${step === 3 ? 'active' : ''}`}>
            <span className="step-num">3</span><span>Verification</span>
          </div>
        </div>

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '30px' }}>
            <form onSubmit={proceedToPaymentMethod}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '16px' }}><i className="fa-solid fa-truck-ramp-box"></i> Delivery Address</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" required value={shippingData.fullName} onChange={handleShippingChange} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" required value={shippingData.email} onChange={handleShippingChange} placeholder="john@example.com" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required value={shippingData.phone} onChange={handleShippingChange} placeholder="+91 98765-43210" />
                </div>
                <div className="form-group">
                  <label>Zip/Postal Code *</label>
                  <input type="text" name="pincode" required value={shippingData.pincode} onChange={handleShippingChange} placeholder="400001" />
                </div>
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input type="text" name="address" required value={shippingData.address} onChange={handleShippingChange} placeholder="123 Luxury Boulevard, Suite 400" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" required value={shippingData.city} onChange={handleShippingChange} placeholder="Mumbai" />
                </div>
                <div className="form-group">
                  <label>State/Province *</label>
                  <input type="text" name="state" required value={shippingData.state} onChange={handleShippingChange} placeholder="MH" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '14px' }}>
                Continue to Payment Method <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>Order Summary</h4>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '8px' }}>
                  <span>{item.quantity}x {item.name}</span>
                  <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                </div>
              ))}
              <hr style={{ borderColor: 'var(--border-color)', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.1rem', color: '#FFF' }}>
                <span>Total Payable:</span><span style={{ color: 'var(--accent-primary)' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment Methods Panel */}
        {step === 2 && (
          <div>
            <div className="payment-tabs-container">
              <div>
                <button className={`pay-method-tab ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                  <i className="fa-solid fa-mobile-screen-button" style={{ fontSize: '1.4rem' }}></i>
                  <div><strong>UPI / QR Code</strong><small>GPay, PhonePe, Paytm</small></div>
                </button>

                <button className={`pay-method-tab ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                  <i className="fa-solid fa-credit-card" style={{ fontSize: '1.4rem' }}></i>
                  <div><strong>Credit / Debit Card</strong><small>Visa, Mastercard, Amex</small></div>
                </button>

                <button className={`pay-method-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
                  <i className="fa-solid fa-building-columns" style={{ fontSize: '1.4rem' }}></i>
                  <div><strong>Net Banking</strong><small>All Global Banks</small></div>
                </button>

                <button className={`pay-method-tab ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                  <i className="fa-solid fa-money-bill-wave" style={{ fontSize: '1.4rem' }}></i>
                  <div><strong>Cash on Delivery</strong><small>Pay upon arrival</small></div>
                </button>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {paymentMethod === 'upi' && (
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '10px' }}><i className="fa-solid fa-qrcode"></i> Instant Scan & Pay via UPI</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Scan dynamic QR code with GPay, PhonePe, Paytm, or BHIM.</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
                      <div style={{ background: '#FFF', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=shreepratham@expressbank&pn=Shree%20Pratham%20Multi-Market&am=${total.toFixed(2)}&cu=INR`)}`} alt="UPI QR" style={{ width: '130px', height: '130px' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', marginBottom: '6px' }}>VPA: <code className="code-badge">shreepratham@expressbank</code></div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF' }}>Amount: ₹{total.toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    <button className="btn btn-primary btn-block" onClick={() => executePayment('UPI Mobile App')}>
                      <i className="fa-solid fa-circle-check"></i> Simulate Mobile App Payment Approval
                    </button>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <form onSubmit={handleCardSubmit}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '14px' }}><i className="fa-solid fa-credit-card"></i> Credit / Debit Card</h4>
                    
                    <div className="form-group">
                      <label>Card Number *</label>
                      <input type="text" placeholder="4532 1111 2222 3333" maxLength="19" required value={cardData.number} onChange={(e) => setCardData({ ...cardData, number: e.target.value })} />
                    </div>

                    <div className="form-group">
                      <label>Cardholder Name *</label>
                      <input type="text" placeholder="JOHN DOE" required value={cardData.holder} onChange={(e) => setCardData({ ...cardData, holder: e.target.value })} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group">
                        <label>Expiry (MM/YY) *</label>
                        <input type="text" placeholder="12/28" maxLength="5" required value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input type="password" placeholder="•••" maxLength="4" required value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })} />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '14px' }}>
                      Pay ₹{total.toLocaleString('en-IN')} <i className="fa-solid fa-lock"></i>
                    </button>
                  </form>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '14px' }}><i className="fa-solid fa-building-columns"></i> Net Banking</h4>
                    <div className="form-group">
                      <label>Select Your Bank</label>
                      <select className="sort-select" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} style={{ width: '100%' }}>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>

                    <button className="btn btn-primary btn-block" onClick={() => executePayment(`Net Banking (${selectedBank})`)} style={{ marginTop: '20px' }}>
                      Proceed to Bank Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </button>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '14px' }}><i className="fa-solid fa-hand-holding-dollar"></i> Cash / Pay on Delivery</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Pay cash or card upon package delivery to your doorstep.</p>
                    <button className="btn btn-primary btn-block" onClick={() => executePayment('Cash on Delivery (COD)')}>
                      Confirm Cash on Delivery Order <i className="fa-solid fa-circle-check"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button className="btn btn-secondary" onClick={() => setStep(1)} style={{ marginTop: '20px' }}>
              <i className="fa-solid fa-arrow-left"></i> Back to Delivery Form
            </button>
          </div>
        )}

        {/* Step 3: Processing & OTP Dialog */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            {isProcessing && (
              <div>
                <div style={{ width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
                <h3>{processingMsg}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Please do not close or refresh this page.</p>
              </div>
            )}

            {showOtpDialog && (
              <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-primary)', maxWidth: '500px', margin: '0 auto' }}>
                <h4 style={{ marginBottom: '12px' }}><i className="fa-solid fa-shield-halved text-success"></i> 3D-Secure One-Time Password</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>For testing, enter test OTP: <code className="code-badge">123456</code></p>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit OTP" 
                    value={otpInput} 
                    onChange={(e) => setOtpInput(e.target.value)} 
                    style={{ flexGrow: 1, textAlign: 'center', fontSize: '1.1rem', letterSpacing: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px', color: '#FFF' }}
                  />
                  <button className="btn btn-primary" onClick={handleVerifyOtp}>Verify</button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
