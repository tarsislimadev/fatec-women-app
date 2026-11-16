import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';

const Index = () => {
  return (
    <Container centered className="layout">
      <Card className="max-w-md">
        <div className="text-center">
          <h1 className="card-title" style={{ fontSize: '28px', marginBottom: '16px' }}>
            Welcome to Fatec Women App
          </h1>
          <p className="mb-3" style={{ fontSize: '16px', color: 'var(--text)' }}>
            Helping women report and track domestic violence.
          </p>
          <Link to="/login">
            <Button variant="primary" className="w-full">
              Login to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Index;