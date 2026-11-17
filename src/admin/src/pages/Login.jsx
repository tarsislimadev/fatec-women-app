import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import Container from '../components/Container';
import Form from '../components/Form';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const auth = await API.auth(email, password);
      if (auth.status === 'ok' && auth.data) {
        localStorage.setItem('user', JSON.stringify(auth.data.user));
        if (auth.data.token) localStorage.setItem('token', auth.data.token);
        navigate('/dashboard');
      } else {
        setError(auth.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centered className="layout">
      <Form
        title="Fatec Women Login"
        subtitle="Sign in to access the dashboard"
        onSubmit={handleSubmit}
      >
        <Form.Field label="Email">
          <Form.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
          />
        </Form.Field>

        <Form.Field label="Password">
          <Form.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading}
          />
        </Form.Field>

        {error && (
          <div className="badge badge-danger" style={{ justifySelf: 'center' }}>
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;