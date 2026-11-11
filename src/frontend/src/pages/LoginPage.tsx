import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, setAuth } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { user, token } = await login({ email, password });
      setAuth(token, user);
      navigate('/reports');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'E-mail ou senha inválidos.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">Bem-vinda de volta</span>
      <h1>Entrar</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button primary" type="submit" disabled={submitting}>{submitting ? 'Entrando...' : 'Entrar'}</button>
      </form>
      <p className="form-help">Ainda não possui uma conta? <Link to="/register">Criar conta</Link></p>
    </section>
  );
}
