import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignInOut() {
  const [userStatus, setUserStatus] = useState('Sign in');
  const [link, setLink] = useState('/SignIn');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signOutInitiated, setSignOutInitiated] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const isAdmin = JSON.parse(jsonPayload).isAdmin;
      setUserStatus(isAdmin ? 'Admin panel' : 'Sign out');
      setLink(isAdmin ? '/AdminPanel' : '/')
      setIsSignedIn(true);
    } else {
      setUserStatus('Sign in');
      setLink('/SignIn');
      setIsSignedIn(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (signOutInitiated) {
      navigate('/');
      setSignOutInitiated(false);
    }
  }, [signOutInitiated, navigate]);

  const handleClick = () => {
    if (userStatus === 'Sign out') {
      localStorage.removeItem('token');
      setIsSignedIn(false);
      setSignOutInitiated(true);
    }else if (userStatus === 'Admin panel') {
      navigate('/AdminPanel');
    }
     else {
      navigate(link);
    }
  };

  return (
    <li>
      <Link to={link} id="signInLi" onClick={handleClick}>
        {userStatus}
      </Link>
    </li>
  );
}