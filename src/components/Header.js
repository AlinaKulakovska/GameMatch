import { FaEnvelopeOpenText, FaHome, FaUser } from 'react-icons/fa';
import logo from '../images/logo.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FaHeartCirclePlus } from 'react-icons/fa6';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


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
          <Link to='/profiles' className='flex items-center link'><FaHeartCirclePlus className='-mt-1 mr-2' /> Swipe</Link>
          <Link to='/matches' className='flex items-center link'><FaEnvelopeOpenText className='-mt-1 mr-2' /> Matches</Link>
          {user ? <button onClick={logout}>Logout</button> : ""}
        </ul>
      </nav>
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        ☰
      </button>
    </header>
  );
}

export default Header;
