import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function MobileProductScroller({ title, products, onSelectProduct }) {
  return (
    <div className="mobile-product-scroller">
      <div className="mps-header">
        <h3>{title}</h3>
      </div>
      <div className="mps-container">
        {products.map((product) => (
          <div className="mps-card" key={product.id} onClick={() => onSelectProduct(product)}>
            <div className="mps-img-wrapper">
              <img src={product.thumbnail || product.image} alt={product.title} />
            </div>
            <div className="mps-info">
              <span className="mps-category">{product.category}</span>
              <span className="mps-title text-truncate">{product.title}</span>
            </div>
          </div>
        ))}
        {/* View All Card */}
        <div className="mps-card view-all">
          <div className="mps-img-wrapper flex-center">
            <div className="view-all-circle">
              <ArrowRight size={20} color="#2874f0" />
            </div>
          </div>
          <div className="mps-info" style={{ textAlign: 'center' }}>
            <span className="mps-title">View All</span>
          </div>
        </div>
      </div>
    </div>
  );
}
