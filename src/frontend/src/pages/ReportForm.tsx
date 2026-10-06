import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting report:', { description });
    alert('Report submitted successfully!');
    navigate('/');
  };

  return (
    <div>
      <h2>Submit a Report</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <textarea 
          placeholder="Describe the occurrence..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={textareaStyle} 
          required 
        />
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '600px',
  margin: '0 auto'
};

const textareaStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderRadius: '0.25rem',
  border: '1px solid #ccc',
  minHeight: '150px'
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem',
  backgroundColor: '#db2777',
  color: 'white',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default ReportForm;
