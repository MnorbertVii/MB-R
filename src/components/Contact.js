import React, { useState } from 'react';
import * as logos from '../assets/images';
function Contact() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [button, setButton] = useState({
	text: 'send message',
	color: '#dcc9aa'
  });

  const isEmailValid = (email) => {
    const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return EmailRegex.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (form.name === '') {
		setStatus(prevStatus => ({ ...prevStatus, name: 'Your full name is required' }));
      isValid = false;
    } else {
		setStatus(prevStatus => ({ ...prevStatus, name: '' }));
	  }

    if (form.email === '') {
		setStatus(prevStatus => ({ ...prevStatus, email: 'Your Email is required' }));
      isValid = false;
    } else if (!isEmailValid(form.email)) {
		setStatus(prevStatus => ({ ...prevStatus, email: 'Provide a valid email address' }));
      isValid = false;
    } else {
		setStatus(prevStatus => ({ ...prevStatus, email: '' }));
	  }

    if (form.message === '') {
		setStatus(prevStatus => ({ ...prevStatus, message: "this field can't be blank" }));
      isValid = false;
    } else if (form.message.length < 10) {
		setStatus(prevStatus => ({ ...prevStatus, message: "Message can't be less than 10 characters" }));
      isValid = false;
    } else {
		setStatus(prevStatus => ({ ...prevStatus, message: '' }));
	  }

    if (isValid) {
      const newMessage = {
        name: form.name,
        email: form.email,
        message: form.message
      };

      try {
        const response = await fetch('https://mb-be-norbert.onrender.com/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMessage)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setStatus(data.message);
        setForm({ name: '', email: '', message: '' });

		setButton({ text: data.message, color: '#fca311' });

  setTimeout(() => {
    setButton({ text: 'send message', color: '#dcc9aa' });
  }, 3000);
     
      } catch (error) {
        console.log('There was an error', error);
      }
    }
  };

  return (
	<section id="contact">
	<h3>Get in <span className="touch">Touch</span></h3>
	<form className="contact-form" name="contact-form" onSubmit={handleSubmit}>
	  <div className="left-side">
		<div className="input">
		  <input type="text" className="style-input" id="name" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
		  <div className="err">{status.name}</div>
		</div>
		<div className="input">
		  <input type="email" className="style-input" id="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
		  <div className="err">{status.email}</div>
		</div>
	  </div>
	  <div className="right-side input">
		<textarea className="style-input" id="message" placeholder="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
		<div className="err">{status.message}</div>
	  </div>
	  <div className="btn-container">
		<button type="submit" className="contact-btn" id="send-btn" style={{backgroundColor: button.color}}>{button.text}</button>
	  </div>
	</form>
	<p>I am <span className="social">social</span></p>
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
    </section>
  );
}

export default Contact;