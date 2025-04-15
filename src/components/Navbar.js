import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Age Calculator</Link> 
        </li>
        <li className="navbar-item">
          <Link to="/todo" className="navbar-link">To-Do List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;