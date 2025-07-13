import React from 'react';
import logo from '../assets/logo_1.png';

function Navbar({ onLogout, showProfile = true }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" style={{ height: '50px', verticalAlign: 'middle' }} />
      </div>
      {showProfile && (
        <div className="navbar-profile">
          <span>Profile</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
