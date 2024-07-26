import SignInForm from './Signinform';
import { useState } from 'react';
const HeroSection = () => {

  const [isSignInFormVisible, setIsSignInFormVisible] = useState(false);

  const toggleSignInForm = () => {
    setIsSignInFormVisible(!isSignInFormVisible);
  };
  const closeSignInForm = () => {
    setIsSignInFormVisible(false);
  };
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to GameMatch</h1>
        <p>Find your perfect match today!</p>
        <button className="cta-button" onClick={toggleSignInForm}>Get Started</button>
      </div> 
      <SignInForm isVisible={isSignInFormVisible} closeForm={closeSignInForm}/>
    </section>
  );
}

export default HeroSection;