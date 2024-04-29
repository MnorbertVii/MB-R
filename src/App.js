import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <NavBar />
      <Home />
      <About />
      <Projects />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;