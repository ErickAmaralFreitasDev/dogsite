
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login.tsx';
import './App.css'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;