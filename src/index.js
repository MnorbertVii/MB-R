import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminPanel from './pages/AdminPanel';
import BlogPost from './pages/SingleBlog';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/BlogPost/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  </React.StrictMode>,
 
);
