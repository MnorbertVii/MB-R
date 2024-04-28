import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SignInOut from '../components/SignInOut';

export default function SignInNavBar() {
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
          <h1><RouterLink to={{ pathname: "/", state: { id: "home" } }}>N.M</RouterLink></h1>
        </div>
        <div className="links">
          <ul>
            <li><RouterLink to={{ pathname: "/", state: { id: "home" } }}>Home</RouterLink></li>
            <li><RouterLink to={{ pathname: "/", state: { id: "about" } }}>About</RouterLink></li>
            <li><RouterLink to={{ pathname: "/", state: { id: "projects" } }}>Projects</RouterLink></li>
            <li><RouterLink to={{ pathname: "/", state: { id: "blogs" } }}>Blogs</RouterLink></li>
            <li><RouterLink to={{ pathname: "/", state: { id: "contact" } }}>Contact me</RouterLink></li>
            <SignInOut />
          </ul>
        </div>
      </nav>

      {/* Navigation for small screens */}
      <nav className="small-screen-nav grid">
        <h1><RouterLink to={{ pathname: "/", state: { id: "home" } }}>N.M</RouterLink></h1>
        <div className="menu-btn" onClick={showMenubar}>
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
            <RouterLink to={{ pathname: "/", state: { id: "home" } }} onClick={hideMenubar}>Home</RouterLink>
            <RouterLink to={{ pathname: "/", state: { id: "about" } }} onClick={hideMenubar}>About</RouterLink>
            <RouterLink to={{ pathname: "/", state: { id: "projects" } }} onClick={hideMenubar}>Projects</RouterLink>
            <RouterLink to={{ pathname: "/", state: { id: "blogs" } }} onClick={hideMenubar}>Blogs</RouterLink>
            <RouterLink to={{ pathname: "/", state: { id: "contact" } }} onClick={hideMenubar}>Contact me</RouterLink>
            <SignInOut />
          </div>
        )}
      </nav>
    </div>
  );
}