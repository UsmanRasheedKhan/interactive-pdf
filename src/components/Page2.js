import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page2.css';
import Navigation from './Navigation';
import Asset1 from '../assets/Asset-1.png';
import Asset2 from '../assets/Asset-2.png';
import OxfordExtendLogo from '../assets/Oxford-Extend-nobg.png';
import OUPLogo from '../assets/OUP-Logo.png';
// Carousel images
import SlidePic1 from '../assets/slide-pic-1.png';
import SlidePic2 from '../assets/slide-pic-2.png';
import SlidePic3 from '../assets/slide-pic-3.png';
import SlidePic4 from '../assets/slide-pic-4.png';

const Page2 = () => {
  // Get navigation function from React Router
  const navigate = useNavigate();
  
  // Popup state and zoom functionality
  const [showPopup, setShowPopup] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPopupImage, setCurrentPopupImage] = useState('');
  
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const slideImages = [SlidePic1, SlidePic2, SlidePic3, SlidePic4];
  const slideInterval = useRef(null);
  const slidesPerView = 3; // Number of slides visible at once
  const totalSlides = slideImages.length;
  
  // Handle zoom functionality
  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x
    } else {
      setZoomLevel(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
    }
  };
  
  // Handle image click with navigation instead of popup
  const handleImageClick = (index) => {
    switch(index) {
      case 0:
        navigate('/page3'); // First image - go to page 3 (section 1 is default)
        break;
      case 1:
        navigate('/page3', { state: { activeSection: 2 } }); // Second image - go to page 3, section 2
        break;
      case 2:
        navigate('/page4'); // Third image - go to page 4 (section 1 is default)
        break;
      case 3:
        navigate('/page4', { state: { activeSection: 2 } }); // Fourth image - go to page 4, section 2
        break;
      default:
        // If it's not one of these specific images, show popup as before
        openPopup(slideImages[index]);
    }
  };
  
  // Keep original popup function for other images or cases
  const openPopup = (imageUrl) => {
    setCurrentPopupImage(imageUrl);
    setShowPopup(true);
    setZoomLevel(1); // Reset zoom when opening
  };
  
  // Navigate carousel - limited to valid indexes for showing 3 slides at a time
  const navigateCarousel = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev >= totalSlides - slidesPerView ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? totalSlides - slidesPerView : prev - 1));
    }
  };
  
  // Auto-scroll carousel
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prev) => 
          prev >= totalSlides - slidesPerView ? 0 : prev + 1
        );
      }, 3000);
    }
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPaused, currentIndex, totalSlides]);

  return (
    <div className="book-container">
      <nav className="book-navbar">
        <div className="logo-container">
          <img src={OxfordExtendLogo} alt="Oxford Extend" className="oxford-logo" />
        </div>
        <div className="logo-container right-logo">
          <img src={OUPLogo} alt="Oxford University Press" className="oup-logo" />
        </div>
      </nav>
      
      <Navigation />
      
      <div className="image-row">
        <div className="image-item">
          <img src={Asset1} alt="Asset 1" />
        </div>
        <div className="image-item">
          <img src={Asset2} alt="Asset 2" />
        </div>
        <div className="course-info">
          <div className="course-topics">
            <div className="course-part">Part 1: Ancient Civilisations</div>
            <div className="course-unit">Unit 2: Ancient Egypt</div>
          </div>
        </div>
      </div>

      {/* Full-width multi-image carousel with navigation on click */}
      <div className="carousel-container">
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={() => navigateCarousel('prev')}
          aria-label="Previous slide"
        >
          &#9664;
        </button>
        
        <div 
          className="carousel-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {slideImages.map((image, index) => (
            <div 
              key={index} 
              className="carousel-slide"
              onClick={() => handleImageClick(index)}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={() => navigateCarousel('next')}
          aria-label="Next slide"
        >
          &#9654;
        </button>
        
        <div className="carousel-indicators">
          {Array.from({ length: Math.max(1, totalSlides - slidesPerView + 1) }).map((_, index) => (
            <button 
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide group ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Image popup with zoom functionality */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowPopup(false)}>×</button>
            <div className="zoom-controls">
              <button className="zoom-button" onClick={() => handleZoom('in')}>+</button>
              <button className="zoom-button" onClick={() => handleZoom('out')}>−</button>
            </div>
            <div className="popup-body">
              <img 
                src={currentPopupImage}
                alt="Enlarged view" 
                className="popup-image"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page2;