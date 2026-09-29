import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Fatec Women App</h1>
      <p>Helping women report and track domestic violence.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login" style={{ padding: '10px 20px', background: '#e91e63', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Login to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Index;
