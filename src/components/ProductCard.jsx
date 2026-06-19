import { Star, Plus, Heart } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct, onAddToCart, onPlaceOrder, isWishlisted, onToggleWishlist }) {
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

  const handleBuyNow = (e) => {
    e.stopPropagation(); // Prevent opening product detail modal
    onPlaceOrder(product.price);
  };

  return (
    <div className="product-card" onClick={() => onSelectProduct(product)}>
      {/* Product Image */}
      <div className="product-card-img-wrapper">
        <img src={product.thumbnail} alt={product.title} className="product-card-img" />
        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title="Toggle Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#ff3f6c' : 'none'} stroke={isWishlisted ? '#ff3f6c' : 'var(--text-secondary)'} />
        </button>
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
              <span>s</span>Assured
            </div>
          ) : (
            <div /> // Placeholder
          )}
          <div className="card-action-group" style={{ display: 'flex', gap: '6px' }}>
            <button className="card-add-btn" onClick={handleAddToCart}>
              <Plus size={12} /> Add
            </button>
            <button className="card-buy-btn" onClick={handleBuyNow}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
