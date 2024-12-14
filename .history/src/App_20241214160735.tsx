import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter } from 'react-router-dom';


const App = () => {
  return (
    <div>
        <BrowserRouter></BrowserRouter>
        <Header />
        <Footer />
    </div>
  )
}

export default App
