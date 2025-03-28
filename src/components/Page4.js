import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Page3.css';
import Navigation from './Navigation';
import Asset1 from '../assets/Asset-1.png';
import Asset2 from '../assets/Asset-2.png';
import OxfordExtendLogo from '../assets/Oxford-Extend-nobg.png';
import OUPLogo from '../assets/OUP-Logo.png';
import SlidePic3 from '../assets/slide-pic-3.png';
import SlidePic4 from '../assets/slide-pic-4.png';

const Page4 = () => {
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
  
  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.2, 3));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
    }
  };
  
  const openPopup = (imageUrl) => {
    setCurrentPopupImage(imageUrl);
    setShowPopup(true);
    setZoomLevel(1);
  };
  
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

      <div className="two-section-layout">
        <div className={`section dark-section ${activeSection === 1 ? 'active' : 'inactive'}`}>
          <div className="section-image-container">
            <img 
              src={SlidePic3} 
              alt="Egyptian Pyramids" 
              className="section-image"
              onClick={() => openPopup(SlidePic3)}
            />
          </div>
          <div className="section-text">
            <h3>The Great Pyramids of Giza</h3>
            <p>Built during the Fourth Dynasty of the Old Kingdom period, the pyramids of Giza remain one of the most impressive architectural achievements in human history. The Great Pyramid, constructed for Pharaoh Khufu around 2560 BCE, was the tallest man-made structure in the world for over 3,800 years.</p>
            <p>These massive monuments served as elaborate tombs designed to facilitate the pharaoh's journey to the afterlife. The precision of their construction continues to amaze modern engineers, with stone blocks weighing several tons fitted together with remarkable accuracy.</p>
          </div>
        </div>
        
        <div className={`section light-section ${activeSection === 2 ? 'active' : 'inactive'}`}>
          <div className="section-image-container">
            <img 
              src={SlidePic4} 
              alt="Egyptian Artifacts" 
              className="section-image"
              onClick={() => openPopup(SlidePic4)}
            />
          </div>
          <div className="section-text">
            <h3>Egyptian Burial Treasures</h3>
            <p>The elaborate funerary objects found within Egyptian tombs provide invaluable insights into ancient beliefs about the afterlife. Wealthy Egyptians were often buried with vast treasure collections meant to sustain them in their journey beyond death.</p>
            <p>These artifacts, including ornate jewelry, canopic jars, shabti figures, and ceremonial vessels, represent the pinnacle of ancient Egyptian craftsmanship. The sophisticated techniques used in their creation demonstrate the advanced technological knowledge and artistic sensibilities of this remarkable civilization.</p>
          </div>
        </div>
        
        <button className="section-nav-arrow" onClick={toggleSection} aria-label={activeSection === 1 ? "View next section" : "View previous section"}>
          <div className={`arrow-icon ${activeSection === 1 ? 'forward' : 'backward'}`}></div>
        </button>
      </div>

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

export default Page4;