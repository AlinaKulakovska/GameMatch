import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UserStatistics from './components/UserStatistics';
import CommentsSection from './components/CommentsSection';
import AppDescription from './components/AppDescription';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AppDescription />
      <UserStatistics />
      <CommentsSection />
      <Footer />
    </div>
  );
}

export default App;
