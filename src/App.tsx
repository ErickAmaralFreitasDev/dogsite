
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login.tsx';
import './App.css'
import { UserStorage } from './UserContext.tsx';
import User from './Components/User/User.tsx';
import ProtectedRouter from './Components/Helper/ProtectedRouter.tsx';
import Photo from './Photo/Photo.tsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/conta/*" element={<ProtectedRouter><User /></ProtectedRouter>} />
            <Route path="foto/:id*" element={<Photo />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;