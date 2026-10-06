import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Fatec Women</h1>
      <p>A safe space for women to report and track occurrences.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/report" style={buttonStyle}>Submit a Report</Link>
        <Link to="/login" style={buttonStyle}>Login</Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#db2777',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '0.25rem',
  fontWeight: 'bold' as const
};

export default LandingPage;
