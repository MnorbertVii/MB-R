import React, { useEffect, useState } from 'react';
import * as icons from '../assets/images';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("https://mb-be-norbert.onrender.com/articles");
      const data = await response.json();
      setBlogs(data.Articles || []);
    };

    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`https://mb-be-norbert.onrender.com/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id="blogs">
      <div className="header">
        <h2>Manage blogs</h2>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {blogs.map(blog => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>
                <img className="blog-img" src={blog.image} alt="blogImage" />
              </td>
              <td>{blog.content.slice(0, 30)}</td>
              <td>
                <a href="#.">
                  <span className="action-icons" id="view-icon">
                    <img src={icons.Eye} alt="" />
                  </span>
                </a>
                <a href="#.">
                  <span className="action-icons" id="edit-icon">
                    <img src={icons.Edit} alt="" />
                  </span>
                </a>
                <a href="#." onClick={() => deleteBlog(blog._id)}>
                  <span className="action-icons" id="delete-icon">
                    <img src={icons.Trash} alt="" />
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminBlogs;