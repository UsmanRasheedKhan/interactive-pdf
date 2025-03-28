import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Page3.css';
import Navigation from './Navigation';
import Asset1 from '../assets/Asset-1.png';
import Asset2 from '../assets/Asset-2.png';
import OxfordExtendLogo from '../assets/Oxford-Extend-nobg.png';
import OUPLogo from '../assets/OUP-Logo.png';
import SlidePic1 from '../assets/slide-pic-1.png';
import SlidePic2 from '../assets/slide-pic-2.png';

const Page3 = () => {
  // Get location to check for passed state
  const location = useLocation();
  
  // Popup state and zoom functionality
  const [showPopup, setShowPopup] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPopupImage, setCurrentPopupImage] = useState('');
  
  // Section navigation state - use state from navigation if available
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || 1
  );
  
  // Set active section from navigation when location changes
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location]);
  
  // Handle zoom functionality
  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x
    } else {
      setZoomLevel(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
    }
  };
  
  // Open popup with clicked image
  const openPopup = (imageUrl) => {
    setCurrentPopupImage(imageUrl);
    setShowPopup(true);
    setZoomLevel(1); // Reset zoom when opening
  };
  
  // Toggle between sections
  const toggleSection = () => {
    setActiveSection(prev => (prev === 1 ? 2 : 1));
  };

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
      
      {/* Replace the old navigation with the new component */}
      <Navigation />
      
      {/* Image row below navbar */}
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

      {/* Two-column layout (50/50) with navigation */}
      <div className="two-section-layout">
        {/* Dark section */}
        <div className={`section dark-section ${activeSection === 1 ? 'active' : 'inactive'}`}>
          <div className="section-image-container">
            <img 
              src={SlidePic1} 
              alt="Historical Artifact 1" 
              className="section-image"
              onClick={() => openPopup(SlidePic1)}
            />
          </div>
          <div className="section-text">
            <h3>Ancient Egyptian Artifact</h3>
            <p>This remarkable piece dates back to the early dynastic period. Created around 3100 BCE, it represents one of the finest examples of early Egyptian craftsmanship discovered in the Nile Delta region.</p>
            <p>Historians believe this artifact was used in religious ceremonies honoring the god Osiris. The intricate hieroglyphics along the base describe a ritual of rebirth and transformation.</p>
          </div>
        </div>
        
        {/* Light section */}
        <div className={`section light-section ${activeSection === 2 ? 'active' : 'inactive'}`}>
          <div className="section-image-container">
            <img 
              src={SlidePic2} 
              alt="Historical Artifact 2" 
              className="section-image"
              onClick={() => openPopup(SlidePic2)}
            />
          </div>
          <div className="section-text">
            <h3>Temple Wall Inscriptions</h3>
            <p>This detailed photograph shows inscriptions from the Temple of Karnak, one of the most significant religious complexes in ancient Egypt. The carvings depict royal ceremonies and offerings to the god Amun-Ra.</p>
            <p>These inscriptions provide valuable insights into the religious practices and political structure of the New Kingdom period. The preservation of such detailed imagery allows scholars to reconstruct important aspects of daily life in ancient Egypt.</p>
          </div>
        </div>
        
        {/* Navigation arrow between sections - centered vertically */}
        <button className="section-nav-arrow" onClick={toggleSection} aria-label={activeSection === 1 ? "View next section" : "View previous section"}>
          <div className={`arrow-icon ${activeSection === 1 ? 'forward' : 'backward'}`}></div>
        </button>
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

export default Page3;