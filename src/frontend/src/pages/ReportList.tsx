import React from 'react';

const ReportList = () => {
  const reports = [
    { id: 1, description: 'Example report 1', date: '2026-10-01' },
    { id: 2, description: 'Example report 2', date: '2026-10-02' },
  ];

  return (
    <div>
      <h2>Submitted Reports</h2>
      <div style={listStyle}>
        {reports.map(report => (
          <div key={report.id} style={itemStyle}>
            <p>{report.description}</p>
            <small>{report.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '600px',
  margin: '0 auto'
};

const itemStyle: React.CSSProperties = {
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '0.25rem',
  backgroundColor: 'white',
  textAlign: 'left'
};

export default ReportList;
