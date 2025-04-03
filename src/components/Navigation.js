import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../fonts.css'; // We'll create this to import font files

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFont, setSelectedFont] = useState('default');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Calculate current page and total pages
  const pageRoutes = ['/', '/page2', '/page3', '/page4'];
  const currentPageIndex = pageRoutes.indexOf(location.pathname);
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pageRoutes.length - 1;
  
  // Available fonts based on your actual font files
  const fonts = [
    { id: 'default', name: 'Default Font', fontFamily: 'inherit' },
    { id: 'josefinSans', name: 'Josefin Sans', fontFamily: "'Josefin Sans', sans-serif" },
    { id: 'josefinSansBold', name: 'Josefin Sans Bold', fontFamily: "'Josefin Sans Bold', sans-serif" },
    { id: 'josefinSansItalic', name: 'Josefin Sans Italic', fontFamily: "'Josefin Sans Italic', sans-serif" },
    { id: 'papyrus', name: 'Papyrus', fontFamily: "'Papyrus', fantasy" }
  ];
  
  // Handle font change
  const handleFontChange = (fontId) => {
    setSelectedFont(fontId);
    setDropdownOpen(false); // Close dropdown after selection
    
    // Get the selected font object
    const fontObject = fonts.find(font => font.id === fontId);
    if (fontObject) {
      // Apply the font to the entire document
      document.body.style.fontFamily = fontObject.fontFamily;
      document.documentElement.style.setProperty('--app-font-family', fontObject.fontFamily);
      
      // Apply to content areas specifically to ensure it affects all text
      const contentElements = document.querySelectorAll('.page-content, .main-content, p, h1, h2, h3, h4, h5, h6');
      contentElements.forEach(element => {
        element.style.fontFamily = fontObject.fontFamily;
      });
    }
  };
  
  // Apply default font on initial load
  useEffect(() => {
    const defaultFont = fonts.find(font => font.id === selectedFont);
    if (defaultFont) {
      document.body.style.fontFamily = defaultFont.fontFamily;
      document.documentElement.style.setProperty('--app-font-family', defaultFont.fontFamily);
      
      // Apply to content areas specifically
      const contentElements = document.querySelectorAll('.page-content, .main-content, p, h1, h2, h3, h4, h5, h6');
      contentElements.forEach(element => {
        element.style.fontFamily = defaultFont.fontFamily;
      });
    }
  }, [selectedFont, fonts]);
  
  // Navigation functions
  const goToNextPage = () => {
    if (!isLastPage) {
      navigate(pageRoutes[currentPageIndex + 1]);
    }
  };
  
  const goToPrevPage = () => {
    if (!isFirstPage) {
      navigate(pageRoutes[currentPageIndex - 1]);
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.font-dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  return (
    <div className="secondary-nav-strip">
      <div className="nav-arrows">
        <button 
          className={`nav-arrow ${isFirstPage ? 'disabled' : ''}`} 
          onClick={goToPrevPage}
          disabled={isFirstPage}
          aria-label="Previous page"
        >
          <span className="arrow-left">&#9664;</span>
        </button>
        <button 
          className={`nav-arrow ${isLastPage ? 'disabled' : ''}`} 
          onClick={goToNextPage}
          disabled={isLastPage}
          aria-label="Next page"
        >
          <span className="arrow-right">&#9654;</span>
        </button>
      </div>
      
      <div className="secondary-links">
        <a href="#features">Features</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact Us</a>
        
        {/* Font dropdown styled like other links */}
        <div className="font-link-dropdown">
          <a 
            href="#" 
            className="font-link"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          >
            Fonts
          </a>
          {dropdownOpen && (
            <div className="font-dropdown-menu">
              {fonts.map(font => (
                <div 
                  key={font.id} 
                  className={`font-option ${selectedFont === font.id ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFontChange(font.id);
                  }}
                  style={{ fontFamily: font.fontFamily }}
                >
                  {font.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;