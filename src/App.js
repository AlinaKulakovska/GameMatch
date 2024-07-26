import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
   
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
