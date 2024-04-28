import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://mb-be-norbert.onrender.com/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setUsers(data.data);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <section id="users">
      <div className="title">
        <h2>List of Users</h2>
      </div>
      <div className="users" id="users-container">
        {users.map((user) => (
          <div key={user.email}>
            <h3 style={{ marginBottom: '20px' }}>{user.fullName}</h3>
            <p style={{ marginBottom: '40px' }}>{user.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminUsers;