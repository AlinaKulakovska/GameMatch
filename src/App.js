import './App.css';
import SignInForm from './components/Signinform';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CommentsSection from './components/CommentsSection';
function App() {
  return (
    <div className="App">
      <Header />
      <SignInForm />
      <HeroSection />
      <CommentsSection />
    </div>
  );
}

export default App;
