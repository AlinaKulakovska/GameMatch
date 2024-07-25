import { FaCog, FaEnvelope, FaHome, FaInfo } from 'react-icons/fa';
import logo from '../images/logo.png'
import { useState } from 'react';

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
          <li><a href="#home" ><FaHome  className='mr-2 -mt-1'/> Home</a></li>
          <li><a href="#about"><FaInfo className='mr-2 -mt-1'/> About</a></li>
          <li><a href="#services"><FaCog className='mr-2 -mt-1'/> Services</a></li>
          <li><a href="#contact"><FaEnvelope className='mr-2 -mt-1'/> Contact</a></li>
        </ul>
      </nav>
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        ☰
      </button>
    </header>
  );
}

export default Header;
