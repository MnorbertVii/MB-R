import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signin.css";
import SignInNavBar from "../components/SignInNavBar";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // console.log(email)

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = async (e) => {
    // console.log("handlesubmit called");
    e.preventDefault();

    const isEmailValid = (email) => {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    };

    let isValid = true;
    if (!email) {
      setEmailError("Please fill in this field");
      isValid = false;
    } else if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please fill in this field");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(
        "https://mb-be-norbert.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      // console.log(data)
      if (!response.ok) {
        setAlert(data.message);
        throw new Error(data.message);
      }
      localStorage.setItem("token", data.Token);
      setAlert(data.message);
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SignInNavBar />
      <div className="container">
        <div className={`alert ${alert ? "show" : ""}`}>{alert}</div>
        <h2>
          Sign <span className="in">In</span>
        </h2>
        <form name="signInForm" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="style-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="err">{emailError}</div>
          </div>
          <div className="input">
            <label htmlFor="key">Password</label>
            <input
              type="password"
              id="key"
              className="style-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#." className="forgot-password">
              forgot password?
            </a>
            <div className="err">{passwordError}</div>
          </div>
          <button type="submit" className="signin-btn">
            Log in
          </button>
          <p>
		  <Link to="/SignUp" className="sign-up">Sign up {" "}</Link>
            if you don't have an account
          </p>
        </form>
      </div>
    </div>
  );
}
