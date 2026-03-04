import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`layout-container ${isCollapsed ? 'collapsed' : ''}`}>
      <Navbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="main-content-wrapper">
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
