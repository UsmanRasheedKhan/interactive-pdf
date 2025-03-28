import React, { useState, useRef } from 'react';
import './Page1.css';
import Navigation from './Navigation';
import Asset1 from '../assets/Asset-1.png';
import Asset2 from '../assets/Asset-2.png';
import paintingImage from '../assets/painting.png';
import EgyptianMan from '../assets/Egyptain-Man.png';
import OxfordExtendLogo from '../assets/Oxford-Extend-nobg.png';
import OUPLogo from '../assets/OUP-Logo.png';
import audioFile from '../assets/audios/Media1.wav';

const Page1 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x
    } else {
      setZoomLevel(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
    }
  };

  const openPopup = () => {
    setShowPopup(true);
    setZoomLevel(1); // Reset zoom when opening
  };

  const handlePlayAudio = () => {
    if (!isPlaying) {
      // Start playing
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    } else {
      // Stop playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to beginning
      setIsPlaying(false);
    }
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

      <div className="book-page">
        <div className="page-container">
          <div className="two-column-layout">
            {/* Left section (40%) with text */}
            <div className="left-section">
              {/* Top yellow paper note box */}
              <div className="note-paper-box top-note">
                <p><strong>Quick Guide:</strong> This interactive exhibit showcases historical documents from the 18th century. Click on images to explore details.</p>
              </div>
              
              {/* Text content */}
              <div className="text-content">
                <h2>About the Painting</h2>
                <p>This rare painting from the early 18th century depicts a significant gathering of nobles and scholars during the Age of Enlightenment. The composition shows careful attention to light and shadow, typical of the period's artistic style.</p>
                <p>The artist used techniques that were revolutionary for the time, creating depth through layered oil glazes and meticulous brushwork. Art historians believe this work was commissioned by a prominent patron of the arts.</p>
                
                <h2>Historical Importance</h2>
                <p>The scene captured in this painting documents a pivotal moment in European intellectual history. It represents the exchange of ideas that would later influence political movements across the continent.</p>
                <p>Scholars have identified several historical figures in the gathering, including philosophers and scientists whose work shaped modern thinking. The document visible on the table is believed to be an early draft of a significant treaty.</p>
                <p>Recent restoration work has revealed previously hidden details in the background, providing new insights into the social context of the era.</p>
              </div>
              
              {/* Note box and play button container with Egyptian man */}
              <div className="note-play-container">
                {/* Egyptian man image */}
                <div className="egyptian-man-container">
                  <img src={EgyptianMan} alt="Egyptian Man" className="egyptian-man-image" />
                </div>
                
                {/* Yellow paper note box */}
                <div className="note-paper-box">
                  <p><strong>Researcher's Note:</strong> This document was discovered in the Oxford archives in 1997 and has been carefully preserved for study.</p>
                </div>
                
                {/* Play button with audio functionality */}
                <button 
                  className={`play-button ${isPlaying ? 'playing' : ''}`} 
                  aria-label={isPlaying ? "Stop audio" : "Play audio"}
                  onClick={handlePlayAudio}
                >
                  <div className="play-icon"></div>
                  <audio ref={audioRef} src={audioFile} onEnded={() => setIsPlaying(false)} />
                </button>
              </div>
            </div>

            {/* Right section (60%) with image */}
            <div className="right-section">
              <div className="full-painting-container">
                <img 
                  src={paintingImage} 
                  alt="Historical Painting" 
                  className="full-painting-image"
                  onClick={openPopup}
                />
                {/* Caption removed as requested */}
              </div>
            </div>
          </div>
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
                src={paintingImage} 
                alt="Historical Painting" 
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

export default Page1;