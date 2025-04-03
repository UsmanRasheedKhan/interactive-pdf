import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="content-container">
        {children}
      </div>
    </>
  );
};

export default Layout;