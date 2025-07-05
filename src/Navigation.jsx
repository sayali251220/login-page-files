// components/Navigation.js
import React, { useState, useEffect } from 'react';
import "./Navigation.css";
const Navigation = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="top-nav-left">
          <div className="mobile-menu-toggle" onClick={toggleSidebar}>☰</div>
          <div className="top-nav-logo">
            <div className="top-nav-logo-icon">E</div>
            <span>CashBalancer</span>
          </div>
        </div>

        <div className="top-nav-center">
          <ul className="top-nav-links">
            <li className="top-nav-link">Tax Analysis</li>
            <li className="top-nav-link">Recommendations</li>
            <li className="top-nav-link">Multi-Country</li>
          </ul>
        </div>

        <div className="top-nav-right">
          <div className="country-selector">
            <div className="country-dropdown">
              <div className="country-flag"></div>
              <span>USA</span>
            </div>
          </div>
          <div className="top-nav-search">
            <input type="text" className="search-input" placeholder="Search..." />
            <div className="search-icon">🔍</div>
          </div>
          <div className="notifications-icon">
            🔔
            <div className="notification-badge">3</div>
          </div>
          <div className="help-icon">?</div>
        </div>
      </div>

      {/* Side Navigation */}
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className="nav-group">
          <div className="nav-title">Main</div>
          <div className="nav-item">
            <div className="nav-icon">🏠</div>
            <span>Home</span>
          </div>
          <div className="nav-item active">
            <div className="nav-icon">📊</div>
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">📑</div>
            <span>Statements</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">💰</div>
            <span>Expenses</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">📈</div>
            <span>Tax Planner</span>
          </div>
        </div>

        {/* Mobile-only links from top nav */}
        {isMobile && (
          <div className="nav-group">
            <div className="nav-title">Top Navigation</div>
            <div className="nav-item">
              <div className="nav-icon">💼</div>
              <span>Tax Analysis</span>
            </div>
            <div className="nav-item">
              <div className="nav-icon">📌</div>
              <span>Recommendations</span>
            </div>
            <div className="nav-item">
              <div className="nav-icon">🌍</div>
              <span>Multi-Country</span>
            </div>
          </div>
        )}

        <div className="nav-group">
          <div className="nav-title">Management</div>
          <div className="nav-item">
            <div className="nav-icon">👥</div>
            <span>Clients</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">📝</div>
            <span>Reports</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">ℹ️</div>
            <span>About</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">👤</div>
            <span>Profile</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">⚙️</div>
            <span>Settings</span>
          </div>
        </div>

        <div className="user-profile">
          <div className="user-avatar">p</div>
          <div className="user-info">
            <div className="user-name">Paramveer</div>
            <div className="user-role">Chartered Accountant</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
