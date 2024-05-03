import React from 'react';
import passport from '../assets/images/passport.jpg'

export default function Home () {
  return (
    <main>
      <section id="home" className="grid">
        <div className="welcome-img">
		<img src={passport} alt="my face" />
        </div>
        <div className="welcome-texts">
          <h2 className="hello">Hello,</h2>
          <h2>
            <span className="am">I'm </span>
            <span className="norbert">Norbert NIRUGIRA Muhizi,</span>
          </h2>
          <p className="about-me">An enthusiastic software engineer.</p>
        </div>
        <a href="assets/Resume.pdf">
          <button className="resume-btn">Resume</button>
        </a>
      </section>
    </main>
  );
}

