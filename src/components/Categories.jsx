import React from 'react';
import { categoriesList } from '../data/productsData';

export default function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="categories-container">
      <div className="categories-list">
        {categoriesList.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.img ? (
              <img src={category.img} alt={category.name} className="category-img" />
            ) : (
              // Fallback element for "All Products" or cases without image
              <div
                className="flex-center"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--fk-light-blue)',
                  color: 'var(--fk-blue)',
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}
              >
                ALL
              </div>
            )}
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
