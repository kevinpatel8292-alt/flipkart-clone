import React from 'react';
import { Home, PlayCircle, Grid, User, ShoppingCart } from 'lucide-react';

export default function MobileBottomNav({ cartCount, onCartOpen }) {
  return (
    <div className="mobile-bottom-nav">
      <div className="mbn-item active">
        <Home size={22} />
        <span>Home</span>
      </div>
      <div className="mbn-item">
        <PlayCircle size={22} />
        <span>Play</span>
      </div>
      <div className="mbn-item">
        <Grid size={22} />
        <span>Categories</span>
      </div>
      <div className="mbn-item">
        <User size={22} />
        <span>Account</span>
      </div>
      <div className="mbn-item" onClick={onCartOpen}>
        <div className="mbn-cart-icon">
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className="mbn-badge">{cartCount}</span>}
        </div>
        <span>Cart</span>
      </div>
    </div>
  );
}
