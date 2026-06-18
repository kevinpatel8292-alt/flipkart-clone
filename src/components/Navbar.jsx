import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, ChevronDown, User, Sun, Moon, Bell, HelpCircle, Briefcase, Download, LogOut, Heart, Gift, ShieldAlert } from 'lucide-react';
import { productsData } from '../data/productsData';

export default function Navbar({ searchQuery, setSearchQuery, cartCount, onCartOpen, theme, toggleTheme, onSelectProduct, onWishlistOpen }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionRef = useRef(null);

  // Close search suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions as search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = productsData.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
    setSuggestions(filtered);
  }, [searchQuery]);

  const handleSuggestionClick = (product) => {
    onSelectProduct(product);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-main">SwiftShop</span>
          <span className="logo-sub">
            Explore <span>Plus</span>
            <span style={{ color: 'var(--fk-yellow)', fontSize: '0.8rem', marginLeft: '2px' }}>✦</span>
          </span>
        </div>

        {/* Search */}
        <div className="navbar-search-wrapper" ref={suggestionRef}>
          <div className="navbar-search">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            <button className="search-button">
              <Search size={20} />
            </button>
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <img src={product.thumbnail} alt={product.title} className="suggestion-img" />
                  <div className="suggestion-text text-truncate">
                    <div style={{ fontWeight: 500 }}>{product.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      In {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions Menu */}
        <div className="navbar-actions">
          {/* Login Dropdown */}
          <div className="nav-dropdown-trigger">
            <button className="login-btn flex-center">
              Login <ChevronDown size={14} style={{ marginLeft: '4px' }} />
            </button>
            <div className="dropdown-menu">
              <div className="dropdown-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontWeight: 600 }}>New customer?</span>
                <a href="#" style={{ color: 'var(--fk-blue)', fontWeight: 600, marginLeft: 'auto' }}>Sign Up</a>
              </div>
              <a href="#" className="dropdown-item">
                <User size={16} /> My Profile
              </a>
              <button
                className="dropdown-item"
                style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit', color: 'inherit' }}
                onClick={(e) => {
                  e.preventDefault();
                  onWishlistOpen();
                }}
              >
                <Heart size={16} /> Wishlist
              </button>
              <a href="#" className="dropdown-item">
                <Gift size={16} /> Orders & Rewards
              </a>
              <a href="#" className="dropdown-item">
                <LogOut size={16} /> Logout
              </a>
            </div>
          </div>

          <a href="#" style={{ fontWeight: 600, fontSize: '0.95rem' }} className="flex-center">
            Become a Seller
          </a>

          {/* More Dropdown */}
          <div className="nav-dropdown-trigger">
            More <ChevronDown size={14} style={{ marginLeft: '4px' }} />
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <Bell size={16} /> Notification Prefs
              </a>
              <a href="#" className="dropdown-item">
                <HelpCircle size={16} /> 24x7 Customer Support
              </a>
              <a href="#" className="dropdown-item">
                <Briefcase size={16} /> Advertise
              </a>
              <a href="#" className="dropdown-item">
                <Download size={16} /> Download App
              </a>
            </div>
          </div>

          {/* Cart Button */}
          <button className="nav-cart-btn" onClick={onCartOpen}>
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge flex-center">{cartCount}</span>}
          </button>

          {/* Theme Toggle Button */}
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle SwiftShop Plus Mode">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
