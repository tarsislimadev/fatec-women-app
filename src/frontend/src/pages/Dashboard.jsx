import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, MapPin, User } from 'lucide-react';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/reports')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setReports(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Reports Dashboard</h1>
        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#333' }}>
          <User size={20} /> Profile
        </Link>
      </header>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#f9f9f9', borderRadius: '10px' }}>
          <AlertCircle size={48} style={{ color: '#ccc', marginBottom: '10px' }} />
          <p>No reports found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {reports.map(report => (
            <div key={report.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{report.name || 'Anonymous'}</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                {new Date(report.created_at).toLocaleDateString()}
              </p>
              <p style={{ fontSize: '14px', marginBottom: '15px' }}>{report.details}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a 
                  href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#e91e63', textDecoration: 'none' }}
                >
                  <MapPin size={14} /> View Location
                </a>
                {report.image_url && (
                  <a href={report.image_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#666' }}>
                    View Image
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
