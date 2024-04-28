import React, { useState } from 'react';
import '../styles/admin.css';
import AdminNavBar from '../components/AdminNavBar';
import AdminUsers from '../components/AdminUsers';
import AdminMessages from '../components/AdminMessages';
import AdminBlogs from '../components/AdminBlogs';
import AdminCreateBlog from '../components/AdminCreateBlog';

const AdminPanel = () => {

  const [articleId, setArticleId] = useState(null);

  const handleEdit = (id) => {
    setArticleId(id);
  };

  return (
    <div>
      <AdminNavBar />
	  <main className="adminMain">
	  <AdminUsers />
	  <AdminMessages />
	  <AdminBlogs onEdit={handleEdit} />
	  <AdminCreateBlog articleId={articleId} onArticleChange={() => setArticleId(null)} />
      </main>
    </div>
  );
};

export default AdminPanel;