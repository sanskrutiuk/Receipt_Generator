import React from 'react';
import UserMenu from './UserMenu';
import './Header.css';

const Header = ({ currentPage, setCurrentPage, user, onSignOut }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-brand" onClick={() => setCurrentPage('form')}>
            <img 
              src="/company-logo.png" 
              alt="Company Logo" 
              className="header-logo"
            />
            <h1 className="header-title">Receipt Generator</h1>
          </div>
        </div>
        <div className="header-right">
          <nav className="header-nav">
            <button
              className={`nav-btn ${currentPage === 'history' ? 'active' : ''}`}
              onClick={() => setCurrentPage('history')}
            >
              History
            </button>
            <button
              className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => setCurrentPage('about')}
            >
              About
            </button>
          </nav>
          <div className="header-divider"></div>
          <UserMenu user={user} onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
};

export default Header; 