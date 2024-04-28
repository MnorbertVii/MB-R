import React, { useState } from 'react';
import{ Link } from 'react-scroll';
import SignInOut from './SignInOut';

export default function NavBar () {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showMenubar = () => {
    setIsSidebarOpen(true);
  };

  const hideMenubar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Navigation for large screens */}
      <nav className="large-screen-nav">
        <div className="logo">
          <h1><a href="#home">N.M</a></h1>
        </div>
        <div className="links">
          <ul>
          <li><Link to="home" spy={true} smooth={true} offset={-150}>Home</Link></li>
            <li><Link to="about" spy={true} smooth={true} offset={-100}>About</Link></li>
            <li><Link to="projects" spy={true} smooth={true} offset={-100}>Projects</Link></li>
            <li><Link to="blogs" spy={true} smooth={true} offset={-100}>Blogs</Link></li>
            <li><Link to="contact" spy={true} smooth={true}offset={-150}>Contact me</Link></li>
            <SignInOut offset={-150} activeClass="active" />
          </ul>
        </div>
      </nav>

      {/* Navigation for small screens */}
      <nav className="small-screen-nav grid">
        <h1><a href="#home">N.M</a></h1>
        <div className="menu-btn" >
          <svg
            onClick={showMenubar}
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 -960 960 960"
            width="30"
          >
            <path
              d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
            />
          </svg>
        </div>
        {isSidebarOpen && (
          <div className="nav-links" style={{ display: isSidebarOpen ? 'flex' : 'none' }}>
          <svg
          onClick={hideMenubar}
            xmlns="http://www.w3.org/2000/svg"
            height="35"
            viewBox="0 -960 960 960"
            width="35"
          >
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
           
            <h3 className="menu">menu</h3>
            <Link to="home" spy={true} smooth={true} offset={-150} activeClass="active" onClick={hideMenubar}>Home</Link>
            <Link to="about" spy={true} smooth={true} offset={-100} activeClass="active" onClick={hideMenubar}>About</Link>
            <Link to="projects" spy={true} smooth={true} offset={-30} activeClass="active" onClick={hideMenubar}>Projects</Link>
            <Link to="blogs" spy={true} smooth={true} offset={-30} activeClass="active" onClick={hideMenubar}>Blogs</Link>
            <Link to="contact" spy={true} smooth={true} offset={-150} activeClass="active" onClick={hideMenubar}>Contact me</Link>
            <SignInOut offset={-150} activeClass="active" />
          </div>
        )}
      </nav>
    </div>
  );
}

