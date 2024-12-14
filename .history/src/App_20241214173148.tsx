
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={Home /} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;