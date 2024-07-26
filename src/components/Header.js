import {FaHome, FaUser } from 'react-icons/fa';
import logo from '../images/logo.png'
import { useState } from 'react';
import { Link } from 'react-router-dom'
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Site Logo" className="logo" />
        <h1 className="site-name">GameMatch</h1>
      </div>
      <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links ">
          <Link to='/' className='flex items-center link'><FaHome className='-mt-1 mr-2' />Home</Link>
          <Link to='/profile' className='flex items-center link'><FaUser className='-mt-1 mr-2' /> Profile</Link>
        </ul>
      </nav>
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        ☰
      </button>
    </header>
  );
}

export default Header;
