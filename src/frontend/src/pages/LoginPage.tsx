import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    navigate('/dashboard');
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">Bem-vinda de volta</span>
      <h1>Entrar</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        <button className="button primary" type="submit">Entrar</button>
      </form>
      <p className="form-help">Ainda não possui uma conta? <Link to="/register">Criar conta</Link></p>
    </section>
  );
}
