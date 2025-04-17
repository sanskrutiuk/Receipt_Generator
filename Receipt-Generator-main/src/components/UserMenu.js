import React, { useState, useRef, useEffect } from 'react';
import './UserMenu.css';

const UserMenu = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu-button" onClick={toggleMenu}>
        <span className="user-name">{user.username}</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="user-info">
            <span className="full-name">{user.fullName}</span>
            <span className="username">@{user.username}</span>
          </div>
          <div className="menu-divider"></div>
          <button className="sign-out-button" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 