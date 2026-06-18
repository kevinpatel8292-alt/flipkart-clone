import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistDrawer({ isOpen, onClose, wishlistItems, onRemoveFromWishlist, onAddToCart }) {
  // Format currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && <div className="wishlist-drawer-overlay" onClick={onClose} />}

      {/* Drawer Panel */}
      <div className={`wishlist-drawer ${isOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="wishlist-header flex-between">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} fill="#ff3f6c" stroke="#ff3f6c" /> My Wishlist ({wishlistItems.length})
          </h3>
          <button className="wishlist-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Drawer Items Container */}
        <div className="wishlist-items-container">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist-state">
              <Heart size={64} style={{ strokeWidth: 1, color: 'var(--text-secondary)' }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>Your wishlist is empty!</p>
              <p style={{ fontSize: '0.82rem', textAlign: 'center' }}>Save your favorite items here to purchase later.</p>
              <button
                className="checkout-btn"
                style={{ width: 'auto', padding: '10px 24px', marginTop: '8px' }}
                onClick={onClose}
              >
                Explore Products
              </button>
            </div>
          ) : (
            wishlistItems.map((product) => (
              <div key={product.id} className="wishlist-item">
                {/* Item Image */}
                <div className="wishlist-item-img-box">
                  <img src={product.thumbnail} alt={product.title} />
                </div>

                {/* Item Info */}
                <div className="wishlist-item-details">
                  <h4 className="wishlist-item-title" title={product.title}>
                    {product.title}
                  </h4>
                  <div className="wishlist-item-price-row">
                    <span className="wishlist-item-price">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="wishlist-item-orig">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="wishlist-item-controls">
                    <button
                      className="wishlist-add-to-cart-btn"
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product.id);
                      }}
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <button
                      className="wishlist-remove-btn"
                      onClick={() => onRemoveFromWishlist(product.id)}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
