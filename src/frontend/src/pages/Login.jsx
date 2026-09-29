import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would call an API here.
    // For this prototype, we simulate a successful login.
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f5f5f5' 
    }}>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        width: '300px', 
        padding: '30px', 
        border: 'none', 
        borderRadius: '12px', 
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#e91e63' }}>Fatec Women Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} 
          required 
        />
        <button type="submit" style={{ 
          padding: '12px', 
          background: '#e91e63', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
