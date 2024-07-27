import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Profiles from './pages/ProfilesPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchesPage from './pages/MatchesPage';
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/matches" element={<MatchesPage />} />
        </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
