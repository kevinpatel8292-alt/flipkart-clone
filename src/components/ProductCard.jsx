import React from 'react';
import { Star, Plus } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct, onAddToCart }) {
  // Format currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent opening product detail modal
    onAddToCart(product);
  };

  return (
    <div className="product-card" onClick={() => onSelectProduct(product)}>
      {/* Product Image */}
      <div className="product-card-img-wrapper">
        <img src={product.thumbnail} alt={product.title} className="product-card-img" />
      </div>

      {/* Product Information */}
      <div className="product-card-info">
        <h4 className="product-card-title">{product.title}</h4>

        {/* Rating Row */}
        <div className="product-card-rating-row">
          <span className="rating-badge">
            {product.rating.rate} <Star size={10} fill="#fff" />
          </span>
          <span className="rating-count">({product.rating.count.toLocaleString()})</span>
        </div>

        {/* Price Row */}
        <div className="product-card-price-row">
          <span className="price-actual">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
              <span className="price-discount">{product.discountPercentage}% off</span>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="product-card-footer">
          {product.isAssured ? (
            <div className="badge-assured">
              <span>f</span>Assured
            </div>
          ) : (
            <div /> // Placeholder
          )}
          <button className="card-add-btn" onClick={handleAddToCart}>
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
