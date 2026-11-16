import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import Card from '../components/Card';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Container className="layout">
      <Header
        title="My Profile"
        actions={
          <Link to="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        }
      />

      <Card className="max-w-md" style={{ margin: '0 auto' }}>
        <div className="space-y-3">
          <div>
            <span className="text-[13px] text-[var(--text)]">Name</span>
            <p className="mt-1 text-lg font-medium">{user.name || 'Guest User'}</p>
          </div>
          <div className="mt-3">
            <span className="text-[13px] text-[var(--text)]">Email</span>
            <p className="mt-1 text-lg font-medium">{user.email || 'Not provided'}</p>
          </div>
          <div className="mt-3">
            <span className="text-[13px] text-[var(--text)]">Phone</span>
            <p className="mt-1 text-lg font-medium">+55 11 99999-9999</p>
          </div>
        </div>
        <div className="divider" />
        <Link to="/" className="btn btn-danger w-full justify-center">
          Logout
        </Link>
      </Card>
    </Container>
  );
};

export default Profile;