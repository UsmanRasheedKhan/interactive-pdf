import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Calculate current page and total pages
  const pageRoutes = ['/', '/page2', '/page3', '/page4'];
  const currentPageIndex = pageRoutes.indexOf(location.pathname);
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pageRoutes.length - 1;
  
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
      </div>
    </div>
  );
};

export default Navigation;