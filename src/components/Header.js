import React from 'react';
import './Header.css'; // Optional: Add a CSS file for styling the header if needed

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Review</h1> {/* You can change this text to your project name */}
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#reviews">Reviews</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
