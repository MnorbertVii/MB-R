import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/signup.css";
import SignInNavBar from '../components/SignInNavBar';

const SignUp = () => {


const [form, setForm] = useState({
  fullName: '',
  email: '',
  password: ''
});

//  console.log(form.fullName);



const [error, setError] = useState({
  fullName: '',
  email: '',
  password: ''
});

const [alert, setAlert] = useState('');
const navigate = useNavigate();

useEffect(() => {
  if(alert){
    const timer = setTimeout(() => {
      setAlert('');
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [alert]);

const handleSubmit = async (e) => {
  console.log("handleSubmit event called")
  e.preventDefault();

  
  const isEmailValid = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };


  let isValid = true;

  if(!form.fullName){
    setError(prevStatus => ({ ...prevStatus, fullName: 'Please fill in this field' }));
    isValid = false;
  } else {
    setError(prevStatus => ({ ...prevStatus, fullName: '' }));
  }

  if (!form.email) {
    setError(prevStatus => ({ ...prevStatus, email: 'Please fill in this field' }));
    isValid = false;
  } else if (!isEmailValid(form.email)) {
    setError(prevStatus => ({ ...prevStatus, email: 'Please enter a valid email' }));
    isValid = false;
  } else {
    setError(prevStatus => ({ ...prevStatus, email: '' }));
  }
  
  if (!form.password) {
    setError(prevStatus => ({ ...prevStatus, password: 'Please fill in this field' }));
    isValid = false;
  } else if(form.password.length < 6){
    setError(prevStatus => ({ ...prevStatus, password: 'Password must be at least 6 characters' }));
    isValid = false;
  } else if(!/[0-9]/.test(form.password)){
    setError(prevStatus => ({ ...prevStatus, password: 'Password must contain a number' }));
    isValid = false;
  }
   else {
    setError(prevStatus => ({ ...prevStatus, password: '' }));
  }

  if (isValid) {
    
      // console.log('validations done')
      try {
      
        const  response = await fetch('https://mb-be-norbert.onrender.com/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
      
        const data = await response.json();
    
        console.log(data);
    
        if (!response.ok) {
          setAlert(data.message);
          throw new Error(data.message);
        }
        setAlert(data.message);
        setForm({
          name: '',
          email: '',
          password: ''
        });
        setTimeout(() => {
          navigate('/signIn');
        }, 4000);
      
      } catch(error){
        console.log(error);
      }
    }
   
  }


  return (
	<div>
<SignInNavBar />
    <div className="container">

      <h2>Let's get you <span className="in">In!</span></h2>
      <p>Already have an account? <Link to="/signIn" className="sign-in">Log in</Link></p>
      <div className={`alert ${alert ? "show" : ""}`}>{alert}</div>
      <form name="signUpForm" onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="name">what should we call you?</label>
          <input type="text" id="Sname" className="style-input" placeholder="your full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <div className="err">{error.fullName}</div>
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input type="text" id="Semail" className="style-input" placeholder="enter your email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="err">{error.email}</div>
        </div>
        <div className="input">
          <label htmlFor="key">Password</label>
          <input type="password" id="Skey" className="style-input" placeholder="enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <div className="err">{error.password}</div>
        </div>
        <button type="submit">create an account</button>
      </form>
    </div>
	</div>
  );
};

export default SignUp;