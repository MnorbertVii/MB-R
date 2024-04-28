import React from 'react';
import '../styles/admin.css';
import AdminNavBar from '../components/AdminNavBar';
import AdminUsers from '../components/AdminUsers';
import AdminMessages from '../components/AdminMessages';
import AdminBlogs from '../components/AdminBlogs';
import AdminCreateBlog from '../components/AdminCreateBlog';

const AdminPanel = () => {
  return (
    <div>
      <AdminNavBar />
	  <main>
	  <AdminUsers />
	  <AdminMessages />
	  <AdminBlogs />
	  <AdminCreateBlog />
      </main>
    </div>
  );
};

export default AdminPanel;