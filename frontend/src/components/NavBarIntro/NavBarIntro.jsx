import React from 'react';
import { Link } from 'react-router-dom';
import './NavBarIntro.css';

const NavBarIntro = () => {
  return (
    <nav className="intro-navbar">
      <div className="navbar-logo">
        <Link to="/">Soil Testing Lab</Link>
        </div>
      <ul className="navbar-menu">
        <li><Link to="/log-in">Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavBarIntro;