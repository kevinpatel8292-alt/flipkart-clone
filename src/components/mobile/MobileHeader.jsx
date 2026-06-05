import React from 'react';
import { Search, Camera, ScanLine, Home, Coins, Plane, ShoppingBag } from 'lucide-react';
import { categoriesList } from '../../data/productsData';

export default function MobileHeader({ searchQuery, setSearchQuery }) {
  return (
    <div className="mobile-header">
      {/* Top Tabs */}
      <div className="mh-tabs">
        <div className="mh-tab active">
          <span className="fk-icon">f</span> Flipkart
        </div>
        <div className="mh-tab">
          <Plane size={14} color="#f15b22" /> Travel
        </div>
        <div className="mh-tab">
          <ShoppingBag size={14} color="#388e3c" /> Grocery
        </div>
      </div>

      {/* Address & Coins */}
      <div className="mh-address-bar">
        <div className="mh-address">
          <Home size={14} />
          <span className="mh-address-text"><strong>HOME</strong> Shiv sakti electronics, Khergam road, ch...</span>
          <span className="mh-chevron">▼</span>
        </div>
        <div className="mh-coins">
          <div className="mh-coin-icon">
            <Coins size={12} color="#fff" />
          </div>
          <span>15</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mh-search-wrapper">
        <div className="mh-search-box">
          <Search size={18} color="#878787" />
          <input 
            type="text" 
            placeholder="mobiles" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Camera size={18} color="#878787" />
        </div>
        <div className="mh-qr-scan">
          <ScanLine size={24} color="#fff" />
        </div>
      </div>

      {/* Categories Row */}
      <div className="mh-categories">
        {categoriesList.slice(0, 5).map((cat, idx) => (
          <div className={`mh-cat-item ${idx === 0 ? 'active' : ''}`} key={cat.id || idx}>
            <div className="mh-cat-icon">
              {cat.img ? (
                <img src={cat.img} alt={cat.name} />
              ) : (
                <div style={{width:'24px', height:'24px', background:'#eee', borderRadius:'4px'}}></div>
              )}
            </div>
            <span>{cat.name === 'All' ? 'For You' : cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
