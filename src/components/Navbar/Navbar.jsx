import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiChevronLeft, FiChevronRight, FiLayout, FiLogOut, FiBox, FiClipboard } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ isCollapsed, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const userName = "Andrés Pérez";

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      <div className={`user-section ${activeItem === 'profile' ? 'active' : ''}`}>
        <Link to="/profile" className="user-link" onClick={() => handleItemClick('profile')}>
          <div className="user-info">
            <div className="profile-icon-circle">
              <FiUser size={20} />
            </div>
            {!isCollapsed && <span className="user-name">{userName}</span>}
          </div>
        </Link>
      </div>

      <div className="sidebar-content">
        <ul className="nav-links">
          <li className={activeItem === 'dashboard' ? 'active' : ''} onClick={() => handleItemClick('dashboard')}>
            <Link to="/" title="Dashboard">
              <FiLayout size={20} className="nav-icon" />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={activeItem === 'inventory' ? 'active' : ''} onClick={() => handleItemClick('inventory')}>
            <Link to="/inventory" title="Inventory">
              <FiBox size={20} className="nav-icon" />
              {!isCollapsed && <span>Inventory</span>}
            </Link>
          </li>
          <li className={activeItem === 'loans' ? 'active' : ''} onClick={() => handleItemClick('loans')}>
            <Link to="/loans" title="Loans">
              <FiClipboard size={20} className="nav-icon" />
              {!isCollapsed && <span>Loans</span>}
            </Link>
          </li>
        </ul>

        <div className="sidebar-bottom">
          <button className="logout-btn" title="Logout">
            <FiLogOut size={20} className="nav-icon" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
