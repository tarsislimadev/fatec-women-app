import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, MapPin, User } from 'lucide-react';
import Container from '../components/Container';
import Header from '../components/Header';
import Card from '../components/Card';
import Grid from '../components/Grid';
import EmptyState from '../components/EmptyState';

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
    <Container className="layout">
      <Header
        title="Reports Dashboard"
        actions={
          <Link to="/profile" className="btn btn-secondary gap-1">
            <User size={18} /> Profile
          </Link>
        }
      />

      {loading ? (
        <div className="text-center py-4">
          <p>Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <EmptyState
          icon={AlertCircle}
          title="No reports found"
          text="There are currently no reports to display."
        />
      ) : (
        <Grid columns="auto" gap="2">
          {reports.map(report => (
            <Card key={report.id}>
              <h3 className="card-title" style={{ fontSize: '16px', marginBottom: '8px' }}>
                {report.name || 'Anonymous'}
              </h3>
              <p className="mb-2" style={{ fontSize: '13px', color: 'var(--text)' }}>
                {new Date(report.created_at).toLocaleDateString()}
              </p>
              <p className="mb-3" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                {report.details}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link gap-1"
                  style={{ fontSize: '13px' }}
                >
                  <MapPin size={14} /> View Location
                </a>
                {report.image_url && (
                  <a
                    href={report.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link"
                    style={{ fontSize: '13px' }}
                  >
                    View Image
                  </a>
                )}
              </div>
            </Card>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;