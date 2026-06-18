import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onPlaceOrder }) {
  // Format currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate pricing breakdown
  const originalPriceSum = cartItems.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const actualPriceSum = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountSum = originalPriceSum - actualPriceSum;
  const deliveryCharges = actualPriceSum > 500 || actualPriceSum === 0 ? 0 : 40;
  const totalAmount = actualPriceSum + deliveryCharges;

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && <div className="cart-drawer-overlay" onClick={onClose} />}

      {/* Drawer Panel */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="cart-header flex-between">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            My Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </h3>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Drawer Items Container */}
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={64} style={{ strokeWidth: 1, color: 'var(--text-secondary)' }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>Your cart is empty!</p>
              <p style={{ fontSize: '0.82rem', textAlign: 'center' }}>Add items to it now to shop.</p>
              <button
                className="checkout-btn"
                style={{ width: 'auto', padding: '10px 24px', marginTop: '8px' }}
                onClick={onClose}
              >
                Shop Now
              </button>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                {/* Item Image */}
                <div className="cart-item-img-box">
                  <img src={product.thumbnail} alt={product.title} />
                </div>

                {/* Item Info */}
                <div className="cart-item-details">
                  <h4 className="cart-item-title" title={product.title}>
                    {product.title}
                  </h4>
                  <div className="cart-item-price-row">
                    <span className="cart-item-price">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="cart-item-orig">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="cart-item-controls">
                    <div className="qty-counter">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-number">{quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button className="remove-item-btn" onClick={() => onRemoveItem(product.id)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Summary Box */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h4 className="summary-title">Price Details</h4>
            
            <div className="summary-row">
              <span>Price ({cartItems.length} items)</span>
              <span>{formatPrice(originalPriceSum)}</span>
            </div>
            
            <div className="summary-row">
              <span>Discount</span>
              <span style={{ color: 'var(--fk-green)' }}>-{formatPrice(discountSum)}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span style={{ color: deliveryCharges === 0 ? 'var(--fk-green)' : 'inherit' }}>
                {deliveryCharges === 0 ? 'FREE' : formatPrice(deliveryCharges)}
              </span>
            </div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>

            {discountSum > 0 && (
              <div className="savings-label">
                You will save {formatPrice(discountSum + (deliveryCharges === 0 ? 40 : 0))} on this order!
              </div>
            )}

            <button
              className="checkout-btn"
              onClick={() => {
                onPlaceOrder(totalAmount);
              }}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
