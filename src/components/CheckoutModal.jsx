import { useState } from 'react';
import { X, User, MapPin, Phone, CreditCard, ShoppingBag } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, totalAmount, onConfirm, items = [] }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  if (!isOpen) return null;

  // Format currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setAddress('');
    setNameError('');
    setPhoneError('');
    setAddressError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!name.trim()) {
      setNameError('Full name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!phone.trim() || phone.trim().length < 10) {
      setPhoneError('A valid 10-digit phone number is required.');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!address.trim()) {
      setAddressError('Delivery address is required.');
      valid = false;
    } else {
      setAddressError('');
    }

    if (!valid) return;

    onConfirm(name.trim(), { phone: phone.trim(), address: address.trim() });
    resetForm();
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
              {/* Name (Required) */}
              <div className="form-group">
                <label htmlFor="customer-name" className="form-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <div className={`input-wrapper ${nameError ? 'input-error' : ''}`}>
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="customer-name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) setNameError('');
                    }}
                    className="form-input"
                    autoFocus
                  />
                </div>
                {nameError && <span className="error-text">{nameError}</span>}
              </div>

              {/* Phone (Required) */}
              <div className="form-group">
                <label htmlFor="customer-phone" className="form-label">
                  Phone Number <span className="required-star">*</span>
                </label>
                <div className={`input-wrapper ${phoneError ? 'input-error' : ''}`}>
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    id="customer-phone"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                      if (e.target.value.trim()) setPhoneError('');
                    }}
                    className="form-input"
                  />
                </div>
                {phoneError && <span className="error-text">{phoneError}</span>}
              </div>

              {/* Address (Required) */}
              <div className="form-group">
                <label htmlFor="customer-address" className="form-label">
                  Delivery Address <span className="required-star">*</span>
                </label>
                <div className={`input-wrapper textarea-wrapper ${addressError ? 'input-error' : ''}`}>
                  <MapPin size={18} className="input-icon textarea-icon" />
                  <textarea
                    id="customer-address"
                    placeholder="Enter complete shipping address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (e.target.value.trim()) setAddressError('');
                    }}
                    className="form-input form-textarea"
                    rows={3}
                  />
                </div>
                {addressError && <span className="error-text">{addressError}</span>}
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
            
            {/* Product Image List */}
            <div className="checkout-items-list">
              {items.map((item, idx) => (
                <div key={idx} className="checkout-item-row">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="checkout-item-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="checkout-item-info">
                    <p className="checkout-item-title">{item.product.title}</p>
                    <span className="checkout-item-meta">Qty: {item.quantity} &nbsp;|&nbsp; {formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

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
