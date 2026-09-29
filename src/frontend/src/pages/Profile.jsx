import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#e91e63' }}>My Profile</h1>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#666', fontWeight: 'bold' }}>Back to Dashboard</Link>
      </header>
      <div style={{ 
        maxWidth: '400px', 
        padding: '30px', 
        border: 'none', 
        borderRadius: '12px', 
        backgroundColor: 'white', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong style={{ color: '#888' }}>Name:</strong> {user.name || 'Guest User'}</p>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong style={{ color: '#888' }}>Email:</strong> {user.email || 'Not provided'}</p>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}><strong style={{ color: '#888' }}>Phone:</strong> +55 11 99999-9999</p>
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <Link to="/" style={{ 
          color: '#ff4444', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '16px'
        }}>Logout</Link>
      </div>
    </div>
  );
};

export default Profile;
