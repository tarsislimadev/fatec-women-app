import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register, setAuth } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setSubmitting(true);
    try {
      const { user, token } = await register({ name, email, phone, password });
      setAuth(token, user);
      navigate('/reports');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível criar a conta.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">Comece com segurança</span>
      <h1>Criar conta</h1>
      <p className="muted">Seus dados ficam protegidos e você decide o que compartilhar.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>Nome<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Telefone<input value={phone} onChange={(event) => setPhone(event.target.value)} required /></label>
        <label>Senha<input type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button primary" type="submit" disabled={submitting}>{submitting ? 'Criando...' : 'Criar minha conta'}</button>
      </form>
      <p className="form-help">Já possui uma conta? <Link to="/login">Entrar</Link></p>
    </section>
  );
}
