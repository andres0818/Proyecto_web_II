import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiChevronLeft, FiChevronRight, FiLayout, FiLogOut, FiBox, FiClipboard, FiPieChart } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ isCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('home');
  const userName = user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.email || "Guest";

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
          <li className={activeItem === 'home' ? 'active' : ''} onClick={() => handleItemClick('home')}>
            <Link to="/" title="Home">
              <FiLayout size={20} className="nav-icon" />
              {!isCollapsed && <span>Home</span>}
            </Link>
          </li>
          <li className={activeItem === 'analytics' ? 'active' : ''} onClick={() => handleItemClick('analytics')}>
            <Link to="/dashboard" title="Analytics">
              <FiPieChart size={20} className="nav-icon" />
              {!isCollapsed && <span>Analytics</span>}
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
          <li className={activeItem === 'categories' ? 'active' : ''} onClick={() => handleItemClick('categories')}>
            <Link to="/categories" title="Categories">
              <FiBox size={20} className="nav-icon" />
              {!isCollapsed && <span>Categories</span>}
            </Link>
          </li>
        </ul>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FiLogOut size={20} className="nav-icon" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
