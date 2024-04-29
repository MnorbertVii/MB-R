import React from 'react';
import { Link } from 'react-scroll';
import * as logos from '../assets/images';

function Footer() {
  return (
    <footer>
      <div className="footer-contents grid">
        <div className="subscribe grid">
          <h5>subscribe</h5>
          <input
            type="email"
            className="style-input-footer"
            placeholder="your email"
          />
          <button className="subscribe-btn">
            <img src={logos.SendIcon} alt="send" />
          </button>
        </div>
        <ul className="footer-items">
          <li><Link to="home" spy={true} smooth={true} offset={-150}>Home</Link></li>
          <li><Link to="about" spy={true} smooth={true} offset={-100}>About</Link></li>
          <li><Link to="blogs" spy={true} smooth={true} offset={-100}>Blogs</Link></li>
          <li><Link to="contact" spy={true} smooth={true}offset={-150}>Contact me</Link></li>
          <li><a href="#.">help</a></li>
          <li><a href="#.">support me</a></li>
        </ul>
        <div className="social-icons">
          <li>
            <a href="https://www.linkedin.com/in/norbert-muhizi-n">
              <img src={logos.Linkedin} alt="in" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/norbert._villa?igsh=MWNwZXhrenM1MjFxbg%3D%3D&utm_source=qr">
              <img src={logos.Instagram} alt="insta" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/profile.php?id=100008953172576&mibextid=LQQJ4d">
              <img src={logos.Facebook} alt="fb" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/NorBrogrammer">
              <img src={logos.Twitter} alt="x" />
            </a>
          </li>
        </div>
        <p>&#169;2024, All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;