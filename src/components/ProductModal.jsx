import React, { useState } from 'react';
import { X, Star, ShoppingCart, Shield, Truck, Award, Tag } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [activeImg, setActiveImg] = useState(product.images[0] || product.thumbnail);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');

  // Format currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length !== 6 || isNaN(pincode)) {
      setDeliveryStatus('Please enter a valid 6-digit Pincode.');
      return;
    }
    // Simulate pincode response
    const deliveryDays = Math.floor(Math.random() * 3) + 2; // 2 to 4 days
    const date = new Date();
    date.setDate(date.getDate() + deliveryDays);
    const dateString = date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
    setDeliveryStatus(`Delivery by ${dateString} | Free Delivery`);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="product-detail-grid">
          {/* Left Column: Image Gallery & Buy Buttons */}
          <div className="product-detail-left">
            <div className="gallery-main-wrapper">
              <img src={activeImg} alt={product.title} className="gallery-main-img" />
            </div>

            {/* Thumbnail Row */}
            {product.images && product.images.length > 1 && (
              <div className="gallery-thumbs">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`gallery-thumb ${activeImg === img ? 'active' : ''}`}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt="Product thumb" />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="modal-action-buttons">
              <button className="modal-btn modal-btn-cart" onClick={handleAddToCart}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                className="modal-btn modal-btn-buy"
                onClick={() => {
                  alert('Order placed successfully! (Simulation)');
                  onAddToCart(product);
                  onClose();
                }}
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Column: Information, Specs & Reviews */}
          <div className="product-detail-right">
            <span className="detail-category">{product.category}</span>
            <h2 className="detail-title">{product.title}</h2>

            {/* Ratings Row */}
            <div className="detail-ratings-row">
              <span className="rating-badge">
                {product.rating.rate} <Star size={10} fill="#fff" />
              </span>
              <span className="rating-count" style={{ fontWeight: 600, color: 'var(--fk-blue)' }}>
                {product.rating.count.toLocaleString()} Ratings & Reviews
              </span>
              {product.isAssured && (
                <div className="badge-assured" style={{ fontSize: '0.85rem' }}>
                  <span>f</span>Assured
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="detail-price-box">
              <div className="detail-price-main">
                <span className="detail-price">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="detail-price-orig">{formatPrice(product.originalPrice)}</span>
                    <span className="detail-price-disc">{product.discountPercentage}% Off</span>
                  </>
                )}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--fk-green)', fontWeight: 600, marginTop: '4px' }}>
                Special price savings applied!
              </div>
            </div>

            {/* Bank Offers */}
            <div className="offers-section">
              <h3 className="offers-title">Available Offers</h3>
              <ul className="offers-list">
                <li className="offer-item">
                  <Tag size={14} className="offer-tag" />
                  <span><strong>Bank Offer:</strong> 10% Instant Discount on HDFC Bank Credit Card Transactions, up to ₹1,250.</span>
                </li>
                <li className="offer-item">
                  <Tag size={14} className="offer-tag" />
                  <span><strong>Bank Offer:</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card.</span>
                </li>
                <li className="offer-item">
                  <Tag size={14} className="offer-tag" />
                  <span><strong>Partner Offer:</strong> Buy this product and get up to ₹500 off on next purchase.</span>
                </li>
              </ul>
            </div>

            {/* Delivery Estimator */}
            <div className="pincode-checker">
              <h3 className="pincode-title flex-center" style={{ justifyContent: 'flex-start', gap: '6px' }}>
                <Truck size={16} /> Delivery Estimate
              </h3>
              <form onSubmit={handlePincodeCheck} className="pincode-input-row">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit pincode"
                  className="pincode-input"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                />
                <button type="submit" className="pincode-btn">Check</button>
              </form>
              {deliveryStatus && <p className="pincode-status">{deliveryStatus}</p>}
            </div>

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="specs-section">
                <h3 className="specs-title">Highlights</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {product.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="specs-section">
                <h3 className="specs-title">Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="specs-row">
                        <td className="specs-key">{key}</td>
                        <td className="specs-val">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="reviews-section">
                <h3 className="reviews-title flex-center" style={{ justifyContent: 'flex-start', gap: '6px' }}>
                  <Award size={16} /> Ratings & Reviews
                </h3>
                <div className="reviews-list">
                  {product.reviews.map((rev, idx) => (
                    <div key={idx} className="review-card">
                      <div className="review-header">
                        <span className="rating-badge" style={{ padding: '1px 5px', fontSize: '0.7rem' }}>
                          {rev.rating} <Star size={8} fill="#fff" />
                        </span>
                        <span className="review-author">{rev.name}</span>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <p className="review-text">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
