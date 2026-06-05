import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bannerBanners } from '../data/productsData';

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerBanners.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const nextSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev + 1) % bannerBanners.length);
    startAutoPlay();
  };

  const prevSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev - 1 + bannerBanners.length) % bannerBanners.length);
    startAutoPlay();
  };

  const setSlide = (index) => {
    stopAutoPlay();
    setCurrentSlide(index);
    startAutoPlay();
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {bannerBanners.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ background: slide.bgColor, color: slide.textColor }}
          >
            <div className="slide-content">
              {slide.badge && <span className="slide-badge">{slide.badge}</span>}
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button className="slide-btn">Shop Now</button>
            </div>
            <div className="slide-image-wrapper">
              <img src={slide.image} alt={slide.title} className="slide-img" />
            </div>
          </div>
        ))}
      </div>

      {/* Nav Arrows */}
      <button className="carousel-arrow prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="carousel-arrow next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      {/* Nav Dots */}
      <div className="carousel-dots">
        {bannerBanners.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
