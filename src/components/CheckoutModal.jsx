import { useState } from 'react';
import { X, User, MapPin, Phone, CreditCard, ShoppingBag } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, totalAmount, onConfirm }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Format currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is compulsory. Please enter your name to confirm the order.');
      return;
    }
    setError('');
    onConfirm(name.trim(), { phone: phone.trim(), address: address.trim() });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content checkout-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Checkout">
          <X size={20} />
        </button>

        <div className="checkout-grid">
          {/* Form Side */}
          <div className="checkout-form-section">
            <div className="checkout-header">
              <h2 className="checkout-title">Delivery & Contact Details</h2>
              <p className="checkout-subtitle">Please fill in your details to confirm your order.</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Name (Compulsory) */}
              <div className="form-group">
                <label htmlFor="customer-name" className="form-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="customer-name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) setError('');
                    }}
                    className="form-input"
                    autoFocus
                  />
                </div>
                {error && <span className="error-text">{error}</span>}
              </div>

              {/* Phone (Optional) */}
              <div className="form-group">
                <label htmlFor="customer-phone" className="form-label">
                  Phone Number <span className="optional-tag">(Optional)</span>
                </label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    id="customer-phone"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Address (Optional) */}
              <div className="form-group">
                <label htmlFor="customer-address" className="form-label">
                  Delivery Address <span className="optional-tag">(Optional)</span>
                </label>
                <div className="input-wrapper textarea-wrapper">
                  <MapPin size={18} className="input-icon textarea-icon" />
                  <textarea
                    id="customer-address"
                    placeholder="Enter complete shipping address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-input form-textarea"
                    rows={3}
                  />
                </div>
              </div>

              {/* Payment Method Option (Visual only, locked to Cash on Delivery) */}
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <div className="payment-method-selector">
                  <div className="payment-option active">
                    <CreditCard size={18} className="payment-icon" />
                    <div className="payment-info">
                      <span className="payment-name">Cash on Delivery (COD)</span>
                      <span className="payment-desc">Pay with cash upon delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="checkout-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary checkout-confirm-btn">
                  Confirm Order
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Side */}
          <div className="checkout-summary-section">
            <h3 className="summary-title-section flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
              <ShoppingBag size={18} /> Order Summary
            </h3>
            
            <div className="checkout-summary-box">
              <div className="summary-item-row">
                <span>Items Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="summary-item-row">
                <span>Shipping & Handling</span>
                <span style={{ color: 'var(--fk-green)', fontWeight: 600 }}>FREE</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-total-row">
                <span>Total Amount to Pay</span>
                <span className="final-price">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="trust-badge">
              <div className="shield-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="var(--fk-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="trust-text">
                <strong>100% Safe & Secure Payments</strong>
                <p>Your transaction is secured with industry standard encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
