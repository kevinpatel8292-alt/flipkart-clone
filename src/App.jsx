import React, { useState, useEffect } from 'react';
import './App.css';
import { productsData } from './data/productsData';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import BannerCarousel from './components/BannerCarousel';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { Star, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState('light');

  // Search & Category Navigation States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Cart States
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Selected Product (Detail Modal) State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter States
  const [maxPrice, setMaxPrice] = useState(150000);
  const [onlyAssured, setOnlyAssured] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Sync theme attribute with state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Optional: Open cart drawer instantly when adding to cart
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearFilters = () => {
    setMaxPrice(150000);
    setOnlyAssured(false);
    setMinRating(0);
    setSearchQuery('');
    setSelectedCategory('all');
  };

  // Filtered Products Calculation
  const filteredProducts = productsData.filter((product) => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 2. Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(query);
      const matchCategory = product.category.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      if (!matchTitle && !matchCategory && !matchDesc) {
        return false;
      }
    }

    // 3. Price Filter
    if (product.price > maxPrice) {
      return false;
    }

    // 4. Assured Filter
    if (onlyAssured && !product.isAssured) {
      return false;
    }

    // 5. Rating Filter
    if (minRating > 0 && product.rating.rate < minRating) {
      return false;
    }

    return true;
  });

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Format currency for filter slider display
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="app">
      {/* Navbar header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        onCartOpen={() => setIsCartOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Category sub-header */}
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Carousel Section - show only on the main screen when no narrow category or search filters are applied */}
      {selectedCategory === 'all' && searchQuery.trim() === '' && (
        <BannerCarousel />
      )}

      {/* Main product shop catalog */}
      <main className="main-shop-container" style={{ marginTop: selectedCategory === 'all' && searchQuery.trim() === '' ? '0' : '24px' }}>
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header flex-between">
            <span className="flex-center" style={{ gap: '6px' }}>
              <SlidersHorizontal size={16} /> Filters
            </span>
            <button
              onClick={clearFilters}
              style={{ fontSize: '0.8rem', color: 'var(--fk-blue)', fontWeight: 700 }}
              className="flex-center"
            >
              <RefreshCw size={10} style={{ marginRight: '3px' }} /> Clear All
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h5 className="filter-title">Price Range</h5>
            <div className="price-slider-container">
              <input
                type="range"
                min="300"
                max="150000"
                step="500"
                className="price-range-input"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-inputs">
                <div className="price-box">Min: ₹300</div>
                <div style={{ color: 'var(--text-secondary)' }}>to</div>
                <div className="price-box">Max: {formatCurrency(maxPrice)}</div>
              </div>
            </div>
          </div>

          {/* Flipkart Assured */}
          <div className="filter-section">
            <h5 className="filter-title">Brand Assurance</h5>
            <label className="choice-item">
              <input
                type="checkbox"
                checked={onlyAssured}
                onChange={(e) => setOnlyAssured(e.target.checked)}
              />
              <span className="badge-assured" style={{ fontSize: '0.85rem' }}>
                <span>f</span>Assured
              </span>
            </label>
          </div>

          {/* Customer Rating Filter */}
          <div className="filter-section">
            <h5 className="filter-title">Customer Ratings</h5>
            <div className="rating-selector">
              {[4, 3, 2].map((stars) => (
                <label key={stars} className="rating-choice">
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={minRating === stars}
                    onChange={() => setMinRating(stars)}
                  />
                  <span className="flex-center" style={{ gap: '4px', fontSize: '0.85rem' }}>
                    {stars}★ & above
                  </span>
                </label>
              ))}
              <label className="rating-choice">
                <input
                  type="radio"
                  name="rating-filter"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                />
                <span style={{ fontSize: '0.85rem' }}>All Ratings</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Shop Grid Content */}
        <section className="products-content">
          <div className="products-grid-header flex-between">
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
              {filteredProducts.length > 0 ? (
                `Showing 1-${filteredProducts.length} of ${filteredProducts.length} results`
              ) : (
                '0 results found'
              )}
              {selectedCategory !== 'all' && (
                <span style={{ color: 'var(--fk-blue)', marginLeft: '6px' }}>
                  in {selectedCategory.toUpperCase()}
                </span>
              )}
            </div>
            {/* Quick stats indicator */}
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Sort: <strong style={{ color: 'var(--text-primary)' }}>Relevance</strong>
            </div>
          </div>

          {/* Grid list */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(prod) => setSelectedProduct(prod)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div
              className="flex-center"
              style={{
                flexDirection: 'column',
                padding: '64px 32px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                gap: '12px'
              }}
            >
              <Filter size={48} style={{ color: 'var(--text-secondary)' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No products matches your filters</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
                Try clearing selected items, expanding your pricing range, or searching for other items.
              </p>
              <button
                className="checkout-btn"
                style={{ width: 'auto', padding: '8px 24px' }}
                onClick={clearFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
